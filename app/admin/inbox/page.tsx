"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Mail, MailOpen, Trash2, Clock, User } from "lucide-react";
import { format } from "date-fns";

export default function InboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });
      if (res.ok) {
        setMessages(messages.map(m => m._id === id ? { ...m, read: !currentRead } : m));
      }
    } catch (error) {
      toast.error("Failed to update message status");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id));
        toast.success("Message deleted");
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Mail className="w-8 h-8" /> Inbox
        </h1>
        <div className="text-sm text-zinc-500">
          {messages.filter(m => !m.read).length} unread messages
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-zinc-500">
              No messages yet.
            </CardContent>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg._id} className={msg.read ? "opacity-75" : "border-l-4 border-l-blue-500"}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
                      <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                        <User className="w-4 h-4" /> {msg.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> {msg.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                      </div>
                    </div>
                    <div className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap text-lg">
                      {msg.message}
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleRead(msg._id, msg.read)}
                      className="flex items-center gap-2"
                    >
                      {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                      {msg.read ? "Mark as Unread" : "Mark as Read"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteMessage(msg._id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
