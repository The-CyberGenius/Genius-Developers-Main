"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-4 w-full z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
            <nav className="w-full max-w-7xl clay-panel px-4 transition-all duration-300">
                <div className="w-full">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="p-2 rounded-xl bg-[#232333] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.05),inset_-2px_-2px_6px_rgba(0,0,0,0.5)] group-hover:shadow-[inset_2px_2px_5px_rgba(255,255,255,0.1),inset_-2px_-2px_6px_rgba(0,0,0,0.6)] transition-all">
                                <Code2 className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white drop-shadow-md">
                                Shiva
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-white clay-btn px-4 py-2 text-sm font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <Link
                                href="#contact"
                                className="clay-btn clay-btn-primary text-white px-6 py-2.5 text-sm font-bold flex items-center justify-center"
                            >
                                Hire Me
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 clay-btn focus:outline-none"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4">
                                    <Link
                                        href="#contact"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-full text-base font-medium transition-colors shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                                    >
                                        Hire Me
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
