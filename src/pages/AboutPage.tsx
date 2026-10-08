import React from 'react';
import { Target, Compass, Award, Shield, Cpu, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const timeline = [
    {
      year: '2025 Q1',
      title: 'Genesis of ORBINEX',
      description: 'Conceived under the AMT Initiative by Abin Mathew Thomas and Anjana Koshal to address the gap in open-access collegiate satellite tracking and amateur space science.',
    },
    {
      year: '2025 Q3',
      title: 'Ground Station SDR Prototype',
      description: 'First successful VHF/UHF automated downlink lock achieved for NOAA-19 and Meteor-M2 weather satellites from the Kerala pilot ground receiver station.',
    },
    {
      year: '2026 Q1',
      title: 'Academic Research Consortium',
      description: 'Formed research groups across astronomy, CubeSat micro-avionics, and planetary science. Published inaugural papers on decentralized satellite SDR meshes.',
    },
    {
      year: '2026 Q3',
      title: 'ORBINEX-Alpha CubeSat Payload Test',
      description: 'Completed thermal-vacuum and vibration qualification for the AMT-1 CubeSat sensor suite and stratospheric balloon testing.',
    },
    {
      year: '14 OCT 2026',
      title: 'Official Worldwide Launch',
      description: 'Global launch of the ORBINEX research portal, public satellite propagation network, open datasets, and international student chapters.',
      highlight: true,
    },
    {
      year: '2027+',
      title: 'Autonomous Swarm & Deep Space Array',
      description: 'Deployment of multi-node passive bistatic orbital debris detection radars and secondary orbital payloads.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          ABOUT ORBINEX // AMT INITIATIVE
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
          Where Curiosity Meets Precision Technology.
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          ORBINEX is a technology and space-focused community initiative operating under the AMT Initiative. We unite engineers, researchers, astronomers, and students to build open-access infrastructure for space exploration, real-time satellite tracking, and observational astrophysics.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-neutral-950 border border-neutral-900 rounded space-y-4">
          <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
            <Target className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-neutral-500 uppercase">OUR VISION</div>
          <h2 className="text-2xl font-bold text-white font-display">A Decentralized Frontier for Space Science</h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            To create a world where space technology, orbital telemetry, and cosmic discoveries are accessible to any motivated student or researcher—removing the barrier of expensive proprietary aerospace platforms.
          </p>
        </div>

        <div className="p-8 bg-neutral-950 border border-neutral-900 rounded space-y-4">
          <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
            <Compass className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-neutral-500 uppercase">OUR MISSION</div>
          <h2 className="text-2xl font-bold text-white font-display">Track. Research. Discover. Build.</h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            To engineer open-source satellite ground networks, incubate CubeSat instrumentation, conduct peer-reviewed astrophysical research, and nurture the next generation of aerospace innovators through hands-on missions and symposia.
          </p>
        </div>
      </div>

      {/* Core Objectives */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">STRATEGIC OBJECTIVES</div>
          <h2 className="text-3xl font-bold font-display text-white">What We Are Building</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3">
            <Cpu className="w-5 h-5 text-neutral-300" />
            <h3 className="text-base font-semibold text-white">Satellite Tracking Systems</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Real-time SGP4 orbital propagation, Doppler frequency shifts, and open API hooks for automated antenna rotators and collegiate receivers.
            </p>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3">
            <BookOpen className="w-5 h-5 text-neutral-300" />
            <h3 className="text-base font-semibold text-white">Open Scientific Research</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Peer-reviewed whitepapers on planetary sciences, exoplanet spectroscopy, and autonomous micro-thruster algorithms with complete DOI attribution.
            </p>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3">
            <Award className="w-5 h-5 text-neutral-300" />
            <h3 className="text-base font-semibold text-white">Space Education &amp; Outreach</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated workshops on Software Defined Radio, astronomy camps, orbital mechanics seminars, and verified certifications of technical competency.
            </p>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3">
            <Shield className="w-5 h-5 text-neutral-300" />
            <h3 className="text-base font-semibold text-white">Community Flight Missions</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Student-built CubeSats, stratospheric telemetry balloons, and space debris surveillance meshes deployed in real aerospace operating conditions.
            </p>
          </div>
        </div>
      </div>

      {/* The Timeline */}
      <div className="space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">ROADMAP &amp; MILESTONES</div>
          <h2 className="text-3xl font-bold font-display text-white">Development Timeline</h2>
        </div>

        <div className="space-y-4">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 border rounded transition-colors ${
                item.highlight
                  ? 'bg-neutral-900/60 border-white/40'
                  : 'bg-neutral-950 border-neutral-900'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-mono font-bold tracking-wider ${item.highlight ? 'text-white' : 'text-neutral-500'}`}>
                  {item.year}
                </span>
                <span className="text-base font-semibold text-white">{item.title}</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-8 sm:p-12 bg-neutral-950 border border-neutral-800 rounded flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-mono text-neutral-500">BE PART OF THE INAUGURAL COHORT</div>
          <h3 className="text-2xl font-bold font-display text-white">Join the ORBINEX Space Community</h3>
          <p className="text-xs text-neutral-400 max-w-lg">
            Connect with aerospace engineers, participate in open-source satellite builds, and gain access to research grants.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('community')}
          className="px-6 py-3 bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs rounded transition-colors whitespace-nowrap cursor-pointer"
        >
          EXPLORE COMMUNITY
        </button>
      </div>
    </div>
  );
};
