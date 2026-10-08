import React, { useState } from 'react';
import { Menu, X, Search, Shield, User as UserIcon, Bell } from 'lucide-react';
import { User } from '../../types';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  currentUser: User | null;
  unreadNotifsCount: number;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  currentUser,
  unreadNotifsCount,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'research', label: 'Research' },
    { id: 'live-space', label: 'Live Space' },
    { id: 'satellites', label: 'Satellite Tracker' },
    { id: 'updates', label: 'Space Updates' },
    { id: 'missions', label: 'Missions' },
    { id: 'events', label: 'Events' },
    { id: 'community', label: 'Community' },
    { id: 'team', label: 'Team' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-left group flex items-baseline gap-2 cursor-pointer focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white group-hover:text-neutral-200 transition-colors">
            ORBINEX
          </span>
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            AMT INITIATIVE
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider text-neutral-400">
          {navLinks.slice(0, 7).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                activeTab === item.id ? 'text-white border-b border-white font-medium' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* Overflow Menu dropdown or secondary links */}
          <button
            type="button"
            onClick={() => onNavigate('team')}
            className={`hover:text-white transition-colors cursor-pointer py-1 ${
              activeTab === 'team' ? 'text-white border-b border-white font-medium' : ''
            }`}
          >
            Team
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`hover:text-white transition-colors cursor-pointer py-1 ${
              activeTab === 'about' ? 'text-white border-b border-white font-medium' : ''
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search ORBINEX"
            className="p-2 text-neutral-400 hover:text-white transition-colors rounded hover:bg-neutral-900 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User / Portal Switcher */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' ? (
                <button
                  type="button"
                  onClick={() => onNavigate('admin-portal')}
                  className={`px-3 py-1.5 text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab.startsWith('admin')
                      ? 'bg-white text-black font-semibold'
                      : 'bg-neutral-900 text-neutral-200 border border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Admin Portal</span>
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => onNavigate('user-portal')}
                className={`px-3 py-1.5 text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab.startsWith('user')
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">My Console</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="px-4 py-1.5 text-xs font-mono text-black bg-white hover:bg-neutral-200 rounded font-medium transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-neutral-950 border-b border-neutral-800 space-y-1">
          <div className="grid grid-cols-2 gap-1 pt-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-mono rounded ${
                  activeTab === item.id
                    ? 'bg-neutral-900 text-white font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                onNavigate(currentUser ? 'user-portal' : 'login');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-neutral-900 text-white rounded text-center border border-neutral-800"
            >
              {currentUser ? `Signed in as ${currentUser.name}` : 'Sign In / Register'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
