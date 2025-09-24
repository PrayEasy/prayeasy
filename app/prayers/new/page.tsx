"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { generateAdaptiveResponse } from "@/lib/adaptiveEngine";

export default function NewPrayerPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<{ scripture: string; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = generateAdaptiveResponse(input);
    setResponse({ scripture: result.scripture, message: result.message });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header with Back Button */}
      <div className="mb-6">
        <Link
          href="/prayers"
          className="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Prayers
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Start a New Prayer</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-3"
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your prayer here..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Prayer
        </button>
      </form>

      {/* Adaptive Response Section */}
      {response && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Pastor Hope’s Response</h2>
          <p className="italic text-gray-800 mb-4">{response.scripture}</p>
          <div className="space-y-4 text-gray-900 whitespace-pre-line">
            {response.message.trim()}
          </div>
        </div>
      )}
    </div>
  );
}