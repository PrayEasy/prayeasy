"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Loader2, Sparkles, Heart } from "lucide-react";
import { generateAdaptiveResponse } from "@/lib/adaptiveEngine";

export default function NewPrayerPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<{ scripture: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    // Simulate a brief delay for UX
    setTimeout(() => {
      const result = generateAdaptiveResponse(input);
      setResponse({ scripture: result.scripture, message: result.message });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="section-container py-8 sm:py-12 animate-fade-in">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/prayers"
          className="inline-flex items-center gap-2 text-azure-600 dark:text-azure-400 hover:text-azure-700 dark:hover:text-azure-300 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Prayers
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center shadow-lg shadow-azure-500/30">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Start a New Prayer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Share what's on your heart</p>
          </div>
        </div>

        {/* Prayer Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Prayer
              </label>
              <textarea
                className="textarea-field min-h-[160px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your prayer here... Share your joys, concerns, gratitude, or requests."
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Preparing Response...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Prayer
                </>
              )}
            </button>
          </div>
        </form>

        {/* Pastor Hope's Response */}
        {response && (
          <div className="response-card p-6 sm:p-8 animate-slide-up">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-azure-200 dark:border-azure-800/30">
              <Sparkles className="w-5 h-5 text-azure-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pastor Hope's Response
              </h2>
            </div>
            
            {/* Scripture */}
            <blockquote className="mb-6 border-l-4 border-azure-500 pl-4 py-2 bg-azure-50/50 dark:bg-azure-900/20 rounded-r-lg">
              <p className="italic text-azure-800 dark:text-azure-200">
                {response.scripture}
              </p>
            </blockquote>
            
            {/* Message */}
            <div className="prose prose-azure dark:prose-invert max-w-none">
              <div className="space-y-4 text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                {response.message.trim()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
