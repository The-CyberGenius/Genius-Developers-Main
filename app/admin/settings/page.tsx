"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Bell, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="w-8 h-8" /> System Settings
        </h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-zinc-400" /> Security
            </CardTitle>
            <CardDescription>Manage your administrative access and security protocols.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Admin Password</p>
                <p className="text-sm text-zinc-500">To change your password, please update the ADMIN_PASSWORD environment variable in your deployment dashboard.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-zinc-400" /> Database Status
            </CardTitle>
            <CardDescription>Check the status of your MongoDB connection.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex h-3 w-3 rounded-full bg-green-500"></div>
              <p className="font-medium">Connected to MongoDB Atlas</p>
              <p className="text-zinc-500 ml-auto">Region: Global</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-zinc-400" /> Notifications
            </CardTitle>
            <CardDescription>Control how you receive alerts from your portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500 italic">Email notification features are coming soon in the next update.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
