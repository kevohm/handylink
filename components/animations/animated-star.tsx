"use client";

import star from "@/assets/star.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AnimatedStarProps {
  size: "small" | "large";
  delay?: number;
  duration?: number;
  className?: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  index: number;
}

export function AnimatedStar({
  size = "small",
  delay = 0,
  duration = 20,
  className = "",
  position = {},
  index,
}: AnimatedStarProps) {
  const [randomMovement, setRandomMovement] = useState({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
    rotate: Math.random() * 20 - 10,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomMovement({
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        rotate: Math.random() * 20 - 10,
      });
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <motion.div
      className={`absolute z-0 ${className}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: randomMovement.x,
        y: randomMovement.y,
        rotate: randomMovement.rotate,
      }}
      
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        x: { duration, type: "spring", stiffness: 10, damping: 3 },
        y: { duration, type: "spring", stiffness: 10, damping: 3 },
        rotate: { duration, type: "spring", stiffness: 10, damping: 3 },
      }}
    >
      {size === "small" ? (
        <Image src={star} alt={`star-${index}`} width={20} height={60} />
      ) : (
        <Image src={star} alt={`star-${index}`} width={40} height={80} />
      )}
    </motion.div>
  );
}
