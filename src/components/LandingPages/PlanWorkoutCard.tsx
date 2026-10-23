"use client";

import Image from "next/image";
import Link from "next/link";
import { TWorkout } from "@/types/type";
import { useWorkouts } from "@/context/WorkoutProvider";

const PlanWorkoutCard = ({ workout, saved }: { workout: TWorkout; saved: boolean }) => {
  const { removeFromPlan, markAsDone, removeSaved } = useWorkouts();
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#15171e] p-3 sm:flex-row sm:items-center">
      <Image src={workout.image} alt="" width={120} height={90} className="h-24 w-full rounded-lg object-cover sm:h-20 sm:w-28" />
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-extrabold uppercase">{workout.name}</h2>
        <p className="mt-1 text-xs text-[#858792]">{workout.equipment}</p>
        <p className="mt-2 text-[11px] text-[#b0b1b9]">{workout.duration} min · {workout.caloriesBurned} kcal · ★ {workout.rating.toFixed(1)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={`/workouts/${workout.id}`} className="rounded-md border border-white/15 px-3 py-2 text-[10px] font-bold">View Details</Link>
        {!saved && <button type="button" onClick={() => markAsDone(workout.id)} className="rounded-md bg-[#ccff00] px-3 py-2 text-[10px] font-bold text-black">✓ Mark as Done</button>}
        <button type="button" aria-label={`Remove ${workout.name}`} onClick={() => saved ? removeSaved(workout.id) : removeFromPlan(workout.id)} className="rounded-md border border-red-300/30 px-3 py-2 text-[10px] font-bold text-red-200">×</button>
      </div>
    </article>
  );
};

export default PlanWorkoutCard;
