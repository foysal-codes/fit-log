"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useWorkouts } from "@/context/WorkoutProvider";
import PlanWorkoutCard from "@/components/LandingPages/PlanWorkoutCard";

const MyPlanPage = () => {
  const { todaysPlan, savedWorkouts } = useWorkouts();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("Duration");
  const workouts = activeTab === "plan" ? todaysPlan : savedWorkouts;
  const sortedWorkouts = useMemo(() => [...workouts].sort((a, b) => {
    if (sortBy === "Calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return a.duration - b.duration;
  }), [workouts, sortBy]);
  const minutes = todaysPlan.reduce((total, workout) => total + workout.duration, 0);
  const calories = todaysPlan.reduce((total, workout) => total + workout.caloriesBurned, 0);

  return (
    <main className="min-h-screen bg-[#101114] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <header>
          <h1 className="text-2xl font-black uppercase tracking-wide">My Plan</h1>
          <p className="mt-1 text-xs text-[#858792]">Cap of five lifts for today. Finish them, then load more.</p>
        </header>
        <section aria-label="Workout summary" className="mt-6 grid grid-cols-3 overflow-hidden rounded-xl border border-white/[0.07] bg-[#15171e]">
          {[
            ["Exercises", todaysPlan.length],
            ["Minutes", minutes],
            ["Calories", calories],
          ].map(([label, value], index) => (
            <div key={label} className={`px-3 py-4 sm:px-6 sm:py-5 ${index < 2 ? "border-r border-white/[0.05]" : ""}`}>
              <p className="text-[10px] font-medium text-[#858792] sm:text-xs">{label}</p>
              <h2 className="mt-1 text-2xl font-black leading-none text-[#ccff00] sm:text-3xl">{value}</h2>
            </div>
          ))}
        </section>
        <section className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Workout collection" className="inline-flex rounded-lg border border-white/[0.06] bg-[#15171e] p-1">
            {(["plan", "saved"] as const).map((tab) => (
              <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 text-[10px] font-semibold ${activeTab === tab ? "bg-[#252730] text-white" : "text-[#858792]"}`}>
                {tab === "plan" ? "Today's Plan" : "Saved"}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-[10px] text-[#858792]">
            Sort By
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-lg border border-white/[0.08] bg-[#15171e] px-3 py-2 text-white">
              <option>Duration</option><option>Calories</option><option>Rating</option>
            </select>
          </label>
        </section>
        {sortedWorkouts.length > 0 ? (
          <section className="mt-4 space-y-3">
            {sortedWorkouts.map((workout) => <PlanWorkoutCard key={workout.id} workout={workout} saved={activeTab === "saved"} />)}
          </section>
        ) : (
          <section className="mt-4 flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] px-5 py-12 text-center">
            <h2 className="text-sm font-extrabold uppercase tracking-wide">Nothing Here Yet</h2>
            <p className="mt-2 max-w-sm text-xs leading-5 text-[#858792]">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-5 rounded-full bg-[#ccff00] px-5 py-2.5 text-[10px] font-extrabold text-black">Go to workouts</Link>
          </section>
        )}
      </div>
    </main>
  );
};

export default MyPlanPage;
