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
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  // If we are on the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      // Create an API route for logout to clear the cookie, or just clear it on the client
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
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-xl font-bold tracking-tight">Genius CMS</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 transition-colors"
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
             <Link href="/" target="_blank" className="text-sm font-medium hover:underline">
               View Live Site
             </Link>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
