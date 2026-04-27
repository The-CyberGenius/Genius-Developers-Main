"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Briefcase, 
  Code2, 
  Mail, 
  Eye, 
  PlusCircle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({
    projects: 0,
    skills: 0,
    services: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch stats from various APIs
      const [projRes, skillRes, servRes, msgRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/skills"),
        fetch("/api/admin/services"),
        fetch("/api/admin/messages"),
      ]);

      const [projs, skills, servs, msgs] = await Promise.all([
        projRes.json(),
        skillRes.json(),
        servRes.json(),
        msgRes.json(),
      ]);

      setStats({
        projects: projs.length || 0,
        skills: skills.length || 0,
        services: servs.length || 0,
        messages: msgs.length || 0,
        unreadMessages: msgs.filter((m: any) => !m.read).length || 0,
      });
    } catch (error) {
      console.error("Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Projects", value: stats.projects, icon: Briefcase, color: "text-blue-500", href: "/admin/projects" },
    { title: "Active Skills", value: stats.skills, icon: Code2, color: "text-purple-500", href: "/admin/skills" },
    { title: "Services Offered", value: stats.services, icon: Users, color: "text-green-500", href: "/admin/services" },
    { title: "Unread Messages", value: stats.unreadMessages, icon: Mail, color: "text-orange-500", href: "/admin/inbox" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-zinc-500">Welcome back to your portfolio command center.</p>
        </div>
        <Link href="/" target="_blank" className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <ExternalLink className="w-4 h-4" /> View Site
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Link key={i} href={card.href}>
            <Card className="hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : card.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/admin/projects" className="h-24 flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-medium text-sm">
              <PlusCircle className="h-6 w-6" />
              <span>Add Project</span>
            </Link>
            <Link href="/admin/skills" className="h-24 flex flex-col items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm">
              <Code2 className="h-6 w-6" />
              <span>Add Skill</span>
            </Link>
            <Link href="/admin/inbox" className="h-24 flex flex-col items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm">
              <Mail className="h-6 w-6" />
              <span>View Inbox</span>
            </Link>
            <Link href="/admin/profile" className="h-24 flex flex-col items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm">
              <Users className="h-6 w-6" />
              <span>Edit Profile</span>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity Mock/Placeholder */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Status</CardTitle>
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium">System Online</div>
                <div className="text-zinc-500">All services are running smoothly.</div>
              </div>
              <div className="text-zinc-400">Just now</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Vercel Deployment</div>
                <div className="text-zinc-500">Last build was successful.</div>
              </div>
              <div className="text-zinc-400">10m ago</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                <Mail className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Inbox Synced</div>
                <div className="text-zinc-500">Checking for new messages...</div>
              </div>
              <div className="text-zinc-400">2h ago</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
