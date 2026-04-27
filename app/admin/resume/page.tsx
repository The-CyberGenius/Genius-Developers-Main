"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, FileText, Download, ExternalLink } from "lucide-react";

export default function ResumePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await fetch("/api/admin/resume");
      const data = await res.json();
      setResume(data);
    } catch (error) {
      toast.error("Failed to load resume info");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      if (res.ok) {
        toast.success("Resume info updated");
      } else {
        toast.error("Failed to update resume");
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
          <FileText className="w-8 h-8" /> Resume Management
        </h1>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          Save Resume Info
        </Button>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Resume Source</CardTitle>
            <CardDescription>Upload your resume to a service like Google Drive or Dropbox and paste the direct link here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fileUrl">Resume File URL (PDF)</Label>
              <Input
                id="fileUrl"
                value={resume.fileUrl}
                onChange={(e) => setResume({ ...resume, fileUrl: e.target.value })}
                placeholder="https://drive.google.com/..."
              />
              <p className="text-xs text-zinc-500 italic">Tip: Use a direct download link if possible.</p>
            </div>

            {resume.fileUrl && (
              <div className="pt-4 flex gap-4">
              <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium">
                    <ExternalLink className="w-4 h-4" /> Preview Resume
                  </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg h-fit">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300">Resume Link Usage</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  This link will be used for the "Download Resume" button on your public website. 
                  Make sure the permissions are set to "Anyone with the link can view".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
