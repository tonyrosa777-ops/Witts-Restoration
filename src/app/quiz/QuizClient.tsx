"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  scoreQuiz,
  type QuizType,
} from "@/data/quiz";
import { quiz as quizConfig } from "@/data/site";

type Phase = "intro" | "question" | "results";

export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizType[]>([]);
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [resultType, setResultType] = useState<QuizType | null>(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  const handleStart = useCallback(() => {
    setPhase("question");
    setQuestionIndex(0);
    setAnswers([]);
    setDirection(1);
  }, []);

  const handleAnswer = useCallback(
    (answerIndex: number, type: QuizType) => {
      if (pendingAnswer !== null) return;
      setPendingAnswer(answerIndex);

      setTimeout(() => {
        const newAnswers = [...answers.slice(0, questionIndex), type];
        setAnswers(newAnswers);
        setPendingAnswer(null);

        if (questionIndex === totalQuestions - 1) {
          // Last question: score and go to results
          const result = scoreQuiz(newAnswers);
          setResultType(result);
          setDirection(1);
          setPhase("results");
        } else {
          setDirection(1);
          setQuestionIndex(questionIndex + 1);
        }
      }, 400);
    },
    [pendingAnswer, answers, questionIndex, totalQuestions]
  );

  const handleBack = useCallback(() => {
    if (phase === "question" && questionIndex === 0) {
      setPhase("intro");
      return;
    }
    if (phase === "question" && questionIndex > 0) {
      setDirection(-1);
      setAnswers(answers.slice(0, questionIndex - 1));
      setQuestionIndex(questionIndex - 1);
      return;
    }
    if (phase === "results") {
      setDirection(-1);
      setPhase("question");
      setQuestionIndex(totalQuestions - 1);
    }
  }, [phase, questionIndex, answers, totalQuestions]);

  const handleRetake = useCallback(() => {
    setPhase("intro");
    setQuestionIndex(0);
    setAnswers([]);
    setResultType(null);
    setDirection(1);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-base)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Progress indicator */}
        {phase !== "intro" && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleBack}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                &larr; Back
              </button>
              {phase === "question" && (
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}
                >
                  Step {questionIndex + 1} of {totalQuestions}
                </span>
              )}
            </div>
            {phase === "question" && (
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: "var(--bg-elevated)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--accent)" }}
                  initial={false}
                  animate={{
                    width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {/* ── INTRO PHASE ── */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="text-center py-16"
            >
              <h1
                className="text-h2 mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                {quizConfig.headline}
              </h1>
              <p
                className="text-lg mb-10 max-w-lg mx-auto"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-secondary)",
                }}
              >
                {quizConfig.subheadline}
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-200"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(212,160,23,0.4)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.filter = "none";
                }}
              >
                Start the Quiz
              </button>
            </motion.div>
          )}

          {/* ── QUESTION PHASE ── */}
          {phase === "question" && currentQuestion && (
            <motion.div
              key={`q-${questionIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2
                className="text-h3 mb-8 text-center"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                {currentQuestion.question}
              </h2>
              <div className="grid gap-3">
                {currentQuestion.answers.map((answer, idx) => {
                  const isSelected = pendingAnswer === idx;
                  const isDimmed =
                    pendingAnswer !== null && pendingAnswer !== idx;

                  return (
                    <button
                      key={`${currentQuestion.id}-${idx}`}
                      onClick={() => handleAnswer(idx, answer.type)}
                      disabled={pendingAnswer !== null}
                      className="relative w-full text-left rounded-xl px-5 py-4 transition-all duration-200 border"
                      style={{
                        background: isSelected
                          ? "rgba(212,160,23,0.12)"
                          : "var(--bg-card)",
                        borderColor: isSelected
                          ? "var(--accent)"
                          : "rgba(245,245,245,0.05)",
                        opacity: isDimmed ? 0.3 : 1,
                        boxShadow: isSelected
                          ? "0 0 16px rgba(212,160,23,0.25)"
                          : "none",
                        cursor: pendingAnswer !== null ? "default" : "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (pendingAnswer === null) {
                          e.currentTarget.style.borderColor =
                            "rgba(212,160,23,0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor =
                            "rgba(245,245,245,0.05)";
                        }
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {answer.emoji}
                        </span>
                        <span
                          className="text-base font-medium"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: isSelected
                              ? "var(--accent)"
                              : "var(--text-primary)",
                          }}
                        >
                          {answer.label}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── RESULTS PHASE ── */}
          {phase === "results" && resultType && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-8"
            >
              {(() => {
                const result = QUIZ_RESULTS[resultType];
                return (
                  <>
                    <div className="text-center mb-8">
                      <span
                        className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--accent)",
                          background: "rgba(212,160,23,0.1)",
                          border: "1px solid rgba(212,160,23,0.2)",
                        }}
                      >
                        Your Result
                      </span>
                      <h2
                        className="text-h2 mb-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {result.name}
                      </h2>
                      <p
                        className="text-lg"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--accent)",
                        }}
                      >
                        {result.tagline}
                      </p>
                    </div>

                    <div className="space-y-4 mb-10">
                      {result.body.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-base leading-relaxed"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Recommended service card */}
                    <div
                      className="rounded-xl p-6 mb-8 border"
                      style={{
                        background: "var(--bg-card)",
                        borderColor: "rgba(212,160,23,0.15)",
                      }}
                    >
                      <p
                        className="text-xs tracking-widest uppercase mb-2"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--text-muted)",
                        }}
                      >
                        Recommended Service
                      </p>
                      <h3
                        className="text-h3 mb-2"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {result.recommendedProgram.name}
                      </h3>
                      <p
                        className="text-sm mb-5"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {result.recommendedProgram.reason}
                      </p>
                      <Link
                        href="/booking"
                        className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold transition-all duration-200"
                        style={{
                          background: "var(--accent)",
                          color: "var(--bg-base)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 0 20px rgba(212,160,23,0.4)";
                          e.currentTarget.style.filter = "brightness(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.filter = "none";
                        }}
                      >
                        Book Your {result.recommendedProgram.name}
                      </Link>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={handleRetake}
                        className="text-sm font-medium transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--text-secondary)")
                        }
                      >
                        Retake the Quiz
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
