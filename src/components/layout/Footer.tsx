import React from 'react';
import { Globe, ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-neutral-900">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <div className="text-xl font-bold font-display tracking-tight text-white">ORBINEX</div>
              <div className="text-xs text-neutral-400 font-mono tracking-widest">AMT INITIATIVE</div>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              A community-driven platform for space research, satellite exploration, technology, and discovery. Cultivating interdisciplinary aerospace projects and open scientific resources.
            </p>
            <div className="pt-2 text-xs space-y-1 text-neutral-300">
              <div>
                <span className="text-neutral-500">OFFICIAL LAUNCH: </span>
                <span className="text-white font-semibold">14 OCTOBER 2026</span>
              </div>
              <div>
                <span className="text-neutral-500">INITIATIVE: </span>
                <span>AMT INITIATIVE DIRECTORATE</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">Exploration</div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('satellites')}
                  className="hover:text-white transition-colors"
                >
                  Satellite Tracker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('live-space')}
                  className="hover:text-white transition-colors"
                >
                  Live Space Telemetry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('research')}
                  className="hover:text-white transition-colors"
                >
                  Space Research Papers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('missions')}
                  className="hover:text-white transition-colors"
                >
                  Active Missions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('updates')}
                  className="hover:text-white transition-colors"
                >
                  Space Updates & News
                </button>
              </li>
            </ul>
          </div>

          {/* Initiative & Community */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">Initiative</div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About ORBINEX
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('team')}
                  className="hover:text-white transition-colors"
                >
                  Core Team & Directorate
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('community')}
                  className="hover:text-white transition-colors"
                >
                  Community Registry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors"
                >
                  Events & Symposia
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Leadership Spotlight */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">Leadership</div>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded">
                <div className="text-neutral-500 text-[10px]">FOUNDER &amp; CEO</div>
                <div className="text-white font-medium">Abin Mathew Thomas</div>
                <div className="text-[10px] text-neutral-400">Systems &amp; Aerospace Architect</div>
              </div>
              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded">
                <div className="text-neutral-500 text-[10px]">CO-FOUNDER</div>
                <div className="text-white font-medium">Anjana Koshal</div>
                <div className="text-[10px] text-neutral-400">Research &amp; Planetary Sciences</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} ORBINEX — AMT Initiative. All rights reserved. Precision Space Technology.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
