# FitSync

A comprehensive fitness management system built with React, Express.js, Node.js and PostgreSQL that helps users track workouts, book trainers, and maintain their fitness journey.

## Features

- **User Authentication**
  - Secure registration and login system
  - Role-based access (Member, Trainer, Admin)
  - Password encryption and JWT token authentication
  - Password reset functionality

- **Member Features**
  - Track workouts and exercises
  - View workout statistics and progress
  - Book training sessions with trainers
  - Calculate BMI and get recommendations
  - View available equipment and facilities
  - Access workout history and analytics

- **Trainer Features**
  - Manage client bookings and schedules
  - Track client progress
  - Create and assign workout plans
  - Update availability and profile

- **Admin Features**
  - Manage users (members and trainers)
  - Monitor system statistics
  - Handle equipment inventory
  - Manage facility information

- **Additional Features**
  - Responsive design for all devices
  - Real-time notifications
  - Secure API endpoints
  - Data visualization for progress tracking

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon in production)
- Drizzle ORM + migrations
- JWT Authentication
- Bcrypt
- Joi Validation

## Installation

1. Clone the repository
```bash
git clone https://github.com/minhaz-uddin-12/FitSync
```

2. Install dependencies for backend
```bash
cd server
npm install
```

3. Install dependencies for frontend
```bash
cd client
npm install
```

4. Set up environment variables
```bash
cp server/.env.example server/.env
```
Then set a long random `JWT_SECRET` in `server/.env`.

`DATABASE_URL` can stay empty during development: the API runs an embedded PostgreSQL
(PGlite) and stores its data in `server/.data/pglite/`, applying migrations on startup.
Nothing to install. To develop against a real database instead, paste a PostgreSQL
connection string into `DATABASE_URL` and run `npm run db:migrate` once.
Production deployments must set it.

The frontend calls `http://localhost:5000` in development. To point it elsewhere,
create `client/.env.local` with `VITE_API_URL=https://your-api.example.com`.

5. Run the application (two terminals)
```bash
# Terminal 1 - API on http://localhost:5000
cd server
npm run dev

# Terminal 2 - website on http://localhost:5173
cd client
npm run dev
```

### Default accounts

Created automatically when the API starts in development. Members sign up through the
Register page.

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@fitsync.com | Admin@123 |
| Trainer | enayet@fitness.com | Trainer@123 |
| Trainer | reza@fitness.com | Trainer@123 |
| Trainer | srishty@fitness.com | Trainer@123 |

In production these passwords are never used: accounts are created by
`npm run db:migrate` only from the `ADMIN_PASSWORD` / `TRAINER_PASSWORD` environment
variables.

### Database changes

The schema lives in `server/db/schema.js`. After editing it:
```bash
cd server
npm run db:generate   # writes a new SQL migration to server/drizzle/
```
The migration runs automatically on the next dev start, and on the next Vercel deploy.

### Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for a free deployment on Vercel + Neon.

### Password reset

No email provider is configured yet. In development the reset link is shown on the
Forgot Password page and printed in the API console. In production it is only printed
in the server logs.

## Project Structure

```
FitSync/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable components (ui/ holds layout primitives)
│       ├── contexts/       # Auth and notification contexts
│       ├── data/           # Static site content (plans, coaches, services)
│       ├── pages/          # Page components (member/, trainer/, admin/)
│       └── services/       # API clients
├── server/                 # Backend Node.js application
│   ├── db/                 # Drizzle schema, connection, user queries
│   ├── drizzle/            # Generated SQL migrations
│   ├── middleware/         # Auth, validation, error handling
│   ├── routes/             # API routes
│   ├── scripts/            # Migrate and seed scripts
│   └── utils/              # Joi validators, plan catalog
└── README.md
```

## API Reference

All responses are JSON: `{ "status": "success", "data": ... }` or
`{ "status": "error", "message": "..." }`. Authenticated routes need an
`Authorization: Bearer <token>` header.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create a member account, returns a token |
| POST | `/api/auth/login` | Public | Log in (any role), returns a token |
| GET | `/api/auth/me` | Logged in | Current user |
| POST | `/api/auth/forgot-password` | Public | Start a password reset |
| POST | `/api/auth/reset-password/:token` | Public | Set a new password |
| PATCH | `/api/users/me` | Logged in | Update name, phone (trainers: title, bio) |
| PATCH | `/api/users/me/password` | Logged in | Change password |
| POST | `/api/membership` | Member | Enroll in `Drop-In`, `Unlimited` or `Premium` |
| GET | `/api/trainers` | Public | Trainer directory |
| GET/POST | `/api/workouts` | Logged in | List (paginated, `?search=`) / create workouts |
| GET/PUT/DELETE | `/api/workouts/:id` | Owner | Read / update / delete a workout |
| GET | `/api/workouts/stats` | Logged in | Totals, this week, last 7 days, top exercises |
| GET/POST | `/api/bookings` | Member | List own bookings / book a trainer |
| DELETE | `/api/bookings/:id` | Member | Cancel own booking |
| GET | `/api/bookings/trainer` | Trainer | Sessions booked with me |
| PATCH | `/api/bookings/:id/status` | Trainer, Admin | Confirm or cancel a session |
| POST | `/api/contact` | Public | Send a contact message |
| GET | `/api/admin/stats` | Admin | Dashboard numbers |
| GET/POST | `/api/admin/users` | Admin | List users / create trainer or admin |
| PATCH | `/api/admin/users/:id/role` | Admin | Change role |
| PATCH | `/api/admin/users/:id/membership/paid` | Admin | Mark membership paid |
| DELETE | `/api/admin/users/:id` | Admin | Delete user and their data |
| GET | `/api/admin/messages` | Admin | Contact messages |
| PATCH | `/api/admin/messages/:id/read` | Admin | Mark message read |
| DELETE | `/api/admin/messages/:id` | Admin | Delete message |

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from various fitness applications
- Icons from Font Awesome
- UI components from Tailwind CSS
- Animations from Framer Motion