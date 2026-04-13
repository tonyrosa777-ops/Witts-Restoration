// quiz.ts — Quiz data layer
// All quiz logic, zero UI dependency
// Sources quiz types, questions, and results from site.ts data

import type { QuizType } from "./site";
import { quiz as quizConfig, quizResults as siteQuizResults } from "./site";

export type { QuizType } from "./site";

// Re-export results keyed by QuizType
export const QUIZ_RESULTS = siteQuizResults;

// ──────────────────────────────────────────────
// QUIZ QUESTIONS — each answer tagged with QuizType
// 5 questions (minimum needed to reliably type)
// ──────────────────────────────────────────────

export interface QuizAnswer {
  emoji: string;
  label: string;
  type: QuizType;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "situation",
    question: quizConfig.steps[0].question,
    answers: [
      { emoji: "🚨", label: "Stranded or need a tow right now", type: "emergencyRescue" },
      { emoji: "🦊", label: "Rust, dents, or body damage", type: "rustFighter" },
      { emoji: "🔩", label: "Restoration or project build", type: "dreamBuilder" },
      { emoji: "🏔️", label: "Snowmobile or ATV needs work", type: "trailRider" },
    ],
  },
  {
    id: "timeline",
    question: quizConfig.steps[1].question,
    answers: [
      { emoji: "🔥", label: "Right now, it's urgent", type: "emergencyRescue" },
      { emoji: "📅", label: "This week or next", type: "rustFighter" },
      { emoji: "🗓️", label: "Within a month or two", type: "dreamBuilder" },
      { emoji: "🤔", label: "Just exploring my options", type: "trailRider" },
    ],
  },
  {
    id: "vehicle",
    question: quizConfig.steps[2].question,
    answers: [
      { emoji: "🛻", label: "Truck or SUV", type: "rustFighter" },
      { emoji: "🚗", label: "Car or sedan", type: "emergencyRescue" },
      { emoji: "🏎️", label: "Classic or project vehicle", type: "dreamBuilder" },
      { emoji: "🏔️", label: "Snowmobile or ATV", type: "trailRider" },
    ],
  },
  {
    id: "concern",
    question: "What's your biggest concern right now?",
    answers: [
      { emoji: "⏰", label: "I need help fast, time matters", type: "emergencyRescue" },
      { emoji: "💸", label: "Rust is getting worse and I can't keep ignoring it", type: "rustFighter" },
      { emoji: "💭", label: "I've got a vision for this build and need someone skilled", type: "dreamBuilder" },
      { emoji: "🏁", label: "Trail season is coming and my ride isn't ready", type: "trailRider" },
    ],
  },
  {
    id: "outcome",
    question: "What does the ideal outcome look like?",
    answers: [
      { emoji: "🚛", label: "Get me and my vehicle somewhere safe, now", type: "emergencyRescue" },
      { emoji: "✅", label: "Pass inspection and stop the rust from spreading", type: "rustFighter" },
      { emoji: "🌟", label: "A vehicle I'm proud to drive, fully restored", type: "dreamBuilder" },
      { emoji: "🛷", label: "A sled or quad that runs perfect all season", type: "trailRider" },
    ],
  },
];

// ──────────────────────────────────────────────
// scoreQuiz — pure, deterministic, testable
// Counts type occurrences, returns highest
// ──────────────────────────────────────────────

export function scoreQuiz(answers: QuizType[]): QuizType {
  const counts: Record<string, number> = {};
  for (const answer of answers) {
    counts[answer] = (counts[answer] || 0) + 1;
  }

  let maxType: QuizType = "emergencyRescue";
  let maxCount = 0;

  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type as QuizType;
    }
  }

  return maxType;
}
