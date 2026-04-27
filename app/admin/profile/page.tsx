"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfile((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev: any) => ({ ...prev, [name]: value }));
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
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile?.name || ""}
                  onChange={handleChange}
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  value={profile?.tagline || ""}
                  onChange={handleChange}
                  placeholder="e.g. AI Full Stack Developer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutText">About Text</Label>
              <Textarea
                id="aboutText"
                name="aboutText"
                value={profile?.aboutText || ""}
                onChange={handleChange}
                rows={4}
                placeholder="A brief description about you and your work."
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile?.email || ""}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profile?.phone || ""}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp URL</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={profile?.whatsapp || ""}
                  onChange={handleChange}
                  placeholder="https://wa.me/91XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={profile?.location || ""}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  name="yearsExperience"
                  value={profile?.yearsExperience || ""}
                  onChange={handleChange}
                  placeholder="e.g. 3+"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectsDelivered">Projects Delivered</Label>
                <Input
                  id="projectsDelivered"
                  name="projectsDelivered"
                  value={profile?.projectsDelivered || ""}
                  onChange={handleChange}
                  placeholder="e.g. 25+"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologiesMastered">Technologies Mastered</Label>
                <Input
                  id="technologiesMastered"
                  name="technologiesMastered"
                  value={profile?.technologiesMastered || ""}
                  onChange={handleChange}
                  placeholder="e.g. 15+"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Presence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  name="socialLinks.github"
                  value={profile?.socialLinks?.github || ""}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  name="socialLinks.linkedin"
                  value={profile?.socialLinks?.linkedin || ""}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X URL</Label>
                <Input
                  id="twitter"
                  name="socialLinks.twitter"
                  value={profile?.socialLinks?.twitter || ""}
                  onChange={handleChange}
                  placeholder="https://x.com/yourusername"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube URL</Label>
                <Input
                  id="youtube"
                  name="socialLinks.youtube"
                  value={profile?.socialLinks?.youtube || ""}
                  onChange={handleChange}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  name="socialLinks.instagram"
                  value={profile?.socialLinks?.instagram || ""}
                  onChange={handleChange}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
