import type { Metadata } from "next";
import { seoMeta } from "@/data/site";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: seoMeta.quiz.title,
  description: seoMeta.quiz.description,
};

export default function QuizPage() {
  return <QuizClient />;
}
