"use client";

import { useWorkouts } from "@/context/WorkoutProvider";
import { TWorkout } from "@/types/type";

const SavedPlan = ({ workout }: { workout: TWorkout }) => {
  const { saveWorkout, savedWorkouts } = useWorkouts();
  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  return (
    <button type="button" disabled={isSaved} onClick={() => saveWorkout(workout)}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-xs font-semibold text-[#d4d4d8] transition hover:border-[#ccff00]/50 hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50">
      <span aria-hidden="true">♡</span>
      {isSaved ? "Saved" : "Save for Later"}
    </button>
  );
};

export default SavedPlan;
