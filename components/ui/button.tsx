"use client";

import { motion, type MotionProps } from "framer-motion";
import Link from "next/link";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

interface CommonButtonProps {
  variant?: "primary" | "text" | "outline";
  icon?: ReactNode;
  fullWidth?: boolean;
  padding?: string;
  href?: string;
}

// ✅ Fix: restrict rest props to valid motion props + native ones
type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;
type MotionAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & MotionProps;

type ButtonProps = CommonButtonProps &
  (
    | ({
        href?: undefined;
      } & MotionButtonProps)
    | ({
        href: string;
      } & MotionAnchorProps)
  ) & {
    children: ReactNode;
  };

export function Button({
  children,
  variant = "primary",
  icon,
  fullWidth = false,
  padding,
  href,
  className = "",
  ...rest
}: ButtonProps) {
  const baseClass =
    "flex items-center justify-center gap-2 rounded-full transition-all duration-200 font-medium";

  const variantClass = {
    primary: "bg-green-light text-black hover:bg-green-light/80 px-6 py-2",
    outline:
      "border border-green-light text-green-light hover:bg-green-light hover:text-black px-6 py-2",
    text: "text-green-light hover:underline px-6 py-2",
  }[variant];

  const widthClass = fullWidth ? "w-full" : "";
  const paddingClass = padding || "";

  const motionProps: MotionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  // ✅ Handle Link case
  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClass} ${variantClass} ${widthClass} ${paddingClass} ${className}`}
      >
        <motion.span
          className="flex items-center justify-center gap-2 w-full"
          {...motionProps}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  // ✅ Handle Button case (with all native + motion props safely)
  return (
    <motion.button
      className={`${baseClass} ${variantClass} ${widthClass} ${paddingClass} ${className}`}
      {...(rest as MotionButtonProps)}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
