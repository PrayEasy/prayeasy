"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { MapPin, Plus, Filter, Heart, Sparkles, Clock, ChevronDown } from "lucide-react";
import { prayers, filterPrayers, getTimeAgo, Prayer } from "@/lib/prayerData";

// Dynamic import for Leaflet components (client-side only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const themes = ['Healing', 'Peace', 'Hope', 'Faith', 'Provision', 'Strength', 'Guidance', 'Gratitude', 'Family', 'Health'];

interface CommunityMapProps {
  onPrayClick?: () => void;
}

export default function CommunityMap({ onPrayClick }: CommunityMapProps) {
  const [mounted, setMounted] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'all' | 'prayer' | 'praise'>('all');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d' | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [prayerIcon, setPrayerIcon] = useState<any>(null);
  const [praiseIcon, setPraiseIcon] = useState<any>(null);

  // Mount check for SSR
  useEffect(() => {
    setMounted(true);
    
    // Import Leaflet and create icons only on client
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        // Fix default icon paths
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        // Create custom icons
        const prayerMarker = L.divIcon({
          className: 'custom-marker',
          html: `<div class="marker-prayer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        const praiseMarker = L.divIcon({
          className: 'custom-marker',
          html: `<div class="marker-praise"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        setPrayerIcon(prayerMarker);
        setPraiseIcon(praiseMarker);
      });
    }
  }, []);

  // Filtered prayers
  const filteredPrayers = useMemo(() => {
    return filterPrayers(prayers, typeFilter, selectedThemes, timeFilter);
  }, [typeFilter, selectedThemes, timeFilter]);

  // Toggle theme filter
  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedThemes([]);
    setTimeFilter('all');
    setTypeFilter('all');
  };

  if (!mounted) {
    return (
      <div className="glass-card p-6 sm:p-8 h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center animate-pulse">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">Loading Community Prayer Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center shadow-lg shadow-azure-500/30">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                Community Prayer Map
              </h2>
              <p className="text-sm text-azure-600 dark:text-azure-400 font-medium">
                {filteredPrayers.length} prayers worldwide
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-azure-100 dark:bg-azure-900/30 text-azure-700 dark:text-azure-300 hover:bg-azure-200 dark:hover:bg-azure-800/40 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Type Tabs */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              typeFilter === 'all'
                ? 'bg-azure-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            All ({prayers.length})
          </button>
          <button
            onClick={() => setTypeFilter('prayer')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              typeFilter === 'prayer'
                ? 'bg-azure-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            <Heart className="w-4 h-4" />
            Prayer Requests
          </button>
          <button
            onClick={() => setTypeFilter('praise')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              typeFilter === 'praise'
                ? 'bg-azure-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Praise Reports
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 animate-slide-up">
            {/* Time Filters */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time Range
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: '24h', label: 'Last 24 Hours' },
                  { value: '7d', label: 'Last 7 Days' },
                  { value: '30d', label: 'Last 30 Days' },
                  { value: 'all', label: 'All Time' },
                ].map((time) => (
                  <button
                    key={time.value}
                    onClick={() => setTimeFilter(time.value as any)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      timeFilter === time.value
                        ? 'bg-ocean-500 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Filters */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Themes {selectedThemes.length > 0 && `(${selectedThemes.length} selected)`}
              </p>
              <div className="flex gap-2 flex-wrap">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => toggleTheme(theme)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedThemes.includes(theme)
                        ? 'bg-aqua-500 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedThemes.length > 0 || timeFilter !== 'all' || typeFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-azure-600 dark:text-azure-400 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] sm:h-[500px]">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        />
        <style jsx global>{`
          .marker-prayer {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #3B82F6, #0EA5E9);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            border: 3px solid white;
          }
          .marker-prayer svg {
            width: 18px;
            height: 18px;
            transform: rotate(45deg);
            color: white;
            fill: white;
          }
          .marker-praise {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #10B981, #06B6D4);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            border: 3px solid white;
          }
          .marker-praise svg {
            width: 18px;
            height: 18px;
            transform: rotate(45deg);
            color: white;
            fill: white;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          }
          .leaflet-popup-content {
            margin: 0;
            min-width: 250px;
          }
          .dark .leaflet-popup-content-wrapper {
            background: #1e293b;
            color: white;
          }
          .dark .leaflet-popup-tip {
            background: #1e293b;
          }
          .leaflet-container {
            font-family: inherit;
          }
        `}</style>
        
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {prayerIcon && praiseIcon && filteredPrayers.map((prayer) => (
            <Marker
              key={prayer.id}
              position={[prayer.location.lat, prayer.location.lng]}
              icon={prayer.type === 'prayer' ? prayerIcon : praiseIcon}
            >
              <Popup>
                <PrayerPopup prayer={prayer} onPrayClick={onPrayClick} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Action Button */}
        <button
          onClick={onPrayClick}
          className="absolute bottom-4 right-4 z-[1000] w-14 h-14 rounded-full bg-gradient-to-br from-azure-500 to-ocean-400 text-white shadow-lg shadow-azure-500/40 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
          title="Submit a prayer"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg text-sm">
          <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Legend</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-azure-500 to-ocean-400"></div>
              <span className="text-gray-600 dark:text-gray-300">Prayer Request</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500"></div>
              <span className="text-gray-600 dark:text-gray-300">Praise Report</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Popup Component
function PrayerPopup({ prayer, onPrayClick }: { prayer: Prayer; onPrayClick?: () => void }) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          prayer.type === 'prayer' 
            ? 'bg-azure-100 text-azure-700 dark:bg-azure-900/30 dark:text-azure-300' 
            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
        }`}>
          {prayer.type === 'prayer' ? '🙏 Prayer Request' : '✨ Praise Report'}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300`}>
          {prayer.theme}
        </span>
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
        "{prayer.text}"
      </p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {prayer.location.city}, {prayer.location.country}
        </span>
        <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {getTimeAgo(prayer.timestamp)}
        </span>
      </div>
      
      <button
        onClick={onPrayClick}
        className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-azure-500 to-ocean-400 text-white rounded-lg font-medium hover:shadow-md transition-all text-sm flex items-center justify-center gap-2"
      >
        <Heart className="w-4 h-4" />
        Pray for this person
      </button>
    </div>
  );
}