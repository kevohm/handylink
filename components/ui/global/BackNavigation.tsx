import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "../button";
import { Logo } from "../logo";
import Link from "next/link";

const BackNavigation = () => {
  return (
    <motion.nav
      className="flex items-center justify-between py-6 px-24"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/">
    
      <Button
        variant="text"
        className="mr-auto"
        icon={<ArrowLeft size={18} />}
      >
        <span className="sr-only">Back</span>
      </Button>
      </Link>
      <Logo />
    </motion.nav>
  );
};

export default BackNavigation;
