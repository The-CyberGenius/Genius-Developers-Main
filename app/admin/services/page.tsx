"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";

type Service = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [order, setOrder] = useState("0");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIcon("");
    setOrder("0");
    setEditingId(null);
  };

  const handleEdit = (service: Service) => {
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon);
    setOrder(service.order.toString());
    setEditingId(service._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Service deleted");
        fetchServices();
      }
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        icon,
        order: parseInt(order),
      };

      const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Service updated" : "Service created");
        resetForm();
        fetchServices();
      } else {
        toast.error("Failed to save service");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Services Manager</h1>
        {editingId && <Button variant="outline" onClick={resetForm}>Cancel Edit</Button>}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 h-fit sticky top-6">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Service" : "Add New Service"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Service Title</Label>
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Full Stack Development" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Icon URL or React Icon Name</Label>
                <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="FaCode" />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update Service" : "Add Service"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-4">
          {services.length === 0 ? (
            <div className="text-center p-12 border border-dashed rounded-xl border-zinc-300 text-zinc-500">
              No services added yet.
            </div>
          ) : (
            services.map((service) => (
              <Card key={service._id}>
                <div className="p-6 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {service.icon && <span className="text-2xl text-zinc-400">{service.icon}</span>}
                      <h3 className="font-bold text-xl">{service.title}</h3>
                    </div>
                    <p className="text-zinc-500">{service.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service._id)} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
