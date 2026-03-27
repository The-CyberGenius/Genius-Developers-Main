"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function WhatsAppFloat() {
    const waLink = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

    return (
        <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 group"
        >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-50 group-hover:opacity-0 transition-opacity" />

            <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-shadow group-hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)]"
            >
                <MessageCircle className="w-7 h-7 text-white fill-white" />
            </motion.div>

            {/* Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1e1916] text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shadow-lg border border-white/5">
                Chat on WhatsApp
            </span>
        </Link>
    );
}
