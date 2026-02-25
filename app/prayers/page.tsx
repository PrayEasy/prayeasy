"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle, BookOpen, Heart, Calendar, Search } from "lucide-react";

export default function PrayersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="section-container py-8 sm:py-12 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center shadow-lg shadow-azure-500/30">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Prayers
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-13">
          Your personal prayer journal - a record of your spiritual journey
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search your prayers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <Link
          href="/prayers/new"
          className="btn-primary flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          New Prayer
        </Link>
      </div>

      {/* Empty State */}
      <div className="glass-card p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-azure-100 to-sky-100 dark:from-azure-900/30 dark:to-sky-900/30 flex items-center justify-center">
          <Heart className="w-10 h-10 text-azure-500 dark:text-azure-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Start Your Prayer Journal
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Your prayers will appear here. Begin your spiritual journey by sharing what's on your heart with Pastor Hope.
        </p>
        <Link
          href="/prayers/new"
          className="btn-cta inline-flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Write Your First Prayer
        </Link>
      </div>

      {/* Future: Prayer List would go here */}
      {/* When prayers are stored, they would be displayed in a beautiful grid */}
    </div>
  );
}
