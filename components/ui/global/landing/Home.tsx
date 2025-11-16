"use client"
import Search from '@/app/search/page';
import React from 'react'
import Navbar from '@/components/ui/global/Navbar';
import Hero from '@/app/components/Hero';
import HowItWorks from '@/app/components/HowItWorks';
import { useUser } from '@clerk/nextjs';
import HomeSkeleton from './HomeSkeleton';

const Home = () => {
   const { isSignedIn, isLoaded } = useUser();

   // Once loading is complete, display the page based on the signed-in state
   if(!isLoaded) return <HomeSkeleton/>
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

export default Home