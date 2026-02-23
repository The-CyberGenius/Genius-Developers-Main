"use client";

import Link from "next/link";
import { Code2, Github, Linkedin, Instagram, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/10 py-12">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <Link href="/" className="flex items-center space-x-2 group mb-4 md:mb-0">
                        <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                            <Code2 className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">
                            Shiva
                        </span>
                    </Link>

                    <div className="flex space-x-6">
                        <SocialLink href="https://x.com/X_shiva2001" icon={<FaXTwitter className="w-5 h-5" />} />
                        <SocialLink href="https://www.linkedin.com/in/balkrishan-prajapat-188314192/" icon={<Linkedin className="w-5 h-5" />} />
                        <SocialLink href="https://github.com/The-CyberGenius" icon={<Github className="w-5 h-5" />} />
                        <SocialLink href="https://www.instagram.com/i.shiva_01/" icon={<Instagram className="w-5 h-5" />} />
                        <SocialLink href="https://www.youtube.com/@shiva2099" icon={<Youtube className="w-5 h-5" />} />
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {currentYear} GeniusDev. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
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
