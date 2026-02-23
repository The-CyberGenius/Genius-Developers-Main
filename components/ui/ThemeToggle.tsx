"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
                opacity: 1,
                y: [0, -10, 0], // Floating effect
            }}
            transition={{
                y: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                },
                opacity: { duration: 0.5 }
            }}
            className="absolute top-6 right-6 z-50 md:top-10 md:right-10"
        >
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-shadow group overflow-hidden"
                aria-label="Toggle Theme"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                        {theme === "dark" ? (
                            <motion.div
                                key="moon"
                                initial={{ y: -20, opacity: 0, rotate: -45 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: 20, opacity: 0, rotate: 45 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Moon className="w-5 h-5 md:w-6 md:h-6 text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.6)]" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ y: -20, opacity: 0, rotate: -45 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: 20, opacity: 0, rotate: 45 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Sun className="w-5 h-5 md:w-6 md:h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </button>
        </motion.div>
    );
}
