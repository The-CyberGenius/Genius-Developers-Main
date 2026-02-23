"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOuterRef = useRef<HTMLDivElement>(null);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the outer circle (lag effect)
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if hovering over clickable elements
            const target = e.target as HTMLElement;
            const isClickable = target.closest("a, button, input, textarea, [role='button']");
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Inner Dot - Instant Follow */}
            <motion.div
                ref={cursorRef}
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            />

            {/* Outer Ring - Smooth Follow & Scale */}
            <motion.div
                ref={cursorOuterRef}
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 60 : 32,
                    height: isHovering ? 60 : 32,
                    opacity: isHovering ? 0.3 : 0.6,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    border: isHovering ? "none" : "1px solid rgba(255, 255, 255, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] backdrop-blur-[1px] mix-blend-difference"
            />
        </>
    );
}
