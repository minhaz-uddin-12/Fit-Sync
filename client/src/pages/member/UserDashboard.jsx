import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  FaDumbbell, FaFire, FaCalendarAlt, FaClock, FaPlus, FaCalculator, FaUserFriends, FaIdCard, FaArrowRight
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import { DashboardShell, StatCard, Panel, EmptyState } from "../../components/ui/Dashboard";
import { Spinner } from "../../components/ui/Spinner";
import { BookSessionModal } from "../../components/BookSessionModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import { workoutService } from "../../services/workout.service";
import { bookingService } from "../../services/fitsync.service";

const formatSession = (d) =>
  new Date(d).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const formatDay = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const statusStyle = {
  pending: "border-amber-500/30 text-amber-300",
  confirmed: "border-emerald-500/30 text-emerald-400",
  cancelled: "border-white/10 text-zinc-500"
};

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-xs shadow-xl">
      <p className="text-zinc-400">{label}</p>
      <p className="mt-0.5 font-semibold text-white">{payload[0].value} min</p>
    </div>
  );
}

const UserDashboard = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [cancelling, setCancelling] = useState(null);

  const load = useCallback(async () => {
    try {
      const [s, w, b] = await Promise.all([
        workoutService.getWorkoutStats(),
        workoutService.getWorkouts({ limit: 4 }),
        bookingService.getMyBookings()
      ]);
      setStats(s);
      setRecent(w.workouts);
      setBookings(b);
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    load();
  }, [load]);

  const cancelBooking = async () => {
    const booking = cancelling;
    setCancelling(null);
    try {
      await bookingService.cancel(booking.id);
      showNotification("Session cancelled", "success");
      load();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const firstName = user?.name?.split(" ")[0] || "there";
  const upcoming = bookings.filter((b) => new Date(b.date) > new Date() && b.status !== "cancelled");
  const membership = user?.membership;
  const membershipActive = membership && new Date(membership.endDate) > new Date();
  const workoutDelta = stats ? stats.thisWeek.workouts - stats.lastWeekWorkouts : 0;

  return (
    <DashboardShell
      eyebrow="Member dashboard"
      title={`Welcome back, ${firstName}`}
      subtitle="Here's how your training is going this week."
      actions={
        <Link to="/workouts?new" className="btn-primary">
          <FaPlus className="h-3 w-3" /> Log workout
        </Link>
      }
    >
      {loading ? (
        <div className="py-24"><Spinner size="lg" /></div>
      ) : (
        <>
          {!membershipActive && (
            <div className="card mb-6 flex flex-col items-start justify-between gap-4 border-brand-500/30 bg-brand-500/[0.06] p-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <FaIdCard className="h-6 w-6 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">{membership ? "Your membership has expired" : "You don't have a membership yet"}</p>
                  <p className="text-sm text-zinc-400">Pick a plan to unlock equipment, classes and coaching.</p>
                </div>
              </div>
              <Link to="/plans" className="btn-primary shrink-0">
                View plans <FaArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              index={0}
              icon={FaDumbbell}
              label="Workouts this week"
              value={stats.thisWeek.workouts}
              hint={`${workoutDelta >= 0 ? "+" : ""}${workoutDelta} vs previous week`}
            />
            <StatCard index={1} icon={FaClock} label="Minutes this week" value={stats.thisWeek.minutes} hint={`${stats.summary.totalDuration} min all time`} />
            <StatCard index={2} icon={FaFire} label="Calories this week" value={stats.thisWeek.calories.toLocaleString("en-US")} hint="From logged workouts" />
            <StatCard index={3} icon={FaCalendarAlt} label="Upcoming sessions" value={upcoming.length} hint={membershipActive ? `${membership.plan} plan` : "No active plan"} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Panel
              title="Training minutes, last 7 days"
              action={<span className="text-sm text-zinc-400"><span className="font-semibold text-white">{stats.thisWeek.minutes}</span> min total</span>}
              className="lg:col-span-2"
            >
              {stats.thisWeek.workouts === 0 ? (
                <EmptyState
                  icon={FaDumbbell}
                  title="No workouts in the last 7 days"
                  description="Log a workout and your weekly activity will appear here."
                  action={<Link to="/workouts?new" className="btn-secondary">Log a workout</Link>}
                />
              ) : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.week} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barCategoryGap="28%">
                      <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                      <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                      <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                      <Bar dataKey="minutes" name="Minutes" fill="#ff5a1f" radius={[4, 4, 0, 0]} maxBarSize={36} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Panel>

            <Panel title="Upcoming sessions">
              {upcoming.length === 0 ? (
                <p className="py-6 text-center text-sm text-zinc-500">No sessions booked.</p>
              ) : (
                <ul className="space-y-3">
                  {upcoming.slice(0, 4).map((s) => (
                    <li key={s.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">{s.trainer?.name}</p>
                          <p className="text-xs text-zinc-500">{formatSession(s.date)} · {s.duration} min</p>
                        </div>
                        <span className={`chip shrink-0 capitalize ${statusStyle[s.status]}`}>{s.status}</span>
                      </div>
                      <button onClick={() => setCancelling(s)} className="mt-2 text-xs text-zinc-500 hover:text-red-400">Cancel</button>
                    </li>
                  ))}
                </ul>
              )}
              <button onClick={() => setBookingOpen(true)} className="btn-secondary mt-4 w-full">Book a session</button>
            </Panel>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Panel
              title="Recent workouts"
              action={<Link to="/workouts" className="text-sm text-brand-400 hover:text-brand-300">View all</Link>}
              className="lg:col-span-2"
            >
              {recent.length === 0 ? (
                <p className="py-6 text-center text-sm text-zinc-500">Your logged workouts will show up here.</p>
              ) : (
                <ul className="divide-y divide-white/5">
                  {recent.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-4 py-3.5">
                      <div className="flex items-center gap-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-zinc-400">
                          <FaDumbbell className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white">{r.title}</p>
                          <p className="text-xs text-zinc-500">
                            {r.duration} min · {r.exercises.length} exercise{r.exercises.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500">{formatDay(r.date)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Quick actions">
              <div className="grid gap-3">
                {[
                  { to: "/bmicalculator", label: "Check your BMI", icon: FaCalculator },
                  { to: "/support", label: "Meet the coaches", icon: FaUserFriends },
                  { to: "/profile", label: "Membership & profile", icon: FaIdCard }
                ].map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 rounded-xl border border-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:border-brand-500/40 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-brand-400" /> {label}
                  </Link>
                ))}
              </div>
            </Panel>
          </div>
        </>
      )}

      <BookSessionModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} onBooked={load} />
      <ConfirmationModal
        isOpen={!!cancelling}
        onClose={() => setCancelling(null)}
        onConfirm={cancelBooking}
        title="Cancel session?"
        confirmLabel="Cancel session"
        cancelLabel="Keep it"
        message={cancelling && `Your session with ${cancelling.trainer?.name} on ${formatSession(cancelling.date)} will be cancelled.`}
      />
    </DashboardShell>
  );
};

export default UserDashboard;
