"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function ProfileManager() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfile({
        ...profile,
        [parent]: {
          ...profile[parent],
          [child]: value,
        },
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Manager</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Manage your personal information, tagline, and contact details.
        </p>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>This is how you are presented on the website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" name="name" value={profile?.name || ""} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Dynamic Tagline (Headline)</Label>
                  <Input id="tagline" name="tagline" value={profile?.tagline || ""} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutText">About Text / Personal Intro</Label>
                <Textarea 
                  id="aboutText" 
                  name="aboutText" 
                  rows={4} 
                  value={profile?.aboutText || ""} 
                  onChange={handleChange} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact & Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Public Email</Label>
                  <Input id="email" name="email" type="email" value={profile?.email || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone / WhatsApp</Label>
                  <Input id="phone" name="phone" value={profile?.phone || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={profile?.location || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input id="github" name="socialLinks.github" value={profile?.socialLinks?.github || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" name="socialLinks.linkedin" value={profile?.socialLinks?.linkedin || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X URL</Label>
                  <Input id="twitter" name="socialLinks.twitter" value={profile?.socialLinks?.twitter || ""} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trust Stats</CardTitle>
              <CardDescription>Stats displayed in the About section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years Experience</Label>
                  <Input id="yearsExperience" name="yearsExperience" value={profile?.yearsExperience || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectsDelivered">Projects Delivered</Label>
                  <Input id="projectsDelivered" name="projectsDelivered" value={profile?.projectsDelivered || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technologiesMastered">Technologies</Label>
                  <Input id="technologiesMastered" name="technologiesMastered" value={profile?.technologiesMastered || ""} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving} className="gap-2">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
