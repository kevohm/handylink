"use client";

import { AnimatedStar } from "@/components/animations/animated-star";
import Navbar from "@/components/ui/global/Navbar";
import SearchInput from "@/components/ui/global/SearchInput";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Search() {


  const stars = [
    { className: "text-green-light", position: { top: "20%", left: "5%" }, size: "large", delay: 0.2, duration: 15 },
    { className: "text-green-light", position: { bottom: "40%", left: "20%" }, size: "small", delay: 0.8, duration: 20 },
    { className: "text-green-light", position: { bottom: "15%", right: "10%" }, size: "large", delay: 1.1, duration: 17 },
    { className: "text-green-light", position: { top: "20%", right: "30%" }, size: "small", delay: 0.5, duration: 18 },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Stars */}
      {stars.map((star, index) => (
        <AnimatedStar
        index={index}
          key={index}
          className={star.className}
          position={star.position}
          size={star.size as "small" | "large"}
          delay={star.delay}
          duration={star.duration}
        />
      ))}

      {/* Header */}
      <Navbar />

      {/* Search Content */}
      <div className="z-40 max-w-2xl mx-auto px-6 py-20 text-center">
        <motion.h1
          className="text-5xl font-passionOne font-bold  mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What do you need
          <br />
          help with today?
        </motion.h1>

        <motion.p
          className="text-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Need an extra hand? Tell us who you're looking for and
          <br />
          your budget.
        </motion.p>

        <motion.div
          className="mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchInput/>
        </motion.div>

        <motion.p
          className="text-sm text-gray-500 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Be specific! Mention the task, personality, and budget to get the best
          matches.
        </motion.p>
      </div>
    </main>
  );
}
