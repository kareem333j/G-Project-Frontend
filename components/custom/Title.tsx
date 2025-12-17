"use client";
import { cn } from '@/lib/utils'
import { motion, MotionProps } from "framer-motion"


const Title = ({ children, className, motionProps }: { children: React.ReactNode, className?: string, motionProps?: MotionProps }) => {
  return (
    <motion.h1
      {...motionProps}
      className={cn("text-4xl font-bold mb-3", className)}
    >
      {children}
    </motion.h1>
  )
}

export default Title