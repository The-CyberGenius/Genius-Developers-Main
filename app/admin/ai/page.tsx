"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Bot, Wand2, FileText, Code2, MessageSquare, Lightbulb } from "lucide-react";

const DEMO_CAPABILITIES = [
  {
    icon: "🤖",
    title: "AI Chatbot Integration",
    desc: "Build intelligent customer support bots, FAQ assistants, and lead generation chatbots using OpenAI GPT-4 and custom knowledge bases.",
  },
  {
    icon: "✍️",
    title: "AI Content Generation",
    desc: "Auto-generate blog posts, product descriptions, social captions, and SEO-optimized content tailored to your brand's tone.",
  },
  {
    icon: "🔍",
    title: "Smart Search & Recommendations",
    desc: "Semantic search engines and AI-powered recommendation systems for e-commerce, news platforms, and educational portals.",
  },
  {
    icon: "📊",
    title: "Data Analysis & Insights",
    desc: "AI dashboards that analyze your business data, predict trends, and generate automated reports — connected to your database.",
  },
  {
    icon: "🖼️",
    title: "AI Image Generation",
    desc: "Integrate DALL-E, Stable Diffusion, or Midjourney into your apps for automated thumbnail creation, product mockups, and more.",
  },
  {
    icon: "⚡",
    title: "Workflow Automation",
    desc: "AI agents that automate repetitive tasks: sending emails, processing forms, summarizing documents, and multi-step pipelines.",
  },
];

const BIO_PROMPT = `Write a compelling, professional bio for Balkrishan Prajapat (Shiva), a Full-Stack Developer from India specializing in Next.js, React, AI integration, and building premium digital products. Make it suitable for a portfolio website, 3 paragraphs, confident yet approachable tone.`;

export default function AIPage() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(BIO_PROMPT);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      // Simulate AI generation with a mock response (no API key needed for demo)
      await new Promise(r => setTimeout(r, 1500));
      setResult(
        `Balkrishan Prajapat, known as Shiva, is a passionate Full-Stack Developer from India with 3+ years of experience building world-class digital products. Specializing in Next.js, React, and Node.js, he crafts high-performance web applications that blend elegant design with robust engineering.

Shiva is deeply invested in the AI revolution — integrating OpenAI, Gemini, and LangChain into real-world products to automate workflows, power intelligent chatbots, and deliver next-generation user experiences. He has delivered 25+ projects spanning e-commerce platforms, news portals, SaaS products, and educational tools.

Whether you need a pixel-perfect frontend, a scalable backend API, or an AI-powered feature that wows your users — Shiva brings the full package. He works remotely with clients worldwide, combining technical excellence with a relentless commitment to quality and delivery.`
      );
      toast.success("Content generated! (Demo mode — connect your OpenAI/Gemini API key to enable live AI)");
    } catch {
      toast.error("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Bot className="w-8 h-8" /> AI Features & Capabilities
        </h1>
        <p className="text-zinc-500 mt-2">Showcase and demonstrate AI integration capabilities for clients.</p>
      </div>

      {/* AI Capabilities Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> What I Build with AI
          </CardTitle>
          <CardDescription>
            These are the AI-powered features I can integrate into your product. Click any to learn more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_CAPABILITIES.map((cap, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-default"
              >
                <div className="text-3xl mb-3">{cap.icon}</div>
                <h3 className="font-bold mb-2">{cap.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live AI Content Generator Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-500" /> AI Content Generator (Demo)
          </CardTitle>
          <CardDescription>
            Type a prompt and generate AI content. Connect your OpenAI or Gemini API key in .env to enable live generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Your Prompt</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="font-mono text-sm"
              placeholder="Write a professional bio for..."
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleGenerate} disabled={loading || !prompt.trim()} className="flex items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              {loading ? "Generating..." : "Generate with AI"}
            </Button>
            {result && (
              <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Copy Result
              </Button>
            )}
          </div>

          {result && (
            <div className="mt-4 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-zinc-500">
                <MessageSquare className="w-4 h-4" /> AI Response
              </div>
              <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 leading-relaxed">{result}</p>
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/40 text-sm text-blue-700 dark:text-blue-400">
            <strong>💡 Note for clients:</strong> This is a demo showcasing AI generation capability. In your project, this would be connected to OpenAI GPT-4, Google Gemini, or any AI API of your choice for real-time, intelligent content generation.
          </div>
        </CardContent>
      </Card>

      {/* Quick Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Code2 className="w-5 h-5" /> Quick Prompt Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: "Professional Bio", prompt: BIO_PROMPT },
              { label: "Service Description", prompt: "Write a compelling service description for a Full-Stack Developer who specializes in AI integration and Next.js development." },
              { label: "Project Case Study", prompt: "Write a short case study for a news portal web app built with Next.js and MongoDB that serves thousands of daily readers." },
              { label: "Cold Email to Client", prompt: "Write a professional cold email to a startup founder offering web development and AI integration services." },
            ].map((t, i) => (
              <button
                key={i}
                onClick={() => setPrompt(t.prompt)}
                className="p-4 text-left rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 transition-colors"
              >
                <p className="font-medium text-sm">{t.label}</p>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{t.prompt}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
