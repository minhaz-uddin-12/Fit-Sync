import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Spinner } from "./ui/Spinner";

const today = () => new Date().toISOString().slice(0, 10);
const emptyExercise = { name: "", sets: 3, reps: 10, weight: 0 };

const toFormValues = (w) =>
  w
    ? {
        title: w.title,
        date: new Date(w.date).toISOString().slice(0, 10),
        duration: w.duration,
        calories: w.calories || "",
        notes: w.notes || "",
        exercises: w.exercises.map(({ name, sets, reps, weight }) => ({ name, sets, reps, weight: weight || 0 }))
      }
    : { title: "", date: today(), duration: 45, calories: "", notes: "", exercises: [emptyExercise] };

export function WorkoutForm({ workout, onSubmit, isSaving }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: toFormValues(workout) });
  const { fields, append, remove } = useFieldArray({ control, name: "exercises" });

  const submit = (values) => {
    // Date-only input → noon local time, so it never shifts to the previous day
    const date = new Date(`${values.date}T12:00:00`);
    onSubmit({
      title: values.title,
      date: date > new Date() ? new Date().toISOString() : date.toISOString(),
      duration: Number(values.duration),
      ...(values.calories !== "" && { calories: Number(values.calories) }),
      notes: values.notes,
      exercises: values.exercises.map((e) => ({
        name: e.name,
        sets: Number(e.sets),
        reps: Number(e.reps),
        weight: Number(e.weight) || 0
      }))
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="title" className="label">Workout name</label>
        <input
          id="title"
          placeholder="e.g. Upper body push"
          className={`input ${errors.title ? "input-error" : ""}`}
          {...register("title", { required: "Give your workout a name" })}
        />
        {errors.title && <p className="field-error">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor="date" className="label">Date</label>
          <input id="date" type="date" max={today()} className="input" {...register("date", { required: true })} />
        </div>
        <div>
          <label htmlFor="duration" className="label">Minutes</label>
          <input
            id="duration"
            type="number"
            min="1"
            className={`input ${errors.duration ? "input-error" : ""}`}
            {...register("duration", { required: "Required", min: { value: 1, message: "Min 1" } })}
          />
        </div>
        <div>
          <label htmlFor="calories" className="label">Calories</label>
          <input id="calories" type="number" min="0" placeholder="Optional" className="input" {...register("calories")} />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="label mb-0">Exercises</span>
          <button type="button" onClick={() => append(emptyExercise)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300">
            <FaPlus className="h-2.5 w-2.5" /> Add exercise
          </button>
        </div>
        <div className="mb-1 hidden grid-cols-[1fr_4rem_4rem_4.5rem_2rem] gap-2 px-1 text-[11px] uppercase tracking-wider text-zinc-500 sm:grid">
          <span>Name</span><span>Sets</span><span>Reps</span><span>kg</span><span />
        </div>
        <div className="space-y-2">
          {fields.map((field, i) => (
            <div key={field.id} className="grid grid-cols-[1fr_4rem_4rem_4.5rem_2rem] gap-2">
              <input
                placeholder="Bench press"
                aria-label={`Exercise ${i + 1} name`}
                className={`input py-2.5 ${errors.exercises?.[i]?.name ? "input-error" : ""}`}
                {...register(`exercises.${i}.name`, { required: true })}
              />
              <input type="number" min="1" aria-label="Sets" className="input px-2 py-2.5" {...register(`exercises.${i}.sets`, { required: true, min: 1 })} />
              <input type="number" min="1" aria-label="Reps" className="input px-2 py-2.5" {...register(`exercises.${i}.reps`, { required: true, min: 1 })} />
              <input type="number" min="0" step="0.5" aria-label="Weight in kg" className="input px-2 py-2.5" {...register(`exercises.${i}.weight`)} />
              <button
                type="button"
                onClick={() => remove(i)}
                disabled={fields.length === 1}
                className="flex items-center justify-center rounded-lg text-zinc-500 hover:text-red-400 disabled:opacity-30"
                aria-label="Remove exercise"
              >
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        {errors.exercises && <p className="field-error">Every exercise needs a name, sets and reps.</p>}
      </div>

      <div>
        <label htmlFor="notes" className="label">Notes</label>
        <textarea id="notes" rows="2" placeholder="How did it feel?" className="input resize-none" {...register("notes")} />
      </div>

      <button type="submit" disabled={isSaving} className="btn-primary w-full py-3.5">
        {isSaving ? <Spinner size="sm" color="white" /> : workout ? "Save changes" : "Log workout"}
      </button>
    </form>
  );
}
