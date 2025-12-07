"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimationDirection = "up" | "left" | "right" | "none";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
}

const getInitialPosition = (direction: AnimationDirection) => {
  switch (direction) {
    case "left":
      return { opacity: 0, x: -60, y: 0 };
    case "right":
      return { opacity: 0, x: 60, y: 0 };
    case "up":
      return { opacity: 0, x: 0, y: 50 };
    case "none":
      return { opacity: 0, x: 0, y: 0 };
    default:
      return { opacity: 0, x: 0, y: 50 };
  }
};

export default function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  direction = "up"
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const initial = getInitialPosition(direction);
  const animate = isInView 
    ? { opacity: 1, x: 0, y: 0 } 
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
