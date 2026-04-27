"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, Search, Globe } from "lucide-react";

export default function SeoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seo, setSeo] = useState<any>(null);

  useEffect(() => {
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    try {
      const res = await fetch("/api/admin/seo");
      const data = await res.json();
      setSeo(data);
    } catch (error) {
      toast.error("Failed to load SEO settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seo),
      });

      if (res.ok) {
        toast.success("SEO settings updated");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Search className="w-8 h-8" /> SEO & Meta
        </h1>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          Save SEO Settings
        </Button>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Global Search Appearance</CardTitle>
            <CardDescription>Control how your portfolio appears in search engines like Google.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                value={seo.siteTitle}
                onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                placeholder="e.g. Shiva | Premium Portfolio"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={seo.metaDescription}
                onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                rows={4}
                placeholder="A short summary of your site (150-160 characters is best for SEO)."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={seo.keywords}
                onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                placeholder="portfolio, developer, ai, full stack (comma separated)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image (Social Sharing)</Label>
              <Input
                id="ogImage"
                value={seo.ogImage}
                onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                placeholder="https://..."
              />
              <p className="text-xs text-zinc-500">The image shown when you share your link on Twitter, LinkedIn, etc.</p>
            </div>
          </CardContent>
        </Card>

        {/* Google Preview Simulation */}
        <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4 text-zinc-400" /> Google Search Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-xl font-medium truncate">
                {seo.siteTitle || "Site Title Goes Here"}
              </div>
              <div className="text-[#006621] dark:text-[#34a853] text-sm truncate">
                https://yourdomain.com
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">
                {seo.metaDescription || "Please provide a meta description to see how it looks in search results."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
