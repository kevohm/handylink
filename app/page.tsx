"use client";

import Navbar from "@/components/ui/global/Navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Search from "./search/page";
import Loader from "@/components/ui/global/Loader";

export default function Home() {
  const { isSignedIn } = useUser();



  // Once loading is complete, display the page based on the signed-in state
  return isSignedIn ? (
    <Search />
  ) : (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
    </main>
  );
}
