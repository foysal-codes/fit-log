"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TWorkout } from "@/types/type";
import WorkoutCard from "@/components/LandingPages/WorkoutCard";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState<TWorkout[]>([]);
  const [sortBy, setSortBy] = useState("Duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Workout data could not be fetched.");
        return response.json();
      })
      .then(setWorkouts)
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const sortedWorkouts = useMemo(() => [...workouts].sort((a, b) => {
    if (sortBy === "Calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return a.duration - b.duration;
  }), [workouts, sortBy]);

  return (
    <section id="library" className="mx-auto mt-10 w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">The Library</h1>
          <p className="mt-1 text-xs text-[#9ca3af] sm:text-sm">Twelve lifts covering every major muscle group.</p>
        </div>
        <label className="flex items-center gap-2 text-xs text-[#858792]">
          Sort By
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-lg border border-white/[0.08] bg-[#15171e] px-3 py-2 text-white">
            <option>Duration</option><option>Calories</option><option>Rating</option>
          </select>
        </label>
      </div>
      {loading && <div className="flex min-h-48 items-center justify-center text-sm text-[#ccff00]">Loading workouts…</div>}
      {error && <p className="py-12 text-center text-sm text-red-300">{error}</p>}
      {!loading && !error && <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{sortedWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div>}
    </section>
  );
};

export default WorkoutPage;
