"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion, MotionProps } from "motion/react"

const MainButton = ({ children, href, className, background, classHover, motionProps }: { children: React.ReactNode, href?: string, className?: string, background?: string, classHover?: string, motionProps?: MotionProps }) => {
    if (href) {
        return (
            <motion.div {...motionProps} className="inline-flex p-0 m-0">
                <Link className={cn("rounded-[20px] inline-flex flex-col relative overflow-hidden p-5 m-5 text-center group", className)} href={href}>
                    <span className={cn("rounded-[20px] absolute left-0 hoverEffect", background)}></span>
                    <span className="z-10">{children}</span>
                    <span className={cn("rounded-[20px] absolute left-0 hoverEffect", classHover)}></span>
                </Link>
            </motion.div>
        )
    }
    return (
        <motion.div {...motionProps} className="inline-flex p-0 m-0">
            <button className={cn("rounded-[20px] inline-flex flex-col relative overflow-hidden p-5 m-5 text-center group", className)}>
                <span className={cn("rounded-[20px] absolute left-0 hoverEffect", background)}></span>
                <span className="z-10">{children}</span>
                <span className={cn("rounded-[20px] absolute left-0 hoverEffect", classHover)}></span>
            </button>
        </motion.div>
    )
}

export default MainButton;