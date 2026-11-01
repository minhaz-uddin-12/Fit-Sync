import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaDumbbell, FaPlus, FaPen, FaTrash, FaSearch, FaClock, FaFire } from "react-icons/fa";
import { DashboardShell, EmptyState } from "../../components/ui/Dashboard";
import { Modal } from "../../components/ui/Modal";
import { Spinner } from "../../components/ui/Spinner";
import { WorkoutForm } from "../../components/WorkoutForm";
import ConfirmationModal from "../../components/ConfirmationModal";
import { workoutService } from "../../services/workout.service";
import { useNotification } from "../../contexts/NotificationContext";

const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

const Workouts = () => {
  const { showNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({ workouts: [], pagination: { page: 1, pages: 1, total: 0 } });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, workout = edit
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await workoutService.getWorkouts({ page, limit: 8, search: query || undefined }));
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [page, query, showNotification]);

  useEffect(() => {
    load();
  }, [load]);

  // Dashboard "Log workout" links here with ?new
  useEffect(() => {
    if (new URLSearchParams(location.search).has("new")) {
      setEditing({});
      navigate("/workouts", { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setQuery(search.trim());
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const save = async (values) => {
    setSaving(true);
    try {
      if (editing?.id) {
        await workoutService.updateWorkout(editing.id, values);
        showNotification("Workout updated", "success");
      } else {
        await workoutService.createWorkout(values);
        showNotification("Workout logged. Nice work!", "success");
      }
      setEditing(null);
      load();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    const workout = deleting;
    setDeleting(null);
    try {
      await workoutService.deleteWorkout(workout.id);
      showNotification("Workout deleted", "success");
      if (data.workouts.length === 1 && page > 1) setPage(page - 1);
      else load();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const { workouts, pagination } = data;

  return (
    <DashboardShell
      eyebrow="Training log"
      title="My workouts"
      subtitle={pagination.total ? `${pagination.total} workout${pagination.total === 1 ? "" : "s"} logged` : "Every session you log shows up here."}
      actions={
        <button onClick={() => setEditing({})} className="btn-primary">
          <FaPlus className="h-3 w-3" /> New workout
        </button>
      }
    >
      <div className="relative mb-6 max-w-sm">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workouts or exercises"
          className="input pl-10"
          aria-label="Search workouts"
        />
      </div>

      {loading ? (
        <div className="py-20"><Spinner size="lg" /></div>
      ) : workouts.length === 0 ? (
        <EmptyState
          icon={FaDumbbell}
          title={query ? "No matching workouts" : "No workouts logged yet"}
          description={query ? "Try a different search term." : "Log your first workout to start tracking volume, duration and progress over time."}
          action={
            query ? null : (
              <button onClick={() => setEditing({})} className="btn-primary">
                <FaPlus className="h-3 w-3" /> Log your first workout
              </button>
            )
          }
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {workouts.map((w) => (
              <article key={w.id} className="card flex flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-500">{formatDate(w.date)}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{w.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditing(w)} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white" aria-label={`Edit ${w.title}`}>
                      <FaPen className="h-3 w-3" />
                    </button>
                    <button onClick={() => setDeleting(w)} className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-400" aria-label={`Delete ${w.title}`}>
                      <FaTrash className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5"><FaClock className="text-brand-500" /> {w.duration} min</span>
                  {w.calories > 0 && <span className="flex items-center gap-1.5"><FaFire className="text-brand-500" /> {w.calories} kcal</span>}
                  <span className="flex items-center gap-1.5"><FaDumbbell className="text-brand-500" /> {w.exercises.length} exercise{w.exercises.length === 1 ? "" : "s"}</span>
                </div>
                <ul className="mt-4 divide-y divide-white/5 rounded-xl border border-white/5 text-sm">
                  {w.exercises.map((e, i) => (
                    <li key={i} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-zinc-200">{e.name}</span>
                      <span className="tabular-nums text-zinc-500">
                        {e.sets} × {e.reps}{e.weight ? ` · ${e.weight} kg` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
                {w.notes && <p className="mt-4 text-sm italic text-zinc-500">{w.notes}</p>}
              </article>
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="btn-secondary py-2">Previous</button>
              <span className="text-sm text-zinc-400">Page {pagination.page} of {pagination.pages}</span>
              <button onClick={() => setPage(page + 1)} disabled={page >= pagination.pages} className="btn-secondary py-2">Next</button>
            </div>
          )}
        </>
      )}

      <p className="mt-10 text-center text-sm text-zinc-500">
        Want guidance? <Link to="/support" className="text-brand-400 hover:text-brand-300">Book a session with a coach</Link>
      </p>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit workout" : "Log a workout"} size="max-w-2xl">
        {editing && <WorkoutForm key={editing.id || "new"} workout={editing.id ? editing : null} onSubmit={save} isSaving={saving} />}
      </Modal>

      <ConfirmationModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete workout?"
        confirmLabel="Delete"
        message={deleting && `"${deleting.title}" will be permanently removed.`}
      />
    </DashboardShell>
  );
};

export default Workouts;
