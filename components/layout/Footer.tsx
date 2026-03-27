"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig, socialLinks } from "@/lib/data";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-glass-base border-t border-white/5 py-12">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <Link href="/" className="flex items-center space-x-3 group mb-4 md:mb-0">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-orange-400/50 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 flex-shrink-0">
                            <Image src="/me.jpg" alt="Shiva" width={48} height={48} className="object-cover w-full h-full" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-300 transition-colors">
                            Shiva
                        </span>
                    </Link>

                    <div className="flex space-x-6">
                        <SocialLink href={socialLinks.twitter} icon={<FaXTwitter className="w-5 h-5" />} />
                        <SocialLink href={socialLinks.linkedin} icon={<Linkedin className="w-5 h-5" />} />
                        <SocialLink href={socialLinks.github} icon={<Github className="w-5 h-5" />} />
                        <SocialLink href={socialLinks.instagram} icon={<Instagram className="w-5 h-5" />} />
                        <SocialLink href={socialLinks.youtube} icon={<Youtube className="w-5 h-5" />} />
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {currentYear} GeniusDev. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200"
        >
            {icon}
        </Link>
    )
}
