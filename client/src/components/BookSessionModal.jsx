import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "./ui/Modal";
import { Spinner } from "./ui/Spinner";
import { bookingService } from "../services/fitsync.service";
import { useNotification } from "../contexts/NotificationContext";

const pad = (n) => String(n).padStart(2, "0");
const localDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// 06:00 – 21:00 in 30-minute steps
const TIMES = Array.from({ length: 31 }, (_, i) => `${pad(6 + Math.floor(i / 2))}:${i % 2 ? "30" : "00"}`);

export function BookSessionModal({ isOpen, onClose, trainerEmail, onBooked }) {
  const { showNotification } = useNotification();
  const [trainers, setTrainers] = useState(null);
  const [saving, setSaving] = useState(false);
  const tomorrow = new Date(Date.now() + 86400000);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isOpen) return;
    bookingService
      .getTrainers()
      .then((list) => {
        setTrainers(list);
        const preselected = list.find((t) => t.email === trainerEmail) || list[0];
        reset({ trainerId: preselected?.id || "", date: localDate(tomorrow), time: "10:00", duration: "60", notes: "" });
      })
      .catch((error) => {
        setTrainers([]);
        showNotification(error.message, "error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, trainerEmail]);

  const submit = async ({ trainerId, date, time, duration, notes }) => {
    const start = new Date(`${date}T${time}:00`);
    if (start <= new Date()) {
      showNotification("Please choose a time in the future.", "error");
      return;
    }
    setSaving(true);
    try {
      const booking = await bookingService.create({ trainerId, date: start.toISOString(), duration: Number(duration), notes });
      showNotification(`Session requested with ${booking.trainer.name}. You'll see it confirmed on your dashboard.`, "success");
      onBooked?.(booking);
      onClose();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book a session">
      {!trainers ? (
        <div className="py-10"><Spinner /></div>
      ) : trainers.length === 0 ? (
        <p className="text-sm text-zinc-400">No trainers are available right now. Please try again later.</p>
      ) : (
        <form onSubmit={handleSubmit(submit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="trainerId" className="label">Trainer</label>
            <select id="trainerId" className="input" {...register("trainerId", { required: true })}>
              {trainers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}{t.title ? ` · ${t.title}` : ""}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="date" className="label">Date</label>
              <input
                id="date"
                type="date"
                min={localDate(new Date())}
                className={`input ${errors.date ? "input-error" : ""}`}
                {...register("date", { required: "Pick a date" })}
              />
            </div>
            <div>
              <label htmlFor="time" className="label">Time</label>
              <select id="time" className="input" {...register("time", { required: true })}>
                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="duration" className="label">Duration</label>
            <select id="duration" className="input" {...register("duration")}>
              {[30, 45, 60, 90, 120].map((m) => <option key={m} value={m}>{m} minutes</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="notes" className="label">Notes for your trainer</label>
            <textarea id="notes" rows="3" placeholder="Goals, injuries, what you'd like to work on…" className="input resize-none" {...register("notes")} />
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full py-3.5">
            {saving ? <Spinner size="sm" color="white" /> : "Request session"}
          </button>
        </form>
      )}
    </Modal>
  );
}
