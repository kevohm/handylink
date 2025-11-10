"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // You can use any other loader icon if you prefer

export default function  Loader() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Spinning loader animation */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="mb-6"
        >
          <Loader2 className="mx-auto text-green-light w-16 h-16 animate-spin" />
        </motion.div>

        {/* Title text with fade-in animation */}
        <motion.h1 className="text-3xl font-bold mb-4">
          Loading, Please Wait...
        </motion.h1>

        {/* Description text with fade-in animation */}
        <motion.p className="text-gray-600 mb-8">
          We&apos;re processing your request. It won&apos;t be long now!
        </motion.p>
      </div>
    </main>
  );
}
