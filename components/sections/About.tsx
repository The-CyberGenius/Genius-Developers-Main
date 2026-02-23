"use client";

import { motion } from "framer-motion";
import { Code, Terminal, Cpu, Globe, Rocket, Zap, Users } from "lucide-react";


const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Delivered", value: "25+" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Revenue Generated", value: "10x" }, // Abstract business impact
];

export default function About() {
    return (
        <section id="about" className="py-24 relative bg-black overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/5 blur-[150px] -z-10" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-fuchsia-600/5 blur-[150px] -z-10" />

            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-white leading-tight">
                            Engineering <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                                Digital Dominance
                            </span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-400">
                            <p>
                                I don&apos;t just write code; <span className="text-white font-medium">I architect revenue-generating engines.</span> In a digital landscape crowded with mediocrity, I build platforms that demand attention and convert visitors into loyal customers.
                            </p>
                            <p>
                                My philosophy is simple: <span className="text-white font-medium">Speed wins, aesthetics sell, and precision scales.</span> Whether you need a high-performance web app or a brand-defining portfolio, I deliver solutions that put you leagues ahead of the competition.
                            </p>
                        </div>

                        {/* Tech Stack Pills (Subtle) */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            {["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "Node.js"].map((tech, i) => (
                                <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Abstract Tech Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center items-center"
                    >
                        {/* Background Glow */}
                        <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />

                        {/* Floating Terminal */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-md bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
                        >
                            {/* Window Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="ml-auto text-xs text-gray-500 font-mono flex items-center gap-1">
                                    <Terminal className="w-3 h-3" />
                                    <span>developer.tsx</span>
                                </div>
                            </div>

                            {/* Code Content */}
                            <div className="p-6 space-y-4 font-mono text-sm">
                                <div className="flex gap-2">
                                    <span className="text-pink-500">const</span>
                                    <span className="text-blue-400">createExperience</span>
                                    <span className="text-white">=</span>
                                    <span className="text-yellow-400">async</span>
                                    <span className="text-white">()</span>
                                    <span className="text-white">=&gt;</span>
                                    <span className="text-white">{`{`}</span>
                                </div>
                                <div className="pl-4 space-y-2">
                                    <div>
                                        <span className="text-white">await</span>
                                        <span className="text-green-400"> market.dominate</span>
                                        <span className="text-white">();</span>
                                    </div>
                                    <div>
                                        <span className="text-white">return</span>
                                        <span className="text-white">{`{`}</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">speed:</span>
                                        <span className="text-orange-400"> "100ms"</span>
                                        <span className="text-white">,</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">design:</span>
                                        <span className="text-orange-400"> "God-Tier"</span>
                                        <span className="text-white">,</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">impact:</span>
                                        <span className="text-orange-400"> "Maximum"</span>
                                    </div>
                                    <div>
                                        <span className="text-white">{`};`}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-white">{`}`}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Orbits Elements */}
                        <motion.div
                            animate={{ y: [0, 30, 0], rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute -right-8 -top-8 p-4 bg-zinc-800/80 backdrop-blur border border-white/10 rounded-2xl shadow-xl"
                        >
                            <Rocket className="w-8 h-8 text-indigo-400" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -40, 0], rotate: -12 }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -left-6 bottom-12 p-3 bg-zinc-800/80 backdrop-blur border border-white/10 rounded-xl shadow-xl"
                        >
                            <Zap className="w-6 h-6 text-yellow-400" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Stats Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/10 pt-12"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-fuchsia-400 transition-all">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
