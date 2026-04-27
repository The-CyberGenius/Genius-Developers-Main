"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";

type Skill = {
  _id: string;
  name: string;
  category: string;
  icon: string;
  proficiency: number;
  order: number;
};

const CATEGORIES = ["Frontend", "Backend", "Tools", "Other"];

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [icon, setIcon] = useState("");
  const [proficiency, setProficiency] = useState("80");
  const [order, setOrder] = useState("0");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("Frontend");
    setIcon("");
    setProficiency("80");
    setOrder("0");
    setEditingId(null);
  };

  const handleEdit = (skill: Skill) => {
    setName(skill.name);
    setCategory(skill.category);
    setIcon(skill.icon);
    setProficiency(skill.proficiency.toString());
    setOrder(skill.order.toString());
    setEditingId(skill._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Skill deleted");
        fetchSkills();
      }
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        category,
        icon,
        proficiency: parseInt(proficiency),
        order: parseInt(order),
      };

      const url = editingId ? `/api/admin/skills/${editingId}` : "/api/admin/skills";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Skill updated" : "Skill created");
        resetForm();
        fetchSkills();
      } else {
        toast.error("Failed to save skill");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Skills Manager</h1>
        {editingId && <Button variant="outline" onClick={resetForm}>Cancel Edit</Button>}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 h-fit sticky top-6">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Skill" : "Add New Skill"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. React" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Icon URL or React Icon Name</Label>
                <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="FaReact" />
              </div>
              <div className="space-y-2">
                <Label>Proficiency (%)</Label>
                <Input type="number" min="0" max="100" value={proficiency} onChange={(e) => setProficiency(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update Skill" : "Add Skill"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          {CATEGORIES.map(cat => {
            const catSkills = skills.filter(s => s.category === cat);
            if (catSkills.length === 0) return null;

            return (
              <div key={cat} className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2">{cat}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {catSkills.map((skill) => (
                    <Card key={skill._id}>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {skill.icon && <span className="text-xl">{skill.icon}</span>}
                            {skill.name}
                          </div>
                          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-zinc-900 dark:bg-zinc-50 h-full" style={{ width: `${skill.proficiency}%` }} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(skill)}><Edit className="w-3 h-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(skill._id)}><Trash2 className="w-3 h-3" /></Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
          {skills.length === 0 && (
            <div className="text-center p-12 border border-dashed rounded-xl border-zinc-300 text-zinc-500">
              No skills added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
