import React from "react";
import ExerciseCard from "./WorkoutCard";
import { TWorkout } from "@/types/type";
import WorkoutCard from "./WorkoutCard";
const getData = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    next: {
      revalidate: 2,
    },
  });
  if (!res.ok) {
    throw new Error("Data can not fetched ");
  }
  return res.json();
};
const LibraryPage = async () => {
  const workouts = await getData();
  return (
    <div className="mx-4 mt-10 ">
      <div>
        <h1 className="text-base font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[38px]">
          THE LIBRARY
        </h1>
        <h4 className="mt-1 mb-5 max-w-md text-xs leading-relaxed text-[#9ca3af] sm:text-sm">
          Twelve lifts covering every major muscle group
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-3 ">
        {workouts.map((workout: TWorkout, id: number) => (
          <WorkoutCard key={id} workout={workout}></WorkoutCard>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
