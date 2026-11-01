# Deploying FitSync for free

FitSync deploys as three free pieces:

| Piece | Service | What it hosts |
|-------|---------|---------------|
| Database | [Neon](https://neon.com) (free plan) | PostgreSQL |
| API | [Vercel](https://vercel.com) (Hobby plan) | `server/`, the Express API, as a Vercel Function |
| Website | Vercel (Hobby plan) | `client/`, the React site |

None of them needs a credit card. Total time is about 20 minutes.

> **Free plan limits (late 2026):** Neon gives each project about 0.5 GB of storage and
> 100 compute-hours a month, and pauses the database after a few minutes idle (the
> first request afterwards takes about half a second longer). Vercel's Hobby plan is
> for personal, non-commercial projects. Both are plenty for a course project.

---

## Step 0: Push the code to GitHub

Vercel deploys from a GitHub repository, so the latest code must be on GitHub first.
`server/node_modules` and `server/.env` must **not** be in the repository: Vercel
installs packages itself, and `.env` holds secrets.

```bash
git rm -r --cached server/node_modules server/.env
git add -A
git commit -m "Move to PostgreSQL and prepare Vercel deployment"
git push
```

## Step 1: Create the database on Neon

1. Sign up at **neon.com** (you can use your GitHub account).
2. Create a project:
   - **Name:** `fitsync`
   - **Postgres version:** the default
   - **Region:** *AWS Asia Pacific (Singapore)*, the closest to Bangladesh
3. On the project dashboard, click **Connect**.
4. Turn on **Connection pooling**, then copy the connection string. It looks like
   ```
   postgresql://neondb_owner:abc123@ep-cool-name-123456-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
   The host must contain `-pooler`. Keep this string private; it is your `DATABASE_URL`.

You don't need to create any tables. The API's deploy step creates them.

## Step 2: Generate a JWT secret

This random string signs login tokens. Run this in any terminal and copy the output:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Step 3: Deploy the API

1. Sign up at **vercel.com** with your GitHub account.
2. Click **Add New… → Project** and import the **FitSync** repository.
3. Configure the project:
   - **Project Name:** `fitsync-api`
   - **Root Directory:** click **Edit** and choose `server`
   - **Framework Preset:** Express (detected automatically)
   - Leave the build settings alone. `server/vercel.json` runs the database migrations
     as the build step.
4. Open **Environment Variables** and add:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | the Neon connection string from Step 1 |
   | `JWT_SECRET` | the secret from Step 2 |
   | `NODE_ENV` | `production` |
   | `ADMIN_EMAIL` | the email you want for the admin account |
   | `ADMIN_PASSWORD` | a strong password for the admin (8+ characters, upper and lower case, a number, a symbol) |
   | `TRAINER_PASSWORD` | a strong password for the three demo trainer accounts |
   | `CLIENT_URL` | leave empty for now; you'll fill it in at Step 5 |

5. Click **Deploy**. The build log should end with:
   ```
   ✅ Migrations applied
   🌱 Seeded default accounts:
   ```
6. Open `https://fitsync-api.vercel.app/health` (use the domain Vercel shows you).
   You should see:
   ```json
   {"status":"ok","database":"connected"}
   ```
7. *(Recommended)* Under **Settings → Functions → Function Region**, choose
   **Singapore (sin1)** so the API runs next to the database, then redeploy.

## Step 4: Deploy the website

1. In Vercel, click **Add New… → Project** and import the **same** repository again.
2. Configure it:
   - **Project Name:** `fitsync`
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (detected automatically)
3. Add one environment variable:

   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | your API URL from Step 3, e.g. `https://fitsync-api.vercel.app` (no trailing slash) |

4. Click **Deploy**. When it finishes, Vercel shows the site's URL, e.g.
   `https://fitsync.vercel.app`.

## Step 5: Let the website talk to the API

The API only accepts requests from websites it knows (CORS).

1. Open the **fitsync-api** project → **Settings → Environment Variables**.
2. Set `CLIENT_URL` to the website URL from Step 4, e.g. `https://fitsync.vercel.app`.
   To allow more than one domain, separate them with commas.
3. Go to **Deployments**, open the menu (⋯) on the latest deployment and click **Redeploy**.
   Environment variable changes only take effect after a redeploy.

## Step 6: Check it works

1. Open the website and register a new member account.
2. Log a workout, book a session and choose a plan.
3. Log out, then log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` and check the admin dashboard.
4. Log in as a trainer (e.g. `reza@fitness.com` with `TRAINER_PASSWORD`) and confirm the session.

From now on, every `git push` to `main` redeploys both projects automatically, and any
new migrations in `server/drizzle/` are applied during the API build.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Website shows "Cannot reach the server" | `VITE_API_URL` is missing or wrong. Fix it in the website project and **redeploy**: Vite bakes it in at build time. |
| Browser console shows a CORS error | `CLIENT_URL` in the API project doesn't exactly match the website URL (check `https`, no trailing slash). Redeploy the API after changing it. |
| API build fails at `db:migrate` | `DATABASE_URL` is wrong or missing. Copy it again from Neon (pooled connection). |
| `/health` returns `Server is missing JWT_SECRET` | Add `JWT_SECRET` to the API project and redeploy. |
| Can't log in as admin | The admin is only created if `ADMIN_PASSWORD` was set when the API was built. Set it and redeploy. If the email already exists, the password isn't changed: use "Forgot password". |
| Refreshing a page like `/dashboard` gives a 404 | `client/vercel.json` must be in the repository (it routes every page to the React app). |
| "Forgot password" link never arrives | No email service is configured. The reset link is printed in the API's **Logs** tab in Vercel. |

## Viewing the data

- **Neon console → Tables** shows every table and row.
- Or, from your computer: put the Neon string in `server/.env` as `DATABASE_URL`, then run
  `npm run db:studio` in `server/` to open Drizzle Studio. Remove it afterwards to go back
  to the local development database.
