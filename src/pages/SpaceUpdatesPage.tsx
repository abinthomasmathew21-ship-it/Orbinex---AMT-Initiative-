import React, { useState } from 'react';
import { Search, ExternalLink, X, Compass, Clock, Building } from 'lucide-react';
import { orbinexStore } from '../data/store';
import { SpaceUpdate } from '../types';

export const SpaceUpdatesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('ALL');
  const [selectedUpdate, setSelectedUpdate] = useState<SpaceUpdate | null>(null);

  const categories = [
    'ALL',
    'NASA',
    'ISRO',
    'ESA',
    'SpaceX',
    'Discoveries',
    'Space Technology',
    'Space Missions',
  ];

  const updates = orbinexStore.spaceUpdates.filter((u) => {
    const matchesSearch =
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.content.toLowerCase().includes(search.toLowerCase()) ||
      u.source.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'ALL' || u.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          DISPATCHES // GLOBAL SPACE WIRE
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          Space Updates &amp; Mission Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Curated dispatches, scientific mission updates, and launch milestones from NASA, ESA, ISRO, commercial space entities, and ORBINEX labs.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search updates (e.g. Artemis, Gaganyaan, Webb, Falcon)..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                category === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dispatches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {updates.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedUpdate(item)}
            className="p-6 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 rounded space-y-4 flex flex-col justify-between transition-colors cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span className="text-white font-medium">{item.category}</span>
                <span>{item.publishedDate}</span>
              </div>

              <h2 className="text-base font-bold text-white font-display group-hover:text-neutral-200 transition-colors leading-snug">
                {item.title}
              </h2>

              <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                {item.shortDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="truncate max-w-[150px]">SOURCE: {item.source}</span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.readTime}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Update Reader Modal */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-900">
              <div className="space-y-1">
                <div className="text-xs font-mono text-neutral-500 uppercase">{selectedUpdate.category}</div>
                <h3 className="text-2xl font-bold font-display text-white">{selectedUpdate.title}</h3>
                <div className="text-xs font-mono text-neutral-400">
                  PUBLISHED: {selectedUpdate.publishedDate} · {selectedUpdate.readTime}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p className="font-semibold text-white">{selectedUpdate.shortDescription}</p>
              <p>{selectedUpdate.content}</p>
            </div>

            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-neutral-500">OFFICIAL SOURCE: </span>
                <span className="text-white font-semibold">{selectedUpdate.source}</span>
              </div>
              {selectedUpdate.sourceUrl && (
                <a
                  href={selectedUpdate.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-300 hover:text-white flex items-center gap-1 underline"
                >
                  <span>VISIT SOURCE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-neutral-900">
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs rounded border border-neutral-800"
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
