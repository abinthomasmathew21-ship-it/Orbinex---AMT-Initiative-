import React, { useState } from 'react';
import { SpaceHeroCanvas } from '../components/three/SpaceHeroCanvas';
import { LaunchCountdown } from '../components/common/LaunchCountdown';
import { ArrowRight, Radio, Compass, FileText, Calendar, Users, Shield, ExternalLink, ChevronRight } from 'lucide-react';
import { orbinexStore } from '../data/store';
import { PORTRAIT_ABIN, PORTRAIT_ANJANA } from '../assets/portraits';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedSat, setSelectedSat] = useState<string | null>(null);

  const upcomingEvent = orbinexStore.events[0];
  const featuredResearch = orbinexStore.researchArticles.slice(0, 2);
  const latestUpdates = orbinexStore.spaceUpdates.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Announcement Ribbon if active */}
      {orbinexStore.settings.announcementActive && (
        <div className="bg-neutral-950 border-b border-neutral-800 text-neutral-300 py-2.5 px-4 text-xs font-mono text-center flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{orbinexStore.settings.announcementText}</span>
          <button
            type="button"
            onClick={() => onNavigate('events')}
            className="text-white underline hover:no-underline ml-1 font-semibold"
          >
            REGISTER →
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6 z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 border border-neutral-800 px-3 py-1 rounded bg-neutral-950">
                <span>ORBINEX</span>
                <span>·</span>
                <span>AMT INITIATIVE</span>
                <span>·</span>
                <span className="text-white">SPACE EXPLORATION</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.05]">
                Explore Beyond Boundaries.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl">
              A community-driven platform for space research, satellite exploration, technology, and discovery under the AMT Initiative.
            </p>

            {/* Launch Countdown Component */}
            <div className="pt-2">
              <LaunchCountdown
                targetDateStr={orbinexStore.settings.launchDate}
                isLiveForced={orbinexStore.settings.isLiveForced}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('satellites')}
                className="px-5 py-3 text-xs sm:text-sm font-mono font-semibold text-black bg-white hover:bg-neutral-200 transition-colors rounded flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE ORBINEX</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('community')}
                className="px-5 py-3 text-xs sm:text-sm font-mono text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-colors rounded cursor-pointer"
              >
                JOIN THE COMMUNITY
              </button>

              <button
                type="button"
                onClick={() => onNavigate('live-space')}
                className="px-4 py-3 text-xs sm:text-sm font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-neutral-400" />
                <span>EXPLORE LIVE SPACE</span>
              </button>
            </div>

            {/* Founder Marker Quote */}
            <div className="pt-4 border-t border-neutral-900 text-xs font-mono text-neutral-500 flex flex-wrap items-center gap-3">
              <span>FOUNDER &amp; CEO: ABIN MATHEW THOMAS</span>
              <span>·</span>
              <span>CO-FOUNDER: ANJANA KOSHAL</span>
            </div>
          </div>

          {/* Right Hero Column: 3D Earth & Satellite Space Scene */}
          <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[540px] lg:h-[600px] border border-neutral-900 rounded bg-neutral-950 overflow-hidden shadow-2xl">
            <SpaceHeroCanvas
              onSelectSatellite={(name) => setSelectedSat(name)}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Real-Time Telemetry Bar */}
      <section className="border-y border-neutral-900 bg-neutral-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">ISS VELOCITY</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">27,580 km/h</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>LEO 418.5 KM · NOMINAL</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">TRACKED ASSETS</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                {orbinexStore.satellites.length} Satellites
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                SGP4 PROPAGATION ENGINE
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">ACTIVE RESEARCH</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                {orbinexStore.researchArticles.length} Whitepapers
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                OPEN ACCESS PEER PAPERS
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">COMMUNITY DELEGATES</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                {upcomingEvent.registeredCount.toLocaleString()} Seats
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                LAUNCH SYMPOSIUM 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Brand Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-4 mb-10">
          <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">CORE BRAND PILLARS</div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Engineering Precision. Community Exploration.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3 hover:border-neutral-800 transition-colors">
            <div className="text-xs font-mono text-neutral-500 uppercase">PILLAR 01</div>
            <h3 className="text-lg font-semibold text-white">Satellite Tracking &amp; SDR Telemetry</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Real-time orbital tracking of active satellites and space stations using SGP4 propagators, Doppler compensation, and decentralized Software Defined Radio ground nodes.
            </p>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3 hover:border-neutral-800 transition-colors">
            <div className="text-xs font-mono text-neutral-500 uppercase">PILLAR 02</div>
            <h3 className="text-lg font-semibold text-white">Peer Space Research &amp; Astronomy</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Deep observational astrophysics, planetary spectroscopy, CubeSat micro-avionics, and exoplanetary atmospheric science led by collegiate researchers.
            </p>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3 hover:border-neutral-800 transition-colors">
            <div className="text-xs font-mono text-neutral-500 uppercase">PILLAR 03</div>
            <h3 className="text-lg font-semibold text-white">Open Community &amp; Space Missions</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Global hackathons, stratospheric balloon launches, hardware building workshops, and mission design sprints open to students and enthusiasts worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">LEADERSHIP &amp; DIRECTORATE</div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Guiding the ORBINEX Initiative
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('team')}
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 self-start"
          >
            <span>VIEW FULL CORE TEAM</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Founder & CEO Abin Mathew Thomas */}
          <div className="bg-neutral-950 border border-neutral-800 rounded overflow-hidden flex flex-col sm:flex-row group hover:border-neutral-700 transition-colors">
            <div className="w-full sm:w-56 h-72 sm:h-auto bg-neutral-900 relative overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={PORTRAIT_ABIN}
                alt="Abin Mathew Thomas, Founder & CEO"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />
            </div>
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  FOUNDER &amp; CEO · AMT INITIATIVE
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Abin Mathew Thomas</h3>
                <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                  Aerospace technologist and systems architect leading ORBINEX under the AMT Initiative. Focused on democratizing satellite tracking telemetry, low-cost space exploration frameworks, and cultivating interdisciplinary research communities.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-900">
                <div className="text-[10px] font-mono text-neutral-500">AREAS OF FOCUS:</div>
                <div className="flex flex-wrap gap-1 text-[11px] font-mono text-neutral-300">
                  <span>Orbital Mechanics</span> · <span>SDR Networks</span> · <span>CubeSats</span>
                </div>
              </div>
            </div>
          </div>

          {/* Co-Founder Anjana Koshal */}
          <div className="bg-neutral-950 border border-neutral-800 rounded overflow-hidden flex flex-col sm:flex-row group hover:border-neutral-700 transition-colors">
            <div className="w-full sm:w-56 h-72 sm:h-auto bg-neutral-900 relative overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={PORTRAIT_ANJANA}
                alt="Anjana Koshal, Co-Founder"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />
            </div>
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  CO-FOUNDER · ORBINEX
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Anjana Koshal</h3>
                <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                  Co-Founder leading scientific initiatives, observational astronomy partnerships, and academic community development. Passionate about planetary sciences, radio astronomy data pipelines, and youth space education.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-900">
                <div className="text-[10px] font-mono text-neutral-500">AREAS OF FOCUS:</div>
                <div className="flex flex-wrap gap-1 text-[11px] font-mono text-neutral-300">
                  <span>Planetary Sciences</span> · <span>Spectroscopy</span> · <span>Observational Astronomy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research & Upcoming Event */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Research Articles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">RECENT RESEARCH DISPATCHES</div>
              <button
                type="button"
                onClick={() => onNavigate('research')}
                className="text-xs font-mono text-neutral-400 hover:text-white"
              >
                VIEW ALL PAPERS →
              </button>
            </div>

            <div className="space-y-4">
              {featuredResearch.map((res) => (
                <div
                  key={res.id}
                  onClick={() => onNavigate('research')}
                  className="p-5 bg-neutral-950 border border-neutral-900 hover:border-neutral-700 rounded transition-colors cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>{res.category}</span>
                    <span>{res.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white hover:text-neutral-200">
                    {res.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {res.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-[11px] font-mono text-neutral-400">
                    <span>{res.author}</span>
                    <span className="text-neutral-500">{res.downloadsCount} downloads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Inaugural Launch Event */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">OFFICIAL LAUNCH EVENT</div>
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded space-y-5">
              <div className="space-y-1">
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>REGISTRATION ACTIVE</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display leading-snug">
                  {upcomingEvent.name}
                </h3>
              </div>

              <div className="space-y-2 text-xs font-mono text-neutral-300">
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">DATE:</span>
                  <span className="text-white font-semibold">{upcomingEvent.date}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">MODE:</span>
                  <span>{upcomingEvent.mode} BROADCAST</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">KEYNOTE SPEAKERS:</span>
                  <span>Abin Mathew Thomas, Anjana Koshal</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-neutral-500">SEATS RESERVED:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {upcomingEvent.registeredCount} / {upcomingEvent.totalSeats}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('events')}
                className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs rounded transition-colors"
              >
                REGISTER FOR SYMPOSIUM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Space Updates Newsfeed preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">GLOBAL AEROSPACE WIRE</div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Latest Space Updates</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('updates')}
            className="text-xs font-mono text-neutral-400 hover:text-white"
          >
            ALL DISPATCHES →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestUpdates.map((update) => (
            <div
              key={update.id}
              onClick={() => onNavigate('updates')}
              className="p-5 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 rounded transition-colors cursor-pointer space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span className="text-neutral-300 font-medium">{update.category}</span>
                  <span>{update.publishedDate}</span>
                </div>
                <h3 className="text-sm font-semibold text-white leading-snug">
                  {update.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {update.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                <span>SOURCE: {update.source}</span>
                <span>{update.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
