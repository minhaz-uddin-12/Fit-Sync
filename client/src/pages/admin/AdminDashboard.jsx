import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUsers, FaUserTie, FaIdCard, FaMoneyBillWave, FaEnvelope, FaTrash, FaUserPlus, FaSearch, FaCheck
} from "react-icons/fa";
import { DashboardShell, StatCard, Panel, EmptyState } from "../../components/ui/Dashboard";
import { Modal } from "../../components/ui/Modal";
import { Spinner } from "../../components/ui/Spinner";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import { adminService } from "../../services/fitsync.service";

const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

const roleStyle = {
  admin: "border-brand-500/30 text-brand-300",
  trainer: "border-sky-500/30 text-sky-300",
  member: "border-white/10 text-zinc-300"
};

function StaffForm({ onCreated }) {
  const { showNotification } = useNotification();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { role: "trainer" } });

  const submit = async (values) => {
    setSaving(true);
    try {
      const user = await adminService.createUser(values);
      showNotification(`${user.role === "admin" ? "Admin" : "Trainer"} account created for ${user.name}`, "success");
      onCreated();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        {["trainer", "admin"].map((r) => (
          <label key={r} className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium capitalize transition ${watch("role") === r ? "border-brand-500 bg-brand-500/10 text-white" : "border-white/10 text-zinc-400"}`}>
            <input type="radio" value={r} className="sr-only" {...register("role")} />
            {r}
          </label>
        ))}
      </div>
      <div>
        <label htmlFor="s-name" className="label">Full name</label>
        <input id="s-name" className={`input ${errors.name ? "input-error" : ""}`} {...register("name", { required: "Name is required", minLength: { value: 2, message: "At least 2 characters" } })} />
        {errors.name && <p className="field-error">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="s-email" className="label">Email</label>
        <input id="s-email" type="email" className={`input ${errors.email ? "input-error" : ""}`} {...register("email", { required: "Email is required" })} />
        {errors.email && <p className="field-error">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="s-password" className="label">Temporary password</label>
        <input
          id="s-password"
          type="text"
          autoComplete="off"
          className={`input ${errors.password ? "input-error" : ""}`}
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
              message: "8+ characters with upper, lower, number and special (!@#$%^&*)"
            }
          })}
        />
        {errors.password && <p className="field-error">{errors.password.message}</p>}
      </div>
      {watch("role") === "trainer" && (
        <div>
          <label htmlFor="s-title" className="label">Title</label>
          <input id="s-title" placeholder="e.g. HIIT & Conditioning Coach" className="input" {...register("title")} />
        </div>
      )}
      <button type="submit" disabled={saving} className="btn-primary w-full py-3.5">
        {saving ? <Spinner size="sm" color="white" /> : "Create account"}
      </button>
    </form>
  );
}

const AdminDashboard = () => {
  const { user: me } = useAuth();
  const { showNotification } = useNotification();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("users");
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [staffOpen, setStaffOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const loadStats = useCallback(() => adminService.getStats().then(setStats), []);
  const loadMessages = useCallback(() => adminService.getMessages().then(setMessages), []);
  const loadUsers = useCallback(
    () => adminService.getUsers({ role: roleFilter || undefined, search: search.trim() || undefined }).then(setUsers),
    [roleFilter, search]
  );

  useEffect(() => {
    Promise.all([loadStats(), loadMessages()])
      .catch((e) => showNotification(e.message, "error"))
      .finally(() => setLoading(false));
  }, [loadStats, loadMessages, showNotification]);

  useEffect(() => {
    const t = setTimeout(() => loadUsers().catch((e) => showNotification(e.message, "error")), 250);
    return () => clearTimeout(t);
  }, [loadUsers, showNotification]);

  const run = async (action, success) => {
    try {
      await action();
      if (success) showNotification(success, "success");
      await Promise.all([loadUsers(), loadStats(), loadMessages()]);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const unread = messages.filter((m) => m.status === "new").length;

  return (
    <DashboardShell
      eyebrow="Admin panel"
      title="Admin dashboard"
      subtitle="Members, staff, memberships and messages in one place."
      actions={
        <button onClick={() => setStaffOpen(true)} className="btn-primary">
          <FaUserPlus className="h-3.5 w-3.5" /> Add staff
        </button>
      }
    >
      {loading || !stats ? (
        <div className="py-24"><Spinner size="lg" /></div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard index={0} icon={FaUsers} label="Members" value={stats.members} hint={`${stats.workouts} workouts logged`} />
            <StatCard index={1} icon={FaUserTie} label="Trainers" value={stats.trainers} hint={`${stats.upcomingBookings} upcoming sessions`} />
            <StatCard index={2} icon={FaIdCard} label="Active memberships" value={stats.activeMemberships} />
            <StatCard index={3} icon={FaMoneyBillWave} label="Collected (BDT)" value={stats.revenue.toLocaleString("en-US")} hint="Memberships marked paid" />
          </div>

          <div className="mt-8 flex gap-2 border-b border-white/5">
            {[
              { id: "users", label: "Users" },
              { id: "messages", label: `Messages${unread ? ` (${unread})` : ""}` }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition ${tab === t.id ? "border-brand-500 text-white" : "border-transparent text-zinc-400 hover:text-white"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "users" ? (
            <Panel title="All users" className="mt-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email" className="input pl-10" aria-label="Search users" />
                </div>
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="input sm:w-44" aria-label="Filter by role">
                  <option value="">All roles</option>
                  <option value="member">Members</option>
                  <option value="trainer">Trainers</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              {users.length === 0 ? (
                <EmptyState icon={FaUsers} title="No users found" description="Try a different search or filter." />
              ) : (
                <div className="-mx-6 overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="border-y border-white/5 text-xs uppercase tracking-wider text-zinc-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">User</th>
                        <th className="px-3 py-3 font-medium">Role</th>
                        <th className="px-3 py-3 font-medium">Membership</th>
                        <th className="px-3 py-3 font-medium">Joined</th>
                        <th className="px-6 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((u) => {
                        const isMe = u.id === me?.id;
                        const m = u.membership;
                        return (
                          <tr key={u.id} className="hover:bg-white/[0.02]">
                            <td className="px-6 py-3.5">
                              <p className="font-medium text-white">{u.name}{isMe && <span className="ml-2 text-xs text-zinc-500">(you)</span>}</p>
                              <p className="text-xs text-zinc-500">{u.email}</p>
                            </td>
                            <td className="px-3 py-3.5">
                              <select
                                value={u.role}
                                disabled={isMe}
                                onChange={(e) => run(() => adminService.setRole(u.id, e.target.value), `${u.name} is now ${e.target.value === "admin" ? "an" : "a"} ${e.target.value}`)}
                                className={`chip cursor-pointer appearance-none bg-transparent pr-3 capitalize disabled:cursor-default ${roleStyle[u.role]}`}
                                aria-label={`Role for ${u.name}`}
                              >
                                <option value="member">member</option>
                                <option value="trainer">trainer</option>
                                <option value="admin">admin</option>
                              </select>
                            </td>
                            <td className="px-3 py-3.5">
                              {m ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-zinc-200">{m.plan}</span>
                                  {m.paymentStatus === "paid" ? (
                                    <span className="chip border-emerald-500/30 text-emerald-400">Paid</span>
                                  ) : (
                                    <button
                                      onClick={() => run(() => adminService.markPaid(u.id), `Marked ${u.name}'s membership as paid`)}
                                      className="chip border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                                      title="Mark as paid"
                                    >
                                      Unpaid · mark paid
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-zinc-600">—</span>
                              )}
                            </td>
                            <td className="px-3 py-3.5 text-zinc-400">{formatDate(u.createdAt)}</td>
                            <td className="px-6 py-3.5 text-right">
                              {!isMe && (
                                <button onClick={() => setDeleting(u)} className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400" aria-label={`Delete ${u.name}`}>
                                  <FaTrash className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          ) : (
            <Panel title="Contact messages" className="mt-6">
              {messages.length === 0 ? (
                <EmptyState icon={FaEnvelope} title="No messages yet" description="Messages sent from the Contact page appear here." />
              ) : (
                <ul className="space-y-3">
                  {messages.map((m) => (
                    <li key={m.id} className={`rounded-xl border p-5 ${m.status === "new" ? "border-brand-500/30 bg-brand-500/[0.04]" : "border-white/5"}`}>
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <p className="font-semibold text-white">
                            {m.subject}
                            {m.status === "new" && <span className="ml-2 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">New</span>}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            {m.name} · <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`} className="hover:text-brand-400">{m.email}</a> · {formatDate(m.createdAt)}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          {m.status === "new" && (
                            <button onClick={() => run(() => adminService.markRead(m.id))} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white" aria-label="Mark as read" title="Mark as read">
                              <FaCheck className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button onClick={() => run(() => adminService.deleteMessage(m.id), "Message deleted")} className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-400" aria-label="Delete message" title="Delete">
                            <FaTrash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-300">{m.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          )}
        </>
      )}

      <Modal isOpen={staffOpen} onClose={() => setStaffOpen(false)} title="Add staff account">
        {staffOpen && (
          <StaffForm
            onCreated={() => {
              setStaffOpen(false);
              run(() => Promise.resolve());
            }}
          />
        )}
      </Modal>

      <ConfirmationModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          const u = deleting;
          setDeleting(null);
          run(() => adminService.deleteUser(u.id), `${u.name} was deleted`);
        }}
        title="Delete user?"
        confirmLabel="Delete"
        message={deleting && `${deleting.name}'s account, workouts and bookings will be permanently removed.`}
      />
    </DashboardShell>
  );
};

export default AdminDashboard;
