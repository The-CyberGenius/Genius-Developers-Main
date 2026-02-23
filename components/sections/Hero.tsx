"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    mass: number;
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 60; // Adjust for density
        const colors = ["#8B5CF6", "#3B82F6", "#10B981", "#F472B6", "#ffffff"]; // Vibrant palette

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const radius = Math.random() * 3 + 1;
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5, // Slow drift velocity
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: radius,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    mass: radius,
                });
            }
        };

        // Physics Constants
        const mouse = { x: -1000, y: -1000, radius: 200 };
        const friction = 0.99;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear but keep trail? No, clear.

            // Cool gradient background for the canvas itself if needed, but we rely on container bg

            particles.forEach((p) => {
                // Update
                // Mouse interaction (Repulsion / Antigravity field)
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * 5; // Strength
                    const directionY = forceDirectionY * force * 5;

                    p.vx -= directionX;
                    p.vy -= directionY;
                }

                // Apply velocities
                p.x += p.vx;
                p.y += p.vy;

                // Friction (Space drift)
                p.vx *= friction;
                p.vy *= friction;

                // Boundaries (Bounce)
                if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
                if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;

                // Add glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;

                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            });

            // Connect particles
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        // Initialize
        resizeCanvas();
        draw();

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* 1. Dynamic Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-black to-black"
            />

            {/* 2. Content */}
            <div className="container relative z-10 px-4 md:px-6 text-center pointer-events-none">

                {/* Availability Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300 mb-8 pointer-events-auto hover:bg-white/10 transition-colors"
                >
                    <span className="relative flex h-2 w-2 mr-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for New Projects
                </motion.div>

                {/* Main Title - Physics affected conceptually (Magnetic Text) */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-6 font-space-grotesk mix-blend-screen"
                >
                    Transform Your Vision Into <br />
                    <span
                        className="relative inline-block min-h-[1.2em]"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Typewriter
                            words={["Market Dominance", "Digital Reality", "Global Success", "Revenue Machine"]}
                            typingSpeed={100}
                            deletingSpeed={50}
                            textClassName="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-400 to-indigo-500"
                            cursorClassName="bg-white h-[0.8em] w-[4px] md:w-[6px]"
                        />
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed"
                >
                    In the digital age, <span className="text-white font-semibold">your website is your greatest asset</span>. I engineer premium, high-converting digital experiences that turn visitors into <span className="text-indigo-400">revenue</span> and establish your industry authority.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
                >
                    <Link
                        href="#work"
                        className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white text-black px-10 font-bold transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="mr-2">See Proven Results</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 h-full -translate-x-[200%] skew-x-12 group-hover:animate-shine" />
                    </Link>

                    <Link
                        href="#contact"
                        className="group relative inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105"
                    >
                        Elevate Your Brand
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Gradient Orbs (Fixed background) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

            {/* Socials */}
            <div className="absolute bottom-10 left-10 hidden md:flex flex-col gap-6 z-20 pointer-events-auto">
                <SocialLink href="https://github.com/The-CyberGenius" icon={<Github className="w-5 h-5" />} />
                <SocialLink href="https://x.com/X_shiva2001" icon={<FaXTwitter className="w-5 h-5" />} />
                <SocialLink href="https://www.linkedin.com/in/balkrishan-prajapat-188314192/" icon={<Linkedin className="w-5 h-5" />} />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            </motion.div>

        </section>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 hover:scale-125 hover:rotate-6 backdrop-blur-md"
        >
            {icon}
        </a>
    )
}

function Typewriter({
    words,
    typingSpeed = 150,
    deletingSpeed = 100,
    textClassName = "",
    cursorClassName = "bg-indigo-500"
}: {
    words: string[],
    typingSpeed?: number,
    deletingSpeed?: number,
    textClassName?: string,
    cursorClassName?: string
}) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(typingSpeed);

    // Audio Context for sound generation (No assets needed!)
    const playClickSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = "triangle"; // Gives a nice 'thock' base
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Pitch
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1); // Pitch drop

            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volume
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05); // Quick fade

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.05);
        } catch (e) {
            // Context might prevent autoplay until interaction, ignore error
        }
    };

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % words.length;
        let fullText = words[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);



        setText(updatedText);

        if (isDeleting) {
            setDelta(deletingSpeed);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(2000); // Pause at end of word
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(typingSpeed);
        }
    };

    return (
        <span className="inline-flex items-center">
            <span className={textClassName}>{text}</span>
            <span className={`ml-1 animate-pulse ${cursorClassName}`} />
        </span>
    );
}
