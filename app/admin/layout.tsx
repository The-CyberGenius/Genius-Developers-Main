"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCircle, 
  Code2, 
  Briefcase, 
  FolderGit2, 
  Palette, 
  FileText, 
  Bot, 
  Search, 
  Inbox, 
  Image as ImageIcon, 
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: UserCircle },
  { name: "Skills", href: "/admin/skills", icon: Code2 },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Theme", href: "/admin/theme", icon: Palette },
  { name: "Resume", href: "/admin/resume", icon: FileText },
  { name: "AI Features", href: "/admin/ai", icon: Bot },
  { name: "SEO", href: "/admin/seo", icon: Search },
  { name: "Inbox", href: "/admin/inbox", icon: Inbox },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // If we are on the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      document.cookie = "admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.success("Logged out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-50 dark:bg-[#0a0a0a] border-r border-zinc-200/50 dark:border-zinc-800/50 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6">
          <span className="text-lg font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5"/> Genius CMS
          </span>
        </div>
        <div className="px-4 py-2">
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Management</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700"
                    : "text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-black dark:text-white" : "text-zinc-400")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <div className="md:hidden">
            <span className="text-xl font-bold">Genius CMS</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/" target="_blank" className="text-sm font-medium hover:underline opacity-60 hover:opacity-100 transition-opacity">
              View Live Site
            </Link>
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-600" />
                )}
              </button>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
