"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Save, Palette, Type, Eye, ToggleLeft, ToggleRight, Zap, Layout, Sun, Layers, Sparkles } from "lucide-react";

const FONT_OPTIONS = [
  { label: "Inter (Default)", value: "Inter" },
  { label: "Poppins (Modern)", value: "Poppins" },
  { label: "Roboto (Clean)", value: "Roboto" },
  { label: "Space Grotesk (Tech)", value: "Space Grotesk" },
  { label: "Playfair Display (Elegant)", value: "Playfair Display" },
  { label: "JetBrains Mono (Code)", value: "JetBrains Mono" },
];

const THEME_PRESETS = [
  { label: "Apple (B&W)", value: "apple", bg: "#000000", accent: "#ffffff" },
  { label: "Cyberpunk", value: "neon", bg: "#000000", accent: "#00ffcc" },
  { label: "Midnight", value: "midnight", bg: "#0a0e1a", accent: "#6366f1" },
  { label: "Ember", value: "ember", bg: "#1a0a0a", accent: "#ef4444" },
  { label: "Forest", value: "forest", bg: "#0a1a0e", accent: "#22c55e" },
  { label: "Gold", value: "gold", bg: "#0a0a00", accent: "#f59e0b" },
];

const ANIMATION_OPTIONS = [
  { label: "Apple Cinematic", value: "apple", desc: "Smooth parallax and blurring reveals", icon: Zap },
  { label: "Minimalist Fade", value: "fade", desc: "Pure opacity-based clean transitions", icon: Layout },
  { label: "Neon Pulse", value: "pulse", desc: "Glowing effects and vibrant transitions", icon: Sun },
  { label: "Stack Cards", value: "stack", desc: "Layered card stacking scroll effect", icon: Layers },
  { label: "Floating 3D", value: "floating", desc: "Ethereal floating elements with depth", icon: Sparkles },
];

export default function ThemePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    theme: "apple",
    primaryColor: "#000000",
    accentColor: "#6366f1",
    fontFamily: "Inter",
    maintenanceMode: false,
    hideServices: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data);
    } catch {
      toast.error("Failed to load theme settings");
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (preset: typeof THEME_PRESETS[0]) => {
    setSettings((prev: any) => ({
      ...prev,
      theme: preset.value,
      primaryColor: preset.bg,
      accentColor: preset.accent,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success("Theme settings saved! Redeploy Vercel to apply CSS vars.");
      } else {
        toast.error("Failed to save settings");
      }
    } catch {
      toast.error("Error saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  const selectedPreset = THEME_PRESETS.find(p => p.value === settings.theme) || THEME_PRESETS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Palette className="w-8 h-8" /> Theme & Appearance
        </h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          Save Settings
        </Button>
      </div>

      {/* Live Preview Bar */}
      <div
        className="rounded-2xl p-6 flex items-center gap-4 border"
        style={{ backgroundColor: settings.primaryColor || "#000", borderColor: settings.accentColor + "40" }}
      >
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: settings.accentColor }}>Live Preview</p>
          <h2 className="text-2xl font-bold" style={{ color: "#fff", fontFamily: settings.fontFamily }}>
            Balkrishan Prajapat (Shiva)
          </h2>
          <p style={{ color: settings.accentColor, fontFamily: settings.fontFamily }}>Full-Stack Developer & AI Engineer</p>
        </div>
        <div className="w-12 h-12 rounded-full" style={{ backgroundColor: settings.accentColor }}></div>
      </div>

      <div className="grid gap-8">
        {/* Theme Presets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Eye className="w-4 h-4" /> Theme Presets</CardTitle>
            <CardDescription>Choose a design theme or pick custom colors below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePreset(preset)}
                  className={`p-4 rounded-xl text-left border-2 transition-all ${
                    settings.theme === preset.value
                      ? "border-zinc-900 dark:border-white shadow-lg scale-[1.02]"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                  style={{ backgroundColor: preset.bg }}
                >
                  <div className="w-full h-8 rounded-lg mb-3" style={{ backgroundColor: preset.accent }} />
                  <p className="text-white text-sm font-medium truncate">{preset.label}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Colors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette className="w-4 h-4" /> Custom Colors</CardTitle>
            <CardDescription>Fine-tune exact colors for full customization.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Background / Primary Color</Label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={settings.primaryColor || "#000000"}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value, theme: "custom" })}
                  className="w-12 h-12 rounded-lg cursor-pointer border border-zinc-200"
                />
                <Input
                  value={settings.primaryColor || "#000000"}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value, theme: "custom" })}
                  className="font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Accent / Highlight Color</Label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={settings.accentColor || "#6366f1"}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value, theme: "custom" })}
                  className="w-12 h-12 rounded-lg cursor-pointer border border-zinc-200"
                />
                <Input
                  value={settings.accentColor || "#6366f1"}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value, theme: "custom" })}
                  className="font-mono"
                  placeholder="#6366f1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Font Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Type className="w-4 h-4" /> Typography</CardTitle>
            <CardDescription>Choose the font style for your entire portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setSettings({ ...settings, fontFamily: font.value })}
                  className={`p-4 rounded-xl text-left border-2 transition-all ${
                    settings.fontFamily === font.value
                      ? "border-zinc-900 dark:border-white shadow-lg"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  <p className="text-2xl font-semibold mb-1" style={{ fontFamily: font.value }}>Aa</p>
                  <p className="text-sm text-zinc-500">{font.label}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Animation & Experience Styles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Experience Styles</CardTitle>
            <CardDescription>Select the high-end animation engine for your portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ANIMATION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSettings({ ...settings, animationStyle: opt.value })}
                    className={`p-6 rounded-2xl text-left border-2 transition-all flex flex-col gap-3 group ${
                      settings.animationStyle === opt.value
                        ? "border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800 shadow-xl"
                        : "border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className={`p-3 rounded-xl w-fit ${settings.animationStyle === opt.value ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">{opt.label}</p>
                      <p className="text-xs text-zinc-500 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Visibility Toggles */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Visibility</CardTitle>
            <CardDescription>Show or hide sections on your public portfolio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "hideServices", label: "Hide Services Section", desc: "Toggle off to show Services on your portfolio" },
              { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show 'Coming Soon' to visitors while you work" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-xl">
                <div>
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-zinc-500">{desc}</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, [key]: !settings[key] })}
                  className={`p-1 rounded-full transition-colors ${settings[key] ? "text-green-500" : "text-zinc-400"}`}
                >
                  {settings[key]
                    ? <ToggleRight className="w-10 h-10" />
                    : <ToggleLeft className="w-10 h-10" />
                  }
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
