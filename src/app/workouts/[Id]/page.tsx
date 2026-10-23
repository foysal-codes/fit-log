import SavedPlan from "@/Buttons/SavedPlan";
import TodaysPlan from "@/Buttons/TodaysPlan";
import { TWorkout } from "@/types/type";
import Image from "next/image";
import { notFound } from "next/navigation";

interface WorkoutDetailProps {
  params: Promise<{
    Id: string;
  }>;
}

const getData = async (): Promise<TWorkout[]> => {
  "use cache";

  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Workout data could not be fetched.");
  }

  return res.json();
};

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, index) => ({ Id: String(index + 1) }));
}

const WorkoutDetailPage = async ({ params }: WorkoutDetailProps) => {
  const { Id } = await params;
  const workouts = await getData();

  const workout = workouts.find((exercise) => String(exercise.id) === Id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#101114] px-4 py-8 text-white sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14">
        {/* Workout Image */}
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#191a1f]">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Image overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 sm:p-7">
            <span className="inline-flex rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
              {workout.difficulty}
            </span>
          </div>
        </div>

        {/* Workout Information */}
        <section className="min-w-0">
          {/* Title and Description */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              Workout Details
            </p>

            <h1 className="text-2xl font-black uppercase leading-tight tracking-wide sm:text-3xl xl:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#a1a1aa] sm:text-base">
              {workout.description}
            </p>
          </div>

          {/* Muscle Groups */}
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Statistics */}
          <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-[#171920]">
            {[
              {
                label: "Equipment",
                value: workout.equipment,
              },
              {
                label: "Difficulty",
                value: workout.difficulty,
              },
              {
                label: "Sets",
                value: String(workout.sets),
              },
              {
                label: "Reps",
                value: String(workout.reps),
              },
              {
                label: "Duration",
                value: workout.duration,
              },
              {
                label: "Calories",
                value: `${workout.caloriesBurned} kcal`,
              },
              {
                label: "Rating",
                value: `${Number(workout.rating).toFixed(1)} / 5`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3 last:border-b-0 sm:px-5"
              >
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#858792]">
                  {stat.label}
                </span>

                <span className="break-words text-right text-xs font-semibold text-[#e5e7eb]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-7">
            <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wider">
              Instructions
            </h2>

            <ol className="space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex items-start gap-3 text-xs leading-6 text-[#a1a1aa] sm:text-sm"
                >
                  <span className="mt-0.5 shrink-0 font-bold text-[#666e43]">
                    {index + 1}.
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TodaysPlan workout={workout}></TodaysPlan>
            <SavedPlan workout={workout}></SavedPlan>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkoutDetailPage;
