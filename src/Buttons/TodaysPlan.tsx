"use client";

import { useWorkouts } from "@/context/WorkoutProvider";
import { TWorkout } from "@/types/type";

const TodaysPlan = ({ workout }: { workout: TWorkout }) => {
  const { addToPlan, todaysPlan } = useWorkouts();
  const isFull = todaysPlan.length >= 5;
  const isAdded = todaysPlan.some((item) => item.id === workout.id);

  return (
    <button type="button" disabled={isFull || isAdded} onClick={() => addToPlan(workout)}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-extrabold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50">
      <span aria-hidden="true">+</span>
      {isAdded ? "In Today's Plan" : "Add to Today's Plan"}
    </button>
  );
};

export default TodaysPlan;
