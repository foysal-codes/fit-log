"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TWorkout } from "@/types/type";

interface WorkoutContextValue {
  todaysPlan: TWorkout[];
  savedWorkouts: TWorkout[];
  addToPlan: (workout: TWorkout) => boolean;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: TWorkout) => void;
  removeSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  notify: (message: string) => void;
}

export const WorkoutContext = createContext<WorkoutContextValue | undefined>(undefined);

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkouts must be used within WorkoutProvider");
  return context;
}

const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<TWorkout[]>(() => readStoredWorkouts("fitlog-plan"));
  const [savedWorkouts, setSavedWorkouts] = useState<TWorkout[]>(() => readStoredWorkouts("fitlog-saved"));
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(todaysPlan));
  }, [todaysPlan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = (message: string) => setToast(message);
  const addToPlan = (workout: TWorkout) => {
    if (todaysPlan.some((item) => item.id === workout.id)) {
      notify("This lift is already in today's plan");
      return false;
    }
    if (todaysPlan.length >= 5) {
      notify("Today's plan is full");
      return false;
    }
    setTodaysPlan((current) => [...current, workout]);
    notify("Added to today's plan");
    return true;
  };
  const removeFromPlan = (id: number) => {
    setTodaysPlan((current) => current.filter((item) => item.id !== id));
    notify("Removed from today's plan");
  };
  const saveWorkout = (workout: TWorkout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      notify("This lift is already saved");
      return;
    }
    setSavedWorkouts((current) => [...current, workout]);
    notify("Saved for later");
  };
  const removeSaved = (id: number) => {
    setSavedWorkouts((current) => current.filter((item) => item.id !== id));
    notify("Removed from saved");
  };
  const markAsDone = (id: number) => {
    setTodaysPlan((current) => current.filter((item) => item.id !== id));
    notify("Workout marked as done");
  };

  return (
    <WorkoutContext.Provider value={{ todaysPlan, savedWorkouts, addToPlan, removeFromPlan, saveWorkout, removeSaved, markAsDone, notify }}>
      {children}
      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-bold text-black shadow-2xl">
          {toast}
        </div>
      )}
    </WorkoutContext.Provider>
  );
};

function readStoredWorkouts(key: string): TWorkout[] {
  if (typeof window === "undefined") return [];
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as TWorkout[] : [];
  } catch {
    localStorage.removeItem(key);
    return [];
  }
}

export default WorkoutProvider;
