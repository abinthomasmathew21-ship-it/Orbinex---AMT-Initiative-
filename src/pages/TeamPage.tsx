import React, { useState } from 'react';
import { Mail, Linkedin, Github, Twitter, ExternalLink, ShieldCheck } from 'lucide-react';
import { orbinexStore } from '../data/store';
import { TeamMember } from '../types';

interface TeamPageProps {
  onNavigate: (page: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const coreTeam = orbinexStore.coreTeam;
  const executiveLeaders = coreTeam.filter((m) => m.isExecutive);
  const technicalLeaders = coreTeam.filter((m) => !m.isExecutive);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          FOUNDERS &amp; CORE TEAM // ORBINEX
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
          Leadership Directorate &amp; Fellows
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          The team guiding the mission, research publications, orbital tracking networks, and community engineering programs under the AMT Initiative.
        </p>
      </div>

      {/* Executive Founders Section */}
      <div className="space-y-6">
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          EXECUTIVE CO-FOUNDERS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {executiveLeaders.map((member) => (
            <div
              key={member.id}
              className="bg-neutral-950 border border-neutral-800 rounded overflow-hidden flex flex-col sm:flex-row group hover:border-neutral-700 transition-colors"
            >
              <div className="w-full sm:w-64 h-80 sm:h-auto bg-neutral-900 relative overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    {member.department}
                  </div>
                  <h2 className="text-2xl font-bold text-white font-display">{member.name}</h2>
                  <div className="text-xs font-mono text-white font-medium">{member.position}</div>
                  <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                    {member.biography}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-neutral-900">
                  <div className="text-[10px] font-mono text-neutral-500">AREAS OF FOCUS:</div>
                  <div className="flex flex-wrap gap-1 text-[11px] font-mono text-neutral-300">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="after:content-['·'] last:after:content-[''] after:mx-1">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2 text-neutral-400">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-white transition-colors"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition-colors"
                        title="X / Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Team & Leads */}
      <div className="space-y-6">
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          CORE RESEARCH &amp; SYSTEMS LEADS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicalLeaders.map((member) => (
            <div
              key={member.id}
              className="p-6 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 rounded space-y-4 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono font-bold text-white">
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">{member.name}</h3>
                  <div className="text-xs font-mono text-neutral-300">{member.position}</div>
                  <div className="text-[10px] font-mono text-neutral-500">{member.department}</div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                  {member.biography}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-neutral-900">
                <div className="text-[10px] font-mono text-neutral-500">EXPERTISE:</div>
                <div className="flex flex-wrap gap-1 text-[10px] font-mono text-neutral-400">
                  {member.skills.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="after:content-['·'] last:after:content-[''] after:mx-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AMT Initiative Governance Note */}
      <div className="p-6 bg-neutral-950 border border-neutral-800 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-white flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>AMT INITIATIVE GOVERNANCE FRAMEWORK</span>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl">
            ORBINEX is governed under the AMT Initiative charter, upholding rigorous scientific review, open educational access, and ethical space exploration research standards.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded text-xs font-mono text-white whitespace-nowrap cursor-pointer"
        >
          DIRECTORATE INQUIRIES →
        </button>
      </div>
    </div>
  );
};
