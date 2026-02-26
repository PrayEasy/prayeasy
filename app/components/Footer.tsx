"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-cobalt-500 to-azure-600 dark:from-slate-900 dark:to-cobalt-900 text-white mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🙏</span>
              <span className="text-2xl font-bold">PrayEasy</span>
            </div>
            <p className="text-azure-100 dark:text-slate-300 text-sm leading-relaxed">
              <em>Sword of the Spirit is the Word of God.</em>
            </p>
            <p className="text-azure-200 dark:text-slate-400 text-sm">
              Your digital companion for spiritual growth and prayerful reflection.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-azure-100 dark:text-slate-300 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link 
                href="/devotionals" 
                className="text-azure-100 dark:text-slate-300 hover:text-white transition-colors text-sm"
              >
                Daily Devotionals
              </Link>
              <Link 
                href="/bible" 
                className="text-azure-100 dark:text-slate-300 hover:text-white transition-colors text-sm"
              >
                Bible Deep Dive
              </Link>
              <Link 
                href="/prayers" 
                className="text-azure-100 dark:text-slate-300 hover:text-white transition-colors text-sm"
              >
                My Prayers
              </Link>
            </nav>
          </div>

          {/* Contact/Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">About Pastor Hope</h3>
            <p className="text-azure-200 dark:text-slate-400 text-sm leading-relaxed">
              Pastor Hope is your AI spiritual companion, providing compassionate, 
              Scripture-based responses to guide you through life's journey.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-azure-400/30 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-azure-200 dark:text-slate-400 text-sm">
              © {currentYear} PrayEasy. All prayers are handled with pastoral care and anonymity.
            </p>
            <p className="flex items-center gap-1 text-azure-200 dark:text-slate-400 text-sm">
              Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> and faith
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
