"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Image as ImageIcon, Copy, Link, Trash2, Info } from "lucide-react";

const SCREENSHOT_SERVICES = [
  { name: "Vercel OG", url: "https://og-image.vercel.app/", desc: "Generate OG preview images" },
  { name: "Screenshotone", url: "https://screenshotone.com/", desc: "Capture website screenshots" },
  { name: "URLbox", url: "https://urlbox.io/", desc: "Automate website screenshots" },
];

export default function MediaPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [savedImages, setSavedImages] = useState<string[]>([]);

  const handleAdd = () => {
    if (!imageUrl.trim()) return;
    if (!imageUrl.startsWith("http")) {
      toast.error("Please enter a valid URL starting with http or https");
      return;
    }
    setSavedImages(prev => [imageUrl, ...prev]);
    setImageUrl("");
    toast.success("Image URL saved to session");
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  };

  const handleDelete = (url: string) => {
    setSavedImages(prev => prev.filter(u => u !== url));
    toast.success("Removed from list");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <ImageIcon className="w-8 h-8" /> Media Manager
        </h1>
        <p className="text-zinc-500 mt-2">Manage image URLs for your projects, profile, and OG images.</p>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30">
        <CardContent className="pt-6 flex gap-4">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-blue-900 dark:text-blue-300">How to use image URLs</p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Upload your images to <strong>Cloudinary</strong>, <strong>ImgBB</strong>, or <strong>Imgur</strong> (all free), 
              then paste the direct URL here and copy it into your Project or Profile image fields.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* URL Manager */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Link className="w-4 h-4" /> Image URL Manager</CardTitle>
          <CardDescription>Paste, save, and copy image URLs for use across your portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://i.imgur.com/your-image.jpg"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Button onClick={handleAdd} className="shrink-0">Add URL</Button>
          </div>

          {savedImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {savedImages.map((url, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border rounded-xl">
                  {/* Preview */}
                  <div className="w-20 h-14 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    <img src={url} alt="" className="w-full h-full object-cover" onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/80x56?text=Error";
                    }} />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate flex-1 font-mono">{url}</p>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(url)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(url)} className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 border border-dashed rounded-xl text-center text-zinc-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No URLs saved yet. Paste an image URL above to preview it.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Free Image Hosting */}
      <Card>
        <CardHeader>
          <CardTitle>Free Image Hosting Services</CardTitle>
          <CardDescription>Use these services to host your project screenshots and thumbnails for free.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "ImgBB", url: "https://imgbb.com", desc: "Simple free image hosting. Upload → Get link. Best for portfolio images.", emoji: "🖼️" },
              { name: "Cloudinary", url: "https://cloudinary.com", desc: "Professional media management. Free tier includes 25GB storage.", emoji: "☁️" },
              { name: "Imgur", url: "https://imgur.com", desc: "Easy drag-and-drop upload. Best for quick sharing.", emoji: "📸" },
            ].map((svc) => (
              <a
                key={svc.name}
                href={svc.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl border hover:border-zinc-400 transition-colors block"
              >
                <div className="text-2xl mb-2">{svc.emoji}</div>
                <h3 className="font-bold">{svc.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{svc.desc}</p>
                <p className="text-xs text-blue-500 mt-2">Visit →</p>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
