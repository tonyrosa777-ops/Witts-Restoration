"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  text: string;
  type?: "words" | "chars";
  stagger?: number;
  className?: string;
}

export default function RevealText({ text, type = "words", stagger = 0.03, className }: Props) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const units = type === "words" ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={className}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * stagger }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {unit}{type === "words" && i < units.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
