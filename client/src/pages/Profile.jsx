import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaIdCard, FaLock, FaUserEdit } from "react-icons/fa";
import { useAuth, dashboardPath } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { authService } from "../services/auth.service";
import { Spinner } from "../components/ui/Spinner";

const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

function MembershipCard({ membership }) {
  if (!membership) {
    return (
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-400">You don&apos;t have an active membership yet.</p>
        <Link to="/plans" className="btn-primary">
          Choose a plan <FaArrowRight className="h-3 w-3" />
        </Link>
      </div>
    );
  }

  const active = new Date(membership.endDate) > new Date();
  return (
    <dl className="grid gap-4 sm:grid-cols-4">
      <div>
        <dt className="text-xs uppercase tracking-widest text-zinc-500">Plan</dt>
        <dd className="mt-1 font-display text-2xl font-bold uppercase text-white">{membership.plan}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-widest text-zinc-500">Status</dt>
        <dd className="mt-2">
          <span className={`chip ${active ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400"}`}>
            {active ? "Active" : "Expired"}
          </span>
        </dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-widest text-zinc-500">Valid until</dt>
        <dd className="mt-1 text-white">{formatDate(membership.endDate)}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-widest text-zinc-500">Payment</dt>
        <dd className="mt-2">
          <span className={`chip ${membership.paymentStatus === "paid" ? "border-emerald-500/30 text-emerald-400" : "border-amber-500/30 text-amber-300"}`}>
            {membership.paymentStatus === "paid" ? "Paid" : `Due at front desk · ${membership.price.toLocaleString("en-US")} BDT`}
          </span>
        </dd>
      </div>
    </dl>
  );
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { showNotification } = useNotification();
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const profileForm = useForm({
    defaultValues: { name: user?.name || "", phone: user?.phone || "", title: user?.title || "", bio: user?.bio || "" }
  });
  const passwordForm = useForm();

  const saveProfile = async (values) => {
    setSavingProfile(true);
    try {
      const payload = { name: values.name, phone: values.phone };
      if (user.role === "trainer") Object.assign(payload, { title: values.title, bio: values.bio });
      updateUser(await authService.updateProfile(payload));
      showNotification("Profile updated", "success");
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async ({ currentPassword, newPassword }) => {
    setSavingPassword(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      showNotification("Password changed", "success");
      passwordForm.reset();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const pErr = profileForm.formState.errors;
  const wErr = passwordForm.formState.errors;

  return (
    <section className="section pt-32 sm:pt-36">
      <div className="container-x max-w-4xl space-y-6">
        <div className="card overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500">
            <div className="absolute inset-0 bg-grid-fade bg-[size:28px_28px] opacity-40" />
          </div>
          <div className="px-8 pb-8">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-ink-850 bg-ink-800 font-display text-5xl font-bold text-brand-400">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="pb-1">
                  <h1 className="font-display text-3xl font-bold uppercase">{user?.name}</h1>
                  <p className="text-sm text-zinc-400">
                    <span className="capitalize">{user?.role}</span> · {user?.email}
                  </p>
                </div>
              </div>
              <Link to={dashboardPath(user?.role)} className="btn-secondary">
                Go to dashboard <FaArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {user?.role === "member" && (
          <div className="card p-8">
            <h2 className="mb-6 flex items-center gap-3 text-base font-semibold text-white">
              <FaIdCard className="text-brand-500" /> Membership
            </h2>
            <MembershipCard membership={user.membership} />
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={profileForm.handleSubmit(saveProfile)} className="card space-y-5 p-8" noValidate>
            <h2 className="flex items-center gap-3 text-base font-semibold text-white">
              <FaUserEdit className="text-brand-500" /> Personal details
            </h2>
            <div>
              <label htmlFor="name" className="label">Full name</label>
              <input
                id="name"
                className={`input ${pErr.name ? "input-error" : ""}`}
                {...profileForm.register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
              />
              {pErr.name && <p className="field-error">{pErr.name.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="label">Phone</label>
              <input id="phone" type="tel" placeholder="+880 1XXX XXXXXX" className="input" {...profileForm.register("phone")} />
            </div>
            {user?.role === "trainer" && (
              <>
                <div>
                  <label htmlFor="title" className="label">Title</label>
                  <input id="title" className="input" {...profileForm.register("title")} />
                </div>
                <div>
                  <label htmlFor="bio" className="label">Bio</label>
                  <textarea id="bio" rows="3" className="input resize-none" {...profileForm.register("bio")} />
                </div>
              </>
            )}
            <button type="submit" disabled={savingProfile} className="btn-primary">
              {savingProfile ? <Spinner size="sm" color="white" /> : "Save changes"}
            </button>
          </form>

          <form onSubmit={passwordForm.handleSubmit(savePassword)} className="card space-y-5 p-8" noValidate>
            <h2 className="flex items-center gap-3 text-base font-semibold text-white">
              <FaLock className="text-brand-500" /> Change password
            </h2>
            <div>
              <label htmlFor="currentPassword" className="label">Current password</label>
              <input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                className={`input ${wErr.currentPassword ? "input-error" : ""}`}
                {...passwordForm.register("currentPassword", { required: "Current password is required" })}
              />
              {wErr.currentPassword && <p className="field-error">{wErr.currentPassword.message}</p>}
            </div>
            <div>
              <label htmlFor="newPassword" className="label">New password</label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                className={`input ${wErr.newPassword ? "input-error" : ""}`}
                {...passwordForm.register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message: "Use upper and lower case, a number and a special character (!@#$%^&*)"
                  }
                })}
              />
              {wErr.newPassword && <p className="field-error">{wErr.newPassword.message}</p>}
            </div>
            <button type="submit" disabled={savingPassword} className="btn-secondary">
              {savingPassword ? <Spinner size="sm" color="white" /> : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
