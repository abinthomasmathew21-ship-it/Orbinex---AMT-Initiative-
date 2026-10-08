import React, { useState } from 'react';
import { Search, X, ArrowRight, Radio, FileText, Calendar, Compass, Users } from 'lucide-react';
import { orbinexStore } from '../../data/store';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'SATELLITES' | 'RESEARCH' | 'EVENTS' | 'UPDATES' | 'MEMBERS'>('ALL');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search through all entities
  const matchingSatellites = orbinexStore.satellites.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.noradId.toString().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.operator.toLowerCase().includes(q)
  );

  const matchingResearch = orbinexStore.researchArticles.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.author.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q)
  );

  const matchingEvents = orbinexStore.events.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
  );

  const matchingUpdates = orbinexStore.spaceUpdates.filter(
    (u) =>
      u.title.toLowerCase().includes(q) ||
      u.category.toLowerCase().includes(q) ||
      u.content.toLowerCase().includes(q)
  );

  const matchingMembers = orbinexStore.users.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      (u.profession && u.profession.toLowerCase().includes(q)) ||
      (u.collegeOrOrg && u.collegeOrOrg.toLowerCase().includes(q))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search satellites, research papers, events, missions, members..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-500 hover:text-white text-xs font-mono"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-neutral-900/50 border-b border-neutral-800 flex gap-2 overflow-x-auto text-xs font-mono">
          {(['ALL', 'SATELLITES', 'RESEARCH', 'EVENTS', 'UPDATES', 'MEMBERS'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                filterType === type
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-neutral-500 text-xs font-mono">
              TYPE KEYWORDS LIKE "ISS", "SDR", "CUBESAT", "SYMPOSIUM", OR "SPECTROSCOPY"
            </div>
          )}

          {/* Satellites */}
          {(filterType === 'ALL' || filterType === 'SATELLITES') && matchingSatellites.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-neutral-400" />
                <span>SATELLITES ({matchingSatellites.length})</span>
              </div>
              {matchingSatellites.slice(0, 4).map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onNavigate('satellites');
                    onClose();
                  }}
                  className="p-2.5 bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800/80 rounded flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <div className="text-xs font-medium text-white font-mono">{s.name}</div>
                    <div className="text-[10px] text-neutral-400">
                      NORAD #{s.noradId} · {s.category} · Alt: {s.altitudeKm}km
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </div>
              ))}
            </div>
          )}

          {/* Research Articles */}
          {(filterType === 'ALL' || filterType === 'RESEARCH') && matchingResearch.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider flex items-center gap-1.5">
                <FileText className="w-3 h-3 text-neutral-400" />
                <span>RESEARCH PAPERS ({matchingResearch.length})</span>
              </div>
              {matchingResearch.slice(0, 4).map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    onNavigate('research');
                    onClose();
                  }}
                  className="p-2.5 bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800/80 rounded flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="pr-4">
                    <div className="text-xs font-medium text-white">{r.title}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {r.author} · {r.category}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Events */}
          {(filterType === 'ALL' || filterType === 'EVENTS') && matchingEvents.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-neutral-400" />
                <span>EVENTS ({matchingEvents.length})</span>
              </div>
              {matchingEvents.slice(0, 3).map((e) => (
                <div
                  key={e.id}
                  onClick={() => {
                    onNavigate('events');
                    onClose();
                  }}
                  className="p-2.5 bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800/80 rounded flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <div className="text-xs font-medium text-white">{e.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {e.date} · {e.mode} · {e.registeredCount}/{e.totalSeats} seats
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </div>
              ))}
            </div>
          )}

          {/* Updates */}
          {(filterType === 'ALL' || filterType === 'UPDATES') && matchingUpdates.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-neutral-400" />
                <span>SPACE UPDATES ({matchingUpdates.length})</span>
              </div>
              {matchingUpdates.slice(0, 3).map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    onNavigate('updates');
                    onClose();
                  }}
                  className="p-2.5 bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800/80 rounded flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="pr-4">
                    <div className="text-xs font-medium text-white">{u.title}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{u.source} · {u.category}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Members */}
          {(filterType === 'ALL' || filterType === 'MEMBERS') && matchingMembers.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider flex items-center gap-1.5">
                <Users className="w-3 h-3 text-neutral-400" />
                <span>MEMBERS ({matchingMembers.length})</span>
              </div>
              {matchingMembers.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    onNavigate('community');
                    onClose();
                  }}
                  className="p-2.5 bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800/80 rounded flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <div className="text-xs font-medium text-white">{m.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {m.profession || m.collegeOrOrg || 'Community Member'} · {m.role}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
