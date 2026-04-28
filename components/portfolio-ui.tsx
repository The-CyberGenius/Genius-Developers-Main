"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants, useMotionValue, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Send, Loader2, Mail, Sun, Moon, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";

// ── TypeReveal: Char-by-char blur fade (headings) ──────────
function TypeReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.015,  // tight stagger — group feel, not flag
            ease: [0.23, 1, 0.32, 1]
          }}
        >{char}</motion.span>
      ))}
    </span>
  );
}

// ── WordReveal: Word-by-word fade (for paragraphs) ─────────
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <p ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + i * 0.04, ease: [0.23, 1, 0.32, 1] }}
        >{word}</motion.span>
      ))}
    </p>
  );
}
// ── BgTypingText: Background typewriter with highlight loop ──
const BG_TEXT = "geniusdevelopers.space";
function BgTypingText() {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "highlight" | "erasing">("typing");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (displayed.length < BG_TEXT.length) {
        timeout = setTimeout(() => setDisplayed(BG_TEXT.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase("hold"), 1200);
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("highlight"), 400);
    } else if (phase === "highlight") {
      timeout = setTimeout(() => setPhase("erasing"), 1600);
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        timeout = setTimeout(() => setPhase("typing"), 800);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase]);

  const isHighlight = phase === "highlight";
  return (
    <div className="w-full max-w-[90vw] mx-auto text-center">
      <motion.h2
        animate={isHighlight
          ? { opacity: [0.03, 0.12, 0.06, 0.14, 0.03], filter: ["blur(0px)", "blur(2px)", "blur(0px)", "blur(1px)", "blur(0px)"] }
          : { opacity: 0.03, filter: "blur(0px)" }
        }
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="text-[clamp(2.5rem,10vw,20rem)] font-black tracking-tighter select-none uppercase leading-[0.85] break-words"
      >
        {displayed}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          className="inline-block bg-current ml-[0.04em] align-middle"
          style={{ width: "0.06em", height: "0.8em", display: isHighlight ? "none" : "inline-block" }}
        />
      </motion.h2>
    </div>
  );
}

export default function PortfolioUI({ data, skills, services, projects, resume, settings }: {
  data: any; skills: any[]; services: any[]; projects: any[]; resume?: any; settings?: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);


  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Advanced Parallax values (REFINED FOR CLEAN LOOK)
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.98]);
  const heroY = useTransform(smoothProgress, [0, 0.5], ["0%", "-2%"]);

  const titleX = useTransform(smoothProgress, [0, 0.5], ["0%", "-2%"]);
  const subtitleX = useTransform(smoothProgress, [0, 0.5], ["0%", "2%"]);
  const taglineOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  const overlayOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const bgZoom = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect touch/mobile device
    const checkMobile = () => setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const animationStyle = settings?.animationStyle || "apple";

  // Premium Animation Curves
  const premiumEase = [0.23, 1, 0.32, 1] as any;

  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: animationStyle === "apple" ? 40 : 20,
      filter: animationStyle === "apple" ? "blur(12px)" : "none",
      scale: animationStyle === "floating" ? 0.95 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.8, ease: premiumEase }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const funnyHover = animationStyle === "pulse"
    ? { scale: 1.05, boxShadow: "0 0 25px currentColor", filter: "brightness(1.2)" }
    : { scale: 1.05, rotate: [0, -1, 1, 0], transition: { duration: 0.3 } };

  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills = skills.filter(s => s.category === "Backend");

  const playClick = () => {
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
      audio.volume = 0.1;
      audio.play().catch(() => { });
    } catch (e) { }
  };

  const colorScheme = settings?.theme || "apple";

  // Premium Theme Styles (ADAPTIVE DARK/LIGHT FOR ALL SCHEMES)
  const themeClasses = {
    apple: "bg-[#fafafa] dark:bg-[#050505] text-[#1a1a1a] dark:text-[#f5f5f7]",
    midnight: "bg-[#f1f5f9] dark:bg-[#020617] text-[#0f172a] dark:text-[#f1f5f9]",
    neon: "bg-[#fafafa] dark:bg-[#000000] text-[#000000] dark:text-[#00ffcc]",
    forest: "bg-[#f0fdf4] dark:bg-[#06120c] text-[#064e3b] dark:text-[#ecfdf5]",
    ember: "bg-[#fef2f2] dark:bg-[#0f0505] text-[#7f1d1d] dark:text-[#fef2f2]",
    gold: "bg-[#fafaf9] dark:bg-[#0c0a09] text-[#44403c] dark:text-[#f5f5f4]",
  }[colorScheme as string] || "bg-[#fafafa] dark:bg-[#050505] text-[#1a1a1a] dark:text-[#f5f5f7]";

  const accentColor = {
    apple: "bg-[#1a1a1a] dark:bg-[#f5f5f7] text-white dark:text-black",
    midnight: "bg-[#6366f1] text-white",
    neon: "bg-[#00ffcc] text-black",
    forest: "bg-[#10b981] text-white",
    ember: "bg-[#ef4444] text-white",
    gold: "bg-[#d4af37] text-black",
  }[colorScheme as string] || "bg-[#1a1a1a] dark:bg-[#f5f5f7] text-white dark:text-black";

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Message sent! I'll reply soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed. Please try again.");
      }
    } catch { toast.error("Network error."); }
    finally { setFormLoading(false); }
  };

  // ── MOUSE REACTIVE LOGIC (PREMIUM PHYSICS) ──────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const titleXSpring = useSpring(mouseX, { damping: 40, stiffness: 250 });
  const titleYSpring = useSpring(mouseY, { damping: 40, stiffness: 250 });
  const cursorXSpring = useSpring(cursorX, { damping: 20, stiffness: 100 });
  const cursorYSpring = useSpring(cursorY, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 25;
    const y = (clientY - innerHeight / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
    cursorX.set(clientX);
    cursorY.set(clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ── MOBILE: AUTO SIMULATE MOUSE PARALLAX ─────────────
  useEffect(() => {
    if (!isMobile) return;
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.008;
      // Lissajous-style motion — smooth, natural, non-repetitive feel
      mouseX.set(Math.sin(t * 0.9) * 10);
      mouseY.set(Math.cos(t * 0.7) * 8);
      // Move cursor glow around screen center on mobile
      if (typeof window !== 'undefined') {
        cursorX.set(window.innerWidth / 2 + Math.sin(t * 0.5) * window.innerWidth * 0.25);
        cursorY.set(window.innerHeight / 2 + Math.cos(t * 0.4) * window.innerHeight * 0.2);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isMobile, mouseX, mouseY, cursorX, cursorY]);

  // Parallax for Background Layers
  const bgTextY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const linesY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const dotsY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${themeClasses} transition-colors duration-700 overflow-x-hidden selection:bg-zinc-500/30 relative text-base`}
    >

      {/* ── CURSOR GLOW TRAIL (MAGICAL) ──────────────────── */}
      {mounted && (
        <motion.div
          className="fixed pointer-events-none z-[100] w-64 h-64 bg-current/[0.03] blur-[80px] rounded-full"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}

      {/* ── PREMIUM NOISE OVERLAY ────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* ── GLOBAL PREMIUM AMBIENT LAYER (dots + lines) ──── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">

        {/* Glowing gradient blobs (calm, slow) */}
        <motion.div
          animate={{ x: [0, 80, -60, 0], y: [0, -80, 60, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-current/[0.04] blur-[160px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -100, 80, 0], y: [0, 100, -80, 0], scale: [1, 0.8, 1.2, 1] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 -right-32 w-[700px] h-[700px] bg-current/[0.03] blur-[180px] rounded-full"
        />

        {/* Thin glowing diagonal lines — calm scan effect */}
        {[
          { top: "12%", deg: -8, dur: 22, delay: 0 },
          { top: "28%", deg: 6, dur: 30, delay: 4 },
          { top: "45%", deg: -4, dur: 26, delay: 8 },
          { top: "62%", deg: 10, dur: 34, delay: 2 },
          { top: "76%", deg: -6, dur: 20, delay: 12 },
          { top: "90%", deg: 4, dur: 28, delay: 6 },
        ].map((l, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-current opacity-[0.04]"
            style={{
              top: l.top,
              left: "-50%",
              width: "200%",
              rotate: l.deg,
              transformOrigin: "center",
            }}
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: l.delay }}
          />
        ))}

        {/* Glowing dots — scattered, floating, calm */}
        {[
          { x: "8%", y: "15%", size: 3, dur: 6, delay: 0 },
          { x: "22%", y: "8%", size: 2, dur: 8, delay: 1.2 },
          { x: "45%", y: "20%", size: 4, dur: 10, delay: 0.5 },
          { x: "68%", y: "12%", size: 2, dur: 7, delay: 2 },
          { x: "85%", y: "25%", size: 3, dur: 9, delay: 0.8 },
          { x: "92%", y: "50%", size: 2, dur: 11, delay: 3 },
          { x: "78%", y: "70%", size: 4, dur: 8, delay: 1.5 },
          { x: "55%", y: "80%", size: 3, dur: 7, delay: 2.5 },
          { x: "30%", y: "75%", size: 2, dur: 12, delay: 0.3 },
          { x: "12%", y: "60%", size: 4, dur: 9, delay: 1.8 },
          { x: "5%", y: "40%", size: 2, dur: 6, delay: 3.5 },
          { x: "38%", y: "50%", size: 3, dur: 10, delay: 1 },
          { x: "60%", y: "42%", size: 2, dur: 8, delay: 4 },
          { x: "75%", y: "88%", size: 3, dur: 7, delay: 0.7 },
          { x: "18%", y: "88%", size: 2, dur: 11, delay: 2.2 },
          { x: "50%", y: "5%", size: 4, dur: 9, delay: 1.3 },
          { x: "90%", y: "78%", size: 2, dur: 8, delay: 3.2 },
          { x: "42%", y: "95%", size: 3, dur: 10, delay: 0.9 },
          { x: "5%", y: "85%", size: 2, dur: 7, delay: 4.2 },
          { x: "25%", y: "35%", size: 4, dur: 9, delay: 1.1 },
          { x: "65%", y: "55%", size: 2, dur: 8, delay: 2.8 },
          { x: "88%", y: "45%", size: 3, dur: 10, delay: 0.4 },
          { x: "15%", y: "10%", size: 2, dur: 6, delay: 3.7 },
          { x: "48%", y: "65%", size: 3, dur: 8, delay: 1.9 },
          { x: "72%", y: "22%", size: 4, dur: 11, delay: 0.2 },
        ].map((d, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-current"
            style={{ left: d.x, top: d.y, width: d.size, height: d.size }}
            animate={{
              y: [0, -(12 + i % 6 * 4), 0],
              opacity: [0.03, 0.15, 0.03],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: d.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.delay,
            }}
          />
        ))}
      </div>


      {/* ── PROGRESS BAR ────────────────────────────────────── */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 z-[200] origin-left ${accentColor}`}
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── WORLD-CLASS HERO ────────────────────────────── */}
      <div ref={heroRef} className="h-[140vh] relative">

        {/* MAGICAL DEPTH LAYERS (LINES & DOTS) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Layer 2: Floating Magical Lines (SUBTLE SCAN) */}
          <motion.div style={{ y: linesY }} className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] bg-current opacity-[0.03]"
                style={{
                  width: '40%',
                  top: `${30 + i * 15}%`,
                  left: i % 2 === 0 ? '-40%' : '100%',
                }}
                animate={{
                  x: i % 2 === 0 ? ['0%', '350%'] : ['0%', '-350%'],
                }}
                transition={{
                  duration: 20 + i * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>

          {/* Layer 3: Particle Dotted Network (BARELY VISIBLE) */}
          <motion.div style={{ y: dotsY }} className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full bg-current opacity-[0.05]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                  duration: 8 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Layer 4: Background Branding Text — typewriter + highlight */}
          <motion.div
            style={{ y: bgTextY, opacity: heroOpacity }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-12"
          >
            <BgTypingText />
          </motion.div>
        </div>

        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">

          <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="max-w-[1500px] mx-auto w-full relative z-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6 flex items-center gap-6">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30"> Portfolio — {new Date().getFullYear()}</span>
              <div className="h-[1px] w-8 bg-current opacity-10" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30 italic serif">{data?.location || "Global"}</span>
            </motion.div>

            <div className="relative mb-8 perspective-[1000px]">
              <motion.h1
                style={{
                  x: titleXSpring,
                  y: titleYSpring,
                  rotateX: useTransform(titleYSpring, [-20, 20], [5, -5]),
                  rotateY: useTransform(titleXSpring, [-20, 20], [-5, 5]),
                  fontSize: `clamp(3rem, 10vw, ${data?.heroFontSize || 12}rem)`
                }}
                className="font-black tracking-tighter leading-[0.75] flex flex-col select-none"
              >
                <div className="flex overflow-visible h-[1.1em]">
                  {(data?.name?.split(" ")[0] || "Shiva").split("").map((char: string, i: number) => (
                    <motion.span
                      key={i}
                      className="inline-block cursor-default"
                      {...(isMobile ? {
                        animate: {
                          y: [0, -30, 0],
                          scale: [1, 1.3, 1],
                        },
                        transition: {
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.12,
                          repeatDelay: 6.2,  // ~8s full cycle per letter
                        }
                      } : {
                        whileHover: {
                          y: -40,
                          scale: 1.4,
                          rotate: Math.random() * 20 - 10,
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        },
                        initial: { y: 0 },
                        animate: { y: 0 }
                      })}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                {data?.name?.split(" ").slice(1).map((part: string, i: number) => (
                  <div key={i} className="flex overflow-visible h-[0.9em] opacity-10 italic serif font-light ml-[0.1em]">
                    {part.split("").map((char: string, j: number) => (
                      <motion.span
                        key={j}
                        className="inline-block cursor-default"
                        {...(isMobile ? {
                          animate: {
                            y: [0, 15, 0],
                            scale: [1, 1.15, 1],
                          },
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: j * 0.1 + 0.5,
                            repeatDelay: 6.2,  // ~8s full cycle
                          }
                        } : {
                          whileHover: {
                            y: 20,
                            scale: 1.2,
                            rotate: Math.random() * 10 - 5,
                            transition: { type: "spring", stiffness: 400, damping: 10 }
                          }
                        })}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </motion.h1>
            </div>

            <motion.div style={{ opacity: taglineOpacity }} className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-7xl">
              <div className="space-y-4">
                <WordReveal
                  text={data?.tagline || "I transform complex logic into elegant digital experiences."}
                  className="text-xl md:text-[clamp(1.5rem,3vw,3rem)] font-medium tracking-tight max-w-3xl leading-[1.1] opacity-90"
                />
                <WordReveal
                  text={data?.aboutText?.slice(0, 150) || "Solving logic with humanity through world-class functional software design."}
                  className="text-xs md:text-sm opacity-40 max-w-lg font-medium leading-relaxed"
                  delay={0.5}
                />
              </div>

              <div className="flex gap-6 pb-2">
                <motion.a
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#work"
                  className={`group relative px-12 py-6 rounded-full ${accentColor} font-black uppercase text-[11px] tracking-[0.2em] transition-all overflow-hidden shadow-2xl shadow-current/10`}
                >
                  <span className="relative z-10">Explore Work</span>
                  <motion.div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.a>
                {resume?.fileUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group px-12 py-6 rounded-full border border-current/10 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-current/5 transition-all flex items-center gap-3"
                  >
                    CV <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── PRETEXT SHOWCASE (HUMBLE INNOVATION) ──────────────── */}
      <section id="philosophy" className="relative h-[120vh] bg-black text-white z-20">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 text-center px-6"
          >
            <motion.p variants={fadeInUp} className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-10">Coding Philosophy</motion.p>
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black tracking-tighter leading-none italic">
              <TypeReveal text="Simply " />
              <TypeReveal text="Better " delay={0.12} />
              <TypeReveal text="Code." delay={0.24} />
            </h2>
            <motion.div variants={fadeInUp} className="mt-12 opacity-40 text-sm font-medium tracking-widest uppercase">
              <TypeReveal text="Connecting Logic with Humanity" delay={0.5} />
            </motion.div>
          </motion.div>

          {/* Background Magical Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" as const }}
              className="text-[45vh] font-black uppercase leading-none text-white whitespace-nowrap"
            >
              HUMBLE • PROGRAMMER • CODER • HUMBLE • PROGRAMMER • CODER •
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECH STRIP (DYNAMIC) ───────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-30 py-12 md:py-24 border-y border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex flex-wrap justify-center gap-8 md:gap-16 transition-opacity duration-700 ${isMobile ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>
            {["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "MongoDB", "AI"].map((tech, i) => (
              <motion.span
                key={tech}
                variants={fadeInUp}
                {...(isMobile ? {
                  animate: { y: [0, -4, 0] },
                  transition: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                } : {})}
                className="text-sm md:text-2xl font-black uppercase tracking-[0.3em]"
              >{tech}</motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── ABOUT (BREATHABLE REVEAL) ────────────────────────── */}
      <section
        id="about"
        className="scroll-mt-20 py-16 md:py-32 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative z-30"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 md:gap-24"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">My Purpose</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10 italic serif">
              <TypeReveal text="Solving" /><br />
              <TypeReveal text="Logic." delay={0.2} />
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <WordReveal
              text={data?.aboutText || "I am a programmer who believes in the power of simple, effective code. My goal is to build digital tools that actually help people."}
              className="text-2xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-12 opacity-80"
            />
            <motion.div variants={staggerContainer} className="flex gap-8">
              {data?.email && (
                <motion.a whileHover={funnyHover} variants={fadeInUp} href="#contact" className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-all">Reach Out</motion.a>
              )}
              {data?.whatsapp && (
                <motion.a whileHover={funnyHover} variants={fadeInUp} href={data.whatsapp} target="_blank" rel="noreferrer" className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-all">Direct Message</motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROJECTS (BREATHABLE LIST) ────────────────────────── */}
      <section
        id="work"
        className="scroll-mt-20 py-16 md:py-32 px-6 md:px-12 bg-white dark:bg-black overflow-hidden relative z-30"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-[1400px] mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-24">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Recent Work</p>
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.75] uppercase">
              <TypeReveal text="Projects." />
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {(projects.length > 0 ? projects : [
              { title: "Elegant Logic", description: "Minimalist solution for maximum impact.", tags: ["Core", "Architecture"] }
            ]).map((p: any, i: number) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={!isMobile ? { y: -10 } : {}}
                {...(isMobile ? {
                  animate: { y: [0, -4, 0] },
                  transition: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
                } : {})}
                onClick={() => { playClick(); setSelectedProject(p); }}
                className="group relative flex flex-col justify-between p-6 md:p-10 rounded-[2rem] bg-zinc-50 dark:bg-zinc-950 border border-current/5 overflow-hidden transition-all duration-500 min-h-[300px] md:min-h-[400px] cursor-pointer"
              >
                {/* Big number — always visible on mobile */}
                <div className={`absolute top-0 right-0 p-10 transition-opacity ${isMobile ? 'opacity-10' : 'opacity-0 group-hover:opacity-20'}`}>
                  <span className="text-[12rem] font-black tracking-tighter leading-none select-none">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap gap-3">
                    {(p.tags || []).slice(0, 2).map((t: string) => (
                      <span key={t} className="px-5 py-2 rounded-full bg-current/5 text-[9px] font-black uppercase tracking-widest opacity-60">{t}</span>
                    ))}
                  </div>
                  {/* Title — italic always on mobile */}
                  <h3 className={`text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase transition-all duration-500 ${isMobile ? 'italic' : 'group-hover:italic'}`}>
                    <TypeReveal text={p.title} />
                  </h3>
                </div>

                <div className="relative z-10 space-y-8 mt-12">
                  {/* Description — always visible on mobile */}
                  <WordReveal
                    text={p.description}
                    className={`text-lg md:text-xl font-medium leading-relaxed line-clamp-3 transition-opacity ${isMobile ? 'opacity-60' : 'opacity-40 group-hover:opacity-70'}`}
                  />
                  {/* Quick View — always visible on mobile */}
                  <div className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${isMobile ? 'opacity-70 translate-y-0' : 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'}`}>
                    Quick View <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Glow — always on mobile */}
                <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-current/5 blur-[100px] rounded-full transition-opacity duration-1000 ${isMobile ? 'opacity-60' : 'opacity-0 group-hover:opacity-100'}`} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SKILLS & SERVICES (DYNAMIC) ─────────────────── */}
      <section
        id="skills"
        className="scroll-mt-20 py-16 md:py-32 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950 relative z-30"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-32"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12">
              <TypeReveal text="Core Technologies" />
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              {[...frontendSkills, ...backendSkills].map((s: any, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={!isMobile ? { scale: 1.05, rotate: [-1, 1, 0] } : {}}
                  {...(isMobile ? {
                    animate: {
                      y: [0, i % 2 === 0 ? -6 : -4, 0],
                      scale: [1, 1.03, 1],
                    },
                    transition: {
                      duration: 2 + (i % 4) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }
                  } : {})}
                  className="px-8 py-5 md:px-12 md:py-8 rounded-full border border-current/10 bg-current/5 group hover:bg-foreground hover:text-background transition-all cursor-default"
                >
                  <span className="text-xl md:text-3xl font-black uppercase tracking-tighter">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className={`p-6 md:p-12 rounded-[2rem] ${accentColor} flex flex-col justify-between shadow-2xl shadow-black/10`}
          >
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-16">
                <TypeReveal text="Services" />
              </h3>
              <div className="space-y-12">
                {services.slice(0, 4).map((s: any, i: number) => (
                  <motion.div variants={fadeInUp} key={i}>
                    <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-2">
                      <TypeReveal text={s.title} />
                    </p>
                    <WordReveal text={s.description} className="text-sm md:text-base opacity-60 max-w-sm leading-relaxed" />
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.a whileHover={{ gap: "32px" }} href="#contact" className="mt-20 inline-flex items-center gap-4 font-black uppercase text-[11px] tracking-widest border-b-2 border-current pb-3 transition-all">Get Started <ArrowRight className="w-5 h-5" /></motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CONTACT (INTERNATIONAL PREMIUM) ───────────────────── */}
      <section id="contact" className={`scroll-mt-20 py-16 md:py-32 px-6 md:px-12 relative z-30 ${colorScheme === 'neon' ? 'bg-[#00ffcc] dark:bg-black text-black dark:text-[#00ffcc]' : 'bg-white dark:bg-[#050505] text-[#1a1a1a] dark:text-[#f5f5f7]'}`}>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 md:gap-32">

          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.6em] opacity-30 mb-8 md:mb-12">Connect</p>
              <h2 className="text-7xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.75] mb-8">
                <TypeReveal text="Start" /><br />
                <TypeReveal text="Today" delay={0.15} /><span className="opacity-10 italic serif">.</span>
              </h2>
              <p className="text-sm md:text-lg opacity-40 font-medium tracking-tight mb-16">Available for freelance work worldwide.</p>
            </div>

            <div className="grid gap-4 md:gap-6">
              {data?.whatsapp && (
                <motion.a
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  href={data.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-6 p-5 md:p-7 rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-current/5 group transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-current/10 flex items-center justify-center group-hover:bg-current text-current group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                    <FaWhatsapp className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:italic transition-all">Direct Message</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">WhatsApp Support</span>
                  </div>
                </motion.a>
              )}
              {data?.email && (
                <motion.a
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-6 p-5 md:p-7 rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-current/5 group transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-current/10 flex items-center justify-center group-hover:bg-current text-current group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:italic transition-all">Send Email</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Expert Inquiry</span>
                  </div>
                </motion.a>
              )}
            </div>

            <div className="flex gap-10 pt-8 border-t border-current/5">
              {[
                { icon: <FaGithub />, link: data?.socialLinks?.github },
                { icon: <FaLinkedin />, link: data?.socialLinks?.linkedin },
                { icon: <FaTwitter />, link: data?.socialLinks?.twitter },
                { icon: <FaInstagram />, link: data?.socialLinks?.instagram }
              ].filter(s => s.link).map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  {...(isMobile ? {
                    animate: { y: [0, -5, 0], opacity: [0.6, 1, 0.6] },
                    transition: { duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }
                  } : {})}
                  className={`text-2xl md:text-3xl hover:-translate-y-2 transition-transform ${isMobile ? 'opacity-70' : 'opacity-30 hover:opacity-100'}`}
                >{s.icon}</motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className={`backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-current/10 bg-zinc-50/50 dark:bg-zinc-900/20 shadow-2xl shadow-black/5`}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 space-y-10">
                  <div className="w-32 h-32 rounded-full bg-current/10 flex items-center justify-center mx-auto">
                    <Send className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                      <TypeReveal text="Message Sent." />
                    </h3>
                    <p className="text-lg md:text-xl opacity-40 max-w-sm mx-auto">I'll get back to you within 24 hours.</p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-opacity">Send another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 group-focus-within:opacity-100 transition-opacity">Identification</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-current/10 py-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-current transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700" placeholder="Full Name" />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 group-focus-within:opacity-100 transition-opacity">Communication</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-current/10 py-6 text-xl md:text-4xl font-medium focus:outline-none focus:border-current transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700" placeholder="Email Address" />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 group-focus-within:opacity-100 transition-opacity">The Brief</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-current/10 py-6 text-xl md:text-4xl font-medium focus:outline-none focus:border-current transition-all resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700" placeholder="Your Project Details..." />
                  </div>
                  <button type="submit" disabled={formLoading} className={`w-full py-8 md:py-12 rounded-[2rem] md:rounded-[3rem] ${accentColor} font-black text-xl md:text-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-6 uppercase tracking-[0.2em] shadow-2xl shadow-current/10`}>
                    {formLoading ? <Loader2 className="animate-spin" /> : <><Send className="w-8 h-8" />Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER (CLEAN) ───────────────────────────────── */}
      <footer className="py-12 md:py-20 px-6 md:px-12 border-t border-zinc-100 dark:border-zinc-900 opacity-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-widest">
          <p>© {new Date().getFullYear()} — {(data?.name || "SHIVA").toUpperCase()}</p>
          <div className="flex gap-8">
            {['work', 'skills', 'contact'].map(i => <a key={i} href={`#${i}`} className="hover:underline">{i}</a>)}
          </div>
        </div>
      </footer>

      {/* ── PREMIUM THEME TOGGLE ──────────────────────────── */}
      {mounted && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playClick();
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
          className="fixed top-8 right-8 z-[200] w-14 h-14 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-xl shadow-black/10 dark:shadow-white/5 group overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            {resolvedTheme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-6 h-6 text-zinc-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* ── FLOATING RESUME BUTTON ────────────────────────── */}
      {resume?.url && (
        <motion.a
          href={resume.url}
          target="_blank"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playClick}
          className="fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-black/20"
        >
          <Download className="w-4 h-4" />
          <span className="hidden md:inline">Download Resume</span>
        </motion.a>
      )}

      {/* ── PROJECT QUICK VIEW MODAL ──────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              layoutId={`project-${selectedProject.title}`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl bg-white dark:bg-zinc-950 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[60vh] border border-white/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-10 p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex flex-wrap gap-3 mb-8">
                  {(selectedProject.tags || []).map((t: string) => (
                    <span key={t} className="px-4 py-2 rounded-full bg-current/5 text-[9px] font-black uppercase tracking-widest opacity-60 border border-current/10">{t}</span>
                  ))}
                </div>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8] mb-12 italic serif">{selectedProject.title}</h3>
                <p className="text-xl md:text-2xl opacity-60 leading-relaxed font-medium mb-12">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-6">
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-5 rounded-full bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-transform shadow-xl shadow-black/10">
                      Live Preview <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-5 rounded-full border-2 border-current/20 font-black uppercase text-[11px] tracking-widest hover:bg-current/5 transition-all">
                      Source Code <FaGithub className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden group">
                {/* Placeholder for project image / interaction */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
                  <span className="text-[15rem] font-black tracking-tighter uppercase rotate-90">{selectedProject.title.slice(0, 2)}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full aspect-video rounded-2xl bg-white dark:bg-black shadow-2xl border border-white/5 flex items-center justify-center">
                    <p className="text-sm font-black uppercase tracking-[0.4em] opacity-20 italic">Visual Showcase Pending</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
