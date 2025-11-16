"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type MotionProps } from "framer-motion";
import Link from "next/link";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

// ✅ Define reusable variant + size system
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-sky-500 text-white hover:bg-sky-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        ghost: "bg-transparent hover:bg-gray-100",
        primary: "bg-green-light text-black hover:bg-green-light/80",
        outline:
          "border border-green-light text-green-light hover:bg-green-light hover:text-black",
        text: "text-green-light hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ✅ Common props shared between <button> and <Link>
interface CommonButtonProps extends VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  fullWidth?: boolean;
  padding?: string;
  href?: string;
  size?: "default" | "sm" | "lg";
  children: ReactNode;
  variant?:
    | "primary"
    | "destructive"
    | "secondary"
    | "outline"
    | "text"
    | "default"
    | "ghost"; // keep your own variants
}

type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;
type MotionAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & MotionProps;

// ✅ Unified ButtonProps type
export type ButtonProps = CommonButtonProps &
  (
    | ({ href?: undefined } & MotionButtonProps)
    | ({ href: string } & MotionAnchorProps)
  );

export function Button({
  children,
  variant = "primary",
  size = "default",
  icon,
  fullWidth = false,
  padding,
  href,
  className = "",
  ...rest
}: ButtonProps) {
const motionProps: MotionProps = {
  whileHover: {
    scale: 1.015, // gentle zoom
    y: -1, // soft lift
    // backgroundColor: "rgba(0,0,0,0.02)", // tiny contrast change (works great on light backgrounds)
  },
  whileTap: {
    scale: 0.985, // small press feedback
    y: 0,
  },
  transition: {
    type: "spring",
    stiffness: 250,
    damping: 18,
    mass: 0.8,
  },
};



  const buttonClass = cn(
    buttonVariants({ variant, size }),
    "flex items-center justify-center gap-2 rounded-full transition-all duration-200 font-medium",
    fullWidth && "w-full",
    padding,
    className
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        <motion.span
          className="flex items-center justify-center gap-2 w-full"
          {...motionProps}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      className={buttonClass}
      {...(rest as MotionButtonProps)}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
