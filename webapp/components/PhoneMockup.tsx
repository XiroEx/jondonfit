"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample programs for the mockup
const programs = [
  {
    id: "become",
    name: "BECOME — 12 Week Fat-Loss",
    subtitle: "Beginners • Lose Fat • Build Habits",
    duration: "12 weeks",
    days: 4,
    phases: [
      {
        name: "Phase 1 (1-4)",
        focus: "Movement quality, perfecting form, building a base of strength + conditioning.",
        days: [
          {
            name: "Day 1",
            title: "Upper Body Strength + Conditioning",
            exercises: [
              { name: "Bench Press", sets: 3, reps: "8-10", rest: "90s" },
              { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90s" },
              { name: "Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "90s" },
            ],
          },
          {
            name: "Day 2",
            title: "Lower Body Strength",
            exercises: [
              { name: "Back Squat", sets: 3, reps: "8", rest: "2 min" },
              { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "2 min" },
              { name: "Leg Press", sets: 3, reps: "12", rest: "90s" },
            ],
          },
          {
            name: "Day 3",
            title: "Full Body Strength",
            exercises: [
              { name: "Deadlift", sets: 3, reps: "5", rest: "2-3 min" },
              { name: "Dumbbell Bench Press", sets: 3, reps: "10", rest: "90s" },
              { name: "Pull-ups", sets: 3, reps: "AMRAP", rest: "90s" },
            ],
          },
          {
            name: "Day 4",
            title: "Conditioning + Core",
            exercises: [
              { name: "Assault Bike Intervals", sets: 10, reps: "15s on/45s off", rest: "-" },
              { name: "Plank Hold", sets: 3, reps: "45s", rest: "60s" },
              { name: "Russian Twists", sets: 3, reps: "20", rest: "60s" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "upperlower",
    name: "Upper x Lower Split",
    subtitle: "Intermediate • Hypertrophy • 4 Days",
    duration: "4 weeks",
    days: 4,
    phases: [
      {
        name: "Level 1",
        focus: "Hypertrophy-driven regimen for muscle growth and strength development.",
        days: [
          {
            name: "Day 1",
            title: "Upper Push",
            exercises: [
              { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "90s" },
              { name: "Overhead Press", sets: 3, reps: "10", rest: "90s" },
              { name: "Cable Flyes", sets: 3, reps: "12-15", rest: "60s" },
            ],
          },
          {
            name: "Day 2",
            title: "Lower Strength",
            exercises: [
              { name: "Front Squat", sets: 4, reps: "6-8", rest: "2 min" },
              { name: "Leg Curl", sets: 3, reps: "10-12", rest: "90s" },
              { name: "Calf Raises", sets: 4, reps: "15", rest: "60s" },
            ],
          },
          {
            name: "Day 3",
            title: "Upper Pull",
            exercises: [
              { name: "Weighted Pull-ups", sets: 4, reps: "6-8", rest: "2 min" },
              { name: "Barbell Row", sets: 4, reps: "8-10", rest: "90s" },
              { name: "Face Pulls", sets: 3, reps: "15", rest: "60s" },
            ],
          },
          {
            name: "Day 4",
            title: "Lower Hypertrophy",
            exercises: [
              { name: "Hack Squat", sets: 4, reps: "10-12", rest: "90s" },
              { name: "RDL", sets: 3, reps: "10-12", rest: "90s" },
              { name: "Leg Extensions", sets: 3, reps: "15", rest: "60s" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "shred",
    name: "6-Week Shred Protocol",
    subtitle: "Advanced • Cut • High Intensity",
    duration: "6 weeks",
    days: 5,
    phases: [
      {
        name: "Weeks 1-3",
        focus: "High volume training with progressive cardio increase.",
        days: [
          {
            name: "Day 1",
            title: "Push + HIIT",
            exercises: [
              { name: "Incline DB Press", sets: 4, reps: "10-12", rest: "60s" },
              { name: "Lateral Raises", sets: 4, reps: "15", rest: "45s" },
              { name: "Treadmill Sprints", sets: 8, reps: "30s on/30s off", rest: "-" },
            ],
          },
          {
            name: "Day 2",
            title: "Pull + Core",
            exercises: [
              { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "60s" },
              { name: "Cable Rows", sets: 4, reps: "12", rest: "60s" },
              { name: "Hanging Leg Raises", sets: 3, reps: "15", rest: "45s" },
            ],
          },
          {
            name: "Day 3",
            title: "Legs",
            exercises: [
              { name: "Goblet Squats", sets: 4, reps: "12-15", rest: "60s" },
              { name: "Walking Lunges", sets: 3, reps: "20 steps", rest: "60s" },
              { name: "Stair Climber", sets: 1, reps: "15 min", rest: "-" },
            ],
          },
        ],
      },
    ],
  },
];

type View = "list" | "detail";

export default function PhoneMockup() {
  const [view, setView] = useState<View>("list");
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const handleProgramClick = (program: typeof programs[0]) => {
    setSelectedProgram(program);
    setSelectedPhase(0);
    setSelectedDay(0);
    setView("detail");
  };

  const currentPhase = selectedProgram.phases[selectedPhase];
  const currentDay = currentPhase?.days[selectedDay];

  return (
    <div className="relative mx-auto">
      {/* Phone Frame */}
      <div className="relative w-[280px] sm:w-[320px]">
        {/* Phone outer frame */}
        <div className="relative rounded-[3rem] bg-zinc-900 p-3 shadow-2xl">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-20 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-zinc-900" />
          
          {/* Screen */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-950">
            {/* Status Bar */}
            <div className="flex h-12 items-center justify-between bg-zinc-50 px-6 pt-2 dark:bg-zinc-900">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="h-2.5 w-0.5 rounded-full bg-zinc-600 dark:bg-zinc-400" />
                  <div className="h-3 w-0.5 rounded-full bg-zinc-600 dark:bg-zinc-400" />
                  <div className="h-3.5 w-0.5 rounded-full bg-zinc-600 dark:bg-zinc-400" />
                  <div className="h-4 w-0.5 rounded-full bg-zinc-600 dark:bg-zinc-400" />
                </div>
                <svg className="h-4 w-4 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 11h2v2H2v-2zm4 0h14a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
                </svg>
              </div>
            </div>

            {/* App Content */}
            <div className="h-[480px] sm:h-[540px] overflow-hidden bg-white dark:bg-zinc-950">
              <AnimatePresence mode="wait">
                {view === "list" ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full overflow-y-auto"
                  >
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white/90 px-4 py-4 backdrop-blur-sm dark:bg-zinc-950/90">
                      <h1 className="text-lg font-bold text-zinc-900 dark:text-white">Programs</h1>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Choose your training path</p>
                    </div>

                    {/* Program List */}
                    <div className="space-y-3 px-4 pb-6">
                      {programs.map((program) => (
                        <button
                          key={program.id}
                          onClick={() => handleProgramClick(program)}
                          className="group w-full text-left"
                        >
                          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/50">
                            {/* Accent bar */}
                            <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-green-500 to-emerald-600" />
                            
                            <div className="ml-2">
                              <h3 className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight">
                                {program.name}
                              </h3>
                              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                {program.subtitle}
                              </p>
                              <div className="mt-3 flex items-center gap-3">
                                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {program.duration}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {program.days}x/week
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <svg 
                              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-300 transition-transform group-hover:translate-x-1 dark:text-zinc-600" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col"
                  >
                    {/* Header with back button */}
                    <div className="sticky top-0 z-10 flex items-center gap-3 bg-white/90 px-4 py-3 backdrop-blur-sm dark:bg-zinc-950/90 border-b border-zinc-100 dark:border-zinc-800">
                      <button
                        onClick={() => setView("list")}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                      >
                        <svg className="h-4 w-4 text-zinc-600 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div className="flex-1 min-w-0">
                        <h1 className="text-sm font-bold text-zinc-900 dark:text-white truncate">{selectedProgram.name}</h1>
                      </div>
                    </div>

                    {/* Program Content */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Phase Pills */}
                      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
                        {selectedProgram.phases.map((phase, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedPhase(idx);
                              setSelectedDay(0);
                            }}
                            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                              selectedPhase === idx
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                          >
                            {phase.name}
                          </button>
                        ))}
                      </div>

                      {/* Focus */}
                      <div className="mx-4 rounded-xl bg-linear-to-r from-zinc-50 to-zinc-100 p-3 dark:from-zinc-900 dark:to-zinc-800">
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-900 dark:text-white">Focus: </span>
                          {currentPhase.focus}
                        </p>
                      </div>

                      {/* Day Pills */}
                      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
                        {currentPhase.days.map((day, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedDay(idx)}
                            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                              selectedDay === idx
                                ? "bg-zinc-900 text-white shadow-md dark:bg-white dark:text-black"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                          >
                            {day.name}
                          </button>
                        ))}
                      </div>

                      {/* Workout */}
                      <div className="px-4 pb-6">
                        <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
                          {currentDay.title}
                        </h2>

                        <div className="space-y-2">
                          {currentDay.exercises.map((exercise, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                            >
                              <div className="flex items-start gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                  {idx + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                                    {exercise.name}
                                  </h4>
                                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                                    <span>{exercise.sets} sets</span>
                                    <span>{exercise.reps}</span>
                                  </div>
                                </div>
                              </div>
                              {exercise.rest !== "-" && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Rest: {exercise.rest}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Start Button */}
                    <div className="border-t border-zinc-100 bg-white/90 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
                      <button className="w-full rounded-xl bg-linear-to-r from-zinc-900 to-zinc-700 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98] dark:from-white dark:to-zinc-200 dark:text-black">
                        Start Program
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Home Indicator */}
            <div className="flex h-8 items-center justify-center bg-white dark:bg-zinc-950">
              <div className="h-1 w-28 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* Reflection/glow effect */}
        <div className="absolute -inset-4 -z-10 rounded-[4rem] bg-linear-to-b from-green-500/20 to-transparent opacity-50 blur-2xl" />
      </div>
    </div>
  );
}
