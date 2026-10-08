import React, { useState } from 'react';
import { Users, Globe, Cpu, Award, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { orbinexStore } from '../data/store';

interface CommunityPageProps {
  onNavigate: (page: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');

  const users = orbinexStore.users;

  const researchGroups = [
    {
      name: 'Orbital SDR & Ground Mesh',
      lead: 'Marcus Vance & Abin Mathew Thomas',
      description: 'Building open-source automated satellite tracking antennas and distributed downlink receiver nodes.',
      members: 142,
    },
    {
      name: 'Observational Spectroscopy',
      lead: 'Anjana Koshal & Dr. Elena Rostova',
      description: 'Calibrating ground-based transit curves for exoplanet atmospheres and solar flare chromospheric dynamics.',
      members: 98,
    },
    {
      name: 'CubeSat Swarms & Edge AI',
      lead: 'Dr. Siddharth Nair',
      description: 'Quantized neural networks on microcontrollers for autonomous thruster and orbital decay compensation.',
      members: 115,
    },
    {
      name: 'Lunar ISRU & Planetary Habitats',
      lead: 'Anjana Koshal',
      description: 'Microwave sintering of high-titanium regolith simulants for radiation shielding blast walls.',
      members: 76,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          COMMUNITY // AMT SPACE COLLECTIVE
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          The ORBINEX Space Community
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Uniting aerospace engineers, astronomers, students, developers, and researchers. Collaborate on real space missions, satellite tracking meshes, and scientific publications.
        </p>
      </div>

      {/* Community Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-neutral-950 border border-neutral-900 rounded font-mono">
        <div className="space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">ACTIVE MEMBERS</div>
          <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">2,480+</div>
          <div className="text-[10px] text-neutral-400">Across 28 Countries</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">COLLEGIATE CHAPTERS</div>
          <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">42</div>
          <div className="text-[10px] text-neutral-400">University Ground Nodes</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">OPEN REPOSITORIES</div>
          <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">18</div>
          <div className="text-[10px] text-neutral-400">Telemetry &amp; SDR Software</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] text-neutral-500 uppercase">RESEARCH PAPERS</div>
          <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">14</div>
          <div className="text-[10px] text-neutral-400">Peer-Reviewed / DOI</div>
        </div>
      </div>

      {/* Active Research Working Groups */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">COLLABORATIVE TEAMS</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Research Working Groups</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchGroups.map((group, idx) => (
            <div
              key={idx}
              className="p-6 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 rounded space-y-4 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>WORKING GROUP #{idx + 1}</span>
                  <span className="text-neutral-300 font-semibold">{group.members} Collaborators</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display">{group.name}</h3>
                <div className="text-xs font-mono text-neutral-400">COORDINATORS: {group.lead}</div>
                <p className="text-xs text-neutral-400 leading-relaxed pt-1 font-sans">{group.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-white hover:text-neutral-300 underline"
                >
                  JOIN WORKING GROUP →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">COMMUNITY ROSTER</div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Featured Members &amp; Fellows</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="text-xs font-mono text-white underline hover:no-underline"
          >
            CREATE YOUR PROFILE →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((member) => (
            <div
              key={member.id}
              className="p-5 bg-neutral-950 border border-neutral-900 rounded space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-white">
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">{member.name}</h3>
                  <div className="text-[11px] font-mono text-neutral-400 truncate">
                    {member.profession || member.collegeOrOrg || 'Space Enthusiast'}
                  </div>
                  {member.location && (
                    <div className="text-[10px] font-mono text-neutral-500">{member.location}</div>
                  )}
                </div>

                {member.interests && (
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono text-neutral-400 pt-1">
                    {member.interests.slice(0, 2).map((interest, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-neutral-900 rounded border border-neutral-800">
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-900 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                <span>ROLE: {member.role}</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Community CTA */}
      <div className="p-8 sm:p-12 bg-neutral-950 border border-neutral-800 rounded text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Become Part of the ORBINEX Mission
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
          Register your profile, access our live satellite ground station feeds, submit research preprints, and participate in worldwide astronomy symposia.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="px-6 py-3 bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs rounded transition-colors"
          >
            CREATE FREE MEMBER PROFILE
          </button>
        </div>
      </div>
    </div>
  );
};
