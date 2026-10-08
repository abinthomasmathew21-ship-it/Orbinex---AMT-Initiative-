import React from 'react';
import { Rocket, Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { orbinexStore } from '../data/store';

interface MissionsPageProps {
  onNavigate: (page: string) => void;
}

export const MissionsPage: React.FC<MissionsPageProps> = ({ onNavigate }) => {
  const missions = orbinexStore.missions;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          PROJECT FLIGHT MANIFEST // ORBINEX
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          Active Space &amp; Flight Missions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Community-designed payloads, stratospheric observatories, and orbital sensor arrays developed by the AMT Initiative engineering teams.
        </p>
      </div>

      {/* Missions Grid */}
      <div className="space-y-8">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="p-6 sm:p-8 bg-neutral-950 border border-neutral-900 rounded space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-900">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500">CODENAME: {mission.codename}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-emerald-400 font-semibold">
                    {mission.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold font-display text-white">{mission.name}</h2>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-neutral-400">
                <div>MISSION LEAD: <span className="text-white">{mission.lead}</span></div>
                <div className="text-[11px] text-neutral-500">ORBIT: {mission.orbit}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-neutral-500 uppercase">MISSION OBJECTIVE</div>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">{mission.objective}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{mission.description}</p>
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-neutral-500 uppercase">ENGINEERING MILESTONES</div>
                <div className="space-y-2 font-mono text-xs">
                  {mission.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-neutral-900/60 border border-neutral-800/80 rounded flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-neutral-600 shrink-0" />
                        )}
                        <span className={m.completed ? 'text-white' : 'text-neutral-400'}>
                          {m.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>TARGET SCHEDULE: {mission.launchTarget}</span>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>PROPOSE PAYLOAD INTEGRATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
