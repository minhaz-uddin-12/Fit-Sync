import { useCallback, useEffect, useState } from "react";
import { FaUsers, FaCalendarCheck, FaHourglassHalf, FaClock, FaCheck, FaTimes } from "react-icons/fa";
import { DashboardShell, StatCard, Panel, EmptyState } from "../../components/ui/Dashboard";
import { Spinner } from "../../components/ui/Spinner";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import { bookingService } from "../../services/fitsync.service";

const formatSession = (d) =>
  new Date(d).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

const statusStyle = {
  pending: "border-amber-500/30 text-amber-300",
  confirmed: "border-emerald-500/30 text-emerald-400",
  cancelled: "border-white/10 text-zinc-500"
};

function SessionRow({ booking, onStatus, busy }) {
  const isFuture = new Date(booking.date) > new Date();
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <p className="truncate font-medium text-white">{booking.user?.name || "Deleted member"}</p>
          <span className={`chip capitalize ${statusStyle[booking.status]}`}>{booking.status}</span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          {formatSession(booking.date)} · {booking.duration} min · {booking.user?.email}
          {booking.user?.phone ? ` · ${booking.user.phone}` : ""}
        </p>
        {booking.notes && <p className="mt-2 text-sm italic text-zinc-400">&ldquo;{booking.notes}&rdquo;</p>}
      </div>
      {isFuture && booking.status !== "cancelled" && (
        <div className="flex shrink-0 gap-2">
          {booking.status === "pending" && (
            <button disabled={busy} onClick={() => onStatus(booking, "confirmed")} className="btn-primary px-4 py-2 text-xs">
              <FaCheck className="h-3 w-3" /> Confirm
            </button>
          )}
          <button disabled={busy} onClick={() => onStatus(booking, "cancelled")} className="btn-secondary px-4 py-2 text-xs">
            <FaTimes className="h-3 w-3" /> Decline
          </button>
        </div>
      )}
    </li>
  );
}

const TrainerDashboard = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      setBookings(await bookingService.getTrainerBookings());
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (booking, status) => {
    setBusyId(booking.id);
    try {
      const updated = await bookingService.setStatus(booking.id, status);
      setBookings((list) => list.map((b) => (b.id === updated.id ? updated : b)));
      showNotification(status === "confirmed" ? "Session confirmed" : "Session declined", "success");
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setBusyId(null);
    }
  };

  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.date) > now && b.status !== "cancelled");
  const pending = upcoming.filter((b) => b.status === "pending");
  const past = bookings.filter((b) => new Date(b.date) <= now || b.status === "cancelled").reverse();
  const clients = new Set(bookings.filter((b) => b.status !== "cancelled").map((b) => b.user?.id)).size;
  const hours = upcoming.reduce((sum, b) => sum + b.duration, 0) / 60;

  return (
    <DashboardShell
      eyebrow="Trainer panel"
      title={`Coach ${user?.name?.split(" ")[0] || ""}`}
      subtitle="Review session requests and manage your schedule."
    >
      {loading ? (
        <div className="py-24"><Spinner size="lg" /></div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard index={0} icon={FaHourglassHalf} label="Awaiting response" value={pending.length} />
            <StatCard index={1} icon={FaCalendarCheck} label="Upcoming sessions" value={upcoming.length} />
            <StatCard index={2} icon={FaClock} label="Hours booked ahead" value={hours.toFixed(1)} />
            <StatCard index={3} icon={FaUsers} label="Clients" value={clients} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <Panel title="Upcoming sessions" className="lg:col-span-3">
              {upcoming.length === 0 ? (
                <EmptyState icon={FaCalendarCheck} title="No upcoming sessions" description="When members book with you, their requests appear here." />
              ) : (
                <ul className="space-y-3">
                  {upcoming.map((b) => <SessionRow key={b.id} booking={b} onStatus={setStatus} busy={busyId === b.id} />)}
                </ul>
              )}
            </Panel>
            <Panel title="History" className="lg:col-span-2">
              {past.length === 0 ? (
                <p className="py-6 text-center text-sm text-zinc-500">Past and cancelled sessions show up here.</p>
              ) : (
                <ul className="space-y-3">
                  {past.slice(0, 8).map((b) => <SessionRow key={b.id} booking={b} onStatus={setStatus} busy={false} />)}
                </ul>
              )}
            </Panel>
          </div>
        </>
      )}
    </DashboardShell>
  );
};

export default TrainerDashboard;
