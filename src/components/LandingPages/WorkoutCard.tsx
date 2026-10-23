"use client";
import { TWorkout } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface WorkoutCardProps {
  workout: TWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link href={`/workouts/${workout.id}`} className="group block w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15161b] text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#ccff00]/30 hover:shadow-xl">
      {/* Workout Image */}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#202126]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Difficulty Badge */}
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#090a0c]/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          {workout.difficulty}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6">
        {/* Muscle Group Badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Title */}
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-extrabold uppercase leading-snug tracking-tight text-white sm:text-xl">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 truncate text-sm text-[#92939c]">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-5 border-t border-white/[0.08]" />

        {/* Workout Statistics */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-[#b0b1b9]">
          {/* Duration */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-4 w-4 shrink-0 text-[#ccff00]"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7v5l3 2"
              />
            </svg>
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 shrink-0 text-[#ccff00]"
              aria-hidden="true"
            >
              <path d="M12.5 2.5c.4 3.1-1.3 4.7-3 6.5C7.7 11 6 12.7 6 15.3a6 6 0 0 0 12 0c0-3.1-1.9-7.5-5.5-12.8Zm-.8 17.2a3 3 0 0 1-3-3c0-1.3.7-2.3 1.7-3.4.6-.7 1.2-1.3 1.5-2.1.9 1.6 2.8 3.7 2.8 5.5a3 3 0 0 1-3 3Z" />
            </svg>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 shrink-0 text-[#ccff00]"
              aria-hidden="true"
            >
              <path d="m12 2 2.9 6 6.6.9-4.8 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.5 8.9 9.1 8 12 2Z" />
            </svg>
            <span>{workout.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
