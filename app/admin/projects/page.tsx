"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit, Plus, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  tags: string[];
  order: number;
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [github, setGithub] = useState("");
  const [tags, setTags] = useState("");
  const [order, setOrder] = useState("0");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
      else setProjects([]);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setLink("");
    setGithub("");
    setTags("");
    setOrder("0");
    setEditingId(null);
  };

  const handleEdit = (project: Project) => {
    setTitle(project.title);
    setDescription(project.description);
    setImage(project.image);
    setLink(project.link || "");
    setGithub(project.github || "");
    setTags(project.tags.join(", "));
    setOrder(project.order.toString());
    setEditingId(project._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted");
        fetchProjects();
      }
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        image,
        link,
        github,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        order: parseInt(order),
      };

      const url = editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Project updated" : "Project created");
        resetForm();
        fetchProjects();
      } else {
        toast.error("Failed to save project");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Projects Manager</h1>
        {editingId && (
          <Button variant="outline" onClick={resetForm}>
            Cancel Edit
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <Card className="md:col-span-1 h-fit sticky top-6">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g. E-Commerce App" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input required value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Live Link (Optional)</Label>
                <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>GitHub Link (Optional)</Label>
                <Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/..." />
              </div>
              <div className="space-y-2">
                <Label>Tags (Comma separated)</Label>
                <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update Project" : "Add Project"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* List */}
        <div className="md:col-span-2 space-y-4">
          {projects.length === 0 ? (
            <div className="text-center p-12 border border-dashed rounded-xl border-zinc-300 dark:border-zinc-800 text-zinc-500">
              No projects found. Add your first project!
            </div>
          ) : (
            projects.map((project) => (
              <Card key={project._id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-32 bg-zinc-100 dark:bg-zinc-900 shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 line-clamp-2 mt-1">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div className="flex gap-2">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="ml-auto flex gap-3 text-zinc-400">
                        {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white"><ExternalLink className="w-4 h-4" /></a>}
                        {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white"><FaGithub className="w-4 h-4" /></a>}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
