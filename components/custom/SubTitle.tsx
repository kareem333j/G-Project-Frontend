"use client";
import { cn } from '@/lib/utils'
import { motion, MotionProps } from "framer-motion";


const SubTitle = ({ children, className, motionProps }: { children: React.ReactNode, className?: string, motionProps?: MotionProps }) => {
  return (
    <motion.p
      {...motionProps}
      className={cn("text-2xl font-semibold mb-1", className)}
    >
      {children}
    </motion.p>
  )
}

export default SubTitle