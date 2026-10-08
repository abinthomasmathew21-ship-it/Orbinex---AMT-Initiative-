import React, { useState } from 'react';
import { User, PlatformEvent, Certificate, ResearchArticle } from '../types';
import { orbinexStore } from '../data/store';
import {
  Calendar,
  Bookmark,
  Award,
  Bell,
  Settings,
  Radio,
  FileText,
  User as UserIcon,
  LogOut,
  Download,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface UserPortalPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const UserPortalPage: React.FC<UserPortalPageProps> = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'EVENTS' | 'SAVED' | 'CERTIFICATES' | 'PROFILE'>('DASHBOARD');
  const currentUser = orbinexStore.currentUser;

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4">
        <h2 className="text-2xl font-bold font-display text-white">Authentication Required</h2>
        <p className="text-xs text-neutral-400 font-mono">
          Please sign in to access your personal orbital dashboard.
        </p>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-2.5 bg-white text-black font-mono text-xs font-semibold rounded"
        >
          SIGN IN NOW
        </button>
      </div>
    );
  }

  // Get user registered events
  const registeredEventIds = orbinexStore.registrations
    .filter((r) => r.userId === currentUser.id)
    .map((r) => r.eventId);
  const userRegisteredEvents = orbinexStore.events.filter((e) => registeredEventIds.includes(e.id));

  // Get saved research articles
  const savedArticles = orbinexStore.researchArticles.filter((a) =>
    orbinexStore.savedArticles.includes(a.id)
  );

  // User certificates
  const userCertificates = orbinexStore.certificates.filter(
    (c) => c.userId === currentUser.id || c.recipientName === currentUser.name
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* User Header Profile Banner */}
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-lg text-white overflow-hidden shrink-0">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale"
              />
            ) : (
              currentUser.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white font-display">{currentUser.name}</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                {currentUser.role}
              </span>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              {currentUser.profession || currentUser.collegeOrOrg || 'Space Research Fellow'} · {currentUser.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('satellites')}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-mono text-xs rounded transition-colors flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5 text-neutral-400" />
            <span>TRACKER</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white font-mono text-xs rounded transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-900 pb-2 text-xs font-mono overflow-x-auto no-scrollbar">
        {[
          { id: 'DASHBOARD', label: 'Console Overview' },
          { id: 'EVENTS', label: `My Events (${userRegisteredEvents.length})` },
          { id: 'SAVED', label: `Saved Research (${savedArticles.length})` },
          { id: 'CERTIFICATES', label: `Certificates (${userCertificates.length})` },
          { id: 'PROFILE', label: 'Profile Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'DASHBOARD' && (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">CONFIRMED EVENTS</div>
              <div className="text-2xl font-bold text-white tabular-nums">{userRegisteredEvents.length}</div>
              <div className="text-[10px] text-neutral-400">Launch 14 Oct Active</div>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">SAVED PAPERS</div>
              <div className="text-2xl font-bold text-white tabular-nums">{savedArticles.length}</div>
              <div className="text-[10px] text-neutral-400">Research Vault</div>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">EARNED CERTIFICATES</div>
              <div className="text-2xl font-bold text-white tabular-nums">{userCertificates.length}</div>
              <div className="text-[10px] text-neutral-400">Verified Credentials</div>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">SYSTEM STATUS</div>
              <div className="text-2xl font-bold text-emerald-400">ACTIVE</div>
              <div className="text-[10px] text-neutral-400">AMT Initiative Member</div>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Registered Events & Saved Papers */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>UPCOMING REGISTERED SESSIONS</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('events')}
                    className="text-neutral-400 hover:text-white"
                  >
                    EXPLORE MORE EVENTS →
                  </button>
                </div>

                {userRegisteredEvents.length === 0 ? (
                  <div className="p-6 bg-neutral-950 border border-neutral-900 rounded text-center text-xs text-neutral-500 font-mono">
                    NO REGISTERED SESSIONS YET. REGISTER FOR THE INAUGURAL 14 OCT SYMPOSIUM.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userRegisteredEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-4 bg-neutral-950 border border-neutral-900 rounded space-y-2 font-mono text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">{evt.name}</span>
                          <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            CONFIRMED
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          DATE: {evt.date} · TIME: {evt.time} · {evt.mode}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Papers Preview */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-neutral-500">SAVED RESEARCH ARTICLES</div>
                {savedArticles.length === 0 ? (
                  <div className="p-6 bg-neutral-950 border border-neutral-900 rounded text-center text-xs text-neutral-500 font-mono">
                    NO BOOKMARKED PAPERS. BROWSE THE RESEARCH REPOSITORY.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {savedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => onNavigate('research')}
                        className="p-3 bg-neutral-950 border border-neutral-900 rounded hover:border-neutral-800 transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div className="pr-4">
                          <div className="text-xs font-semibold text-white truncate max-w-md">{art.title}</div>
                          <div className="text-[10px] font-mono text-neutral-400">{art.author} · {art.category}</div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Notifications & Quick Telemetry Feed */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-neutral-500">SYSTEM NOTIFICATIONS</div>
                <div className="space-y-2">
                  {orbinexStore.notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      className="p-3 bg-neutral-950 border border-neutral-900 rounded space-y-1 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-white font-semibold">{n.title}</span>
                        <span className="text-neutral-500">{new Date(n.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVENTS TAB */}
      {activeTab === 'EVENTS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>REGISTERED FLIGHT &amp; SYMPOSIUM SESSIONS</span>
            <button
              onClick={() => onNavigate('events')}
              className="text-white underline hover:no-underline"
            >
              BROWSE PUBLIC EVENTS →
            </button>
          </div>

          {userRegisteredEvents.length === 0 ? (
            <div className="p-12 bg-neutral-950 border border-neutral-900 rounded text-center space-y-3">
              <p className="text-xs font-mono text-neutral-400">You haven't reserved any event seats yet.</p>
              <button
                onClick={() => onNavigate('events')}
                className="px-4 py-2 bg-white text-black font-mono text-xs rounded"
              >
                VIEW EVENTS SCHEDULE
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRegisteredEvents.map((e) => (
                <div key={e.id} className="p-6 bg-neutral-950 border border-neutral-800 rounded space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-300">
                      {e.category}
                    </span>
                    <h3 className="text-lg font-bold text-white font-display pt-1">{e.name}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{e.description}</p>
                  </div>

                  <div className="space-y-1 text-xs font-mono text-neutral-300 pt-2 border-t border-neutral-900">
                    <div>DATE: {e.date} ({e.time})</div>
                    <div>VENUE: {e.location}</div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400">SEAT ALLOCATED</span>
                    <button
                      onClick={() => orbinexStore.unregisterForEvent(e.id)}
                      className="text-neutral-500 hover:text-red-400 transition-colors"
                    >
                      CANCEL RESERVATION
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SAVED TAB */}
      {activeTab === 'SAVED' && (
        <div className="space-y-4">
          <div className="text-xs font-mono text-neutral-500">SAVED RESEARCH WHITEPAPERS</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedArticles.map((art) => (
              <div key={art.id} className="p-5 bg-neutral-950 border border-neutral-900 rounded space-y-3">
                <div className="text-[10px] font-mono text-neutral-500">{art.category}</div>
                <h3 className="text-base font-bold text-white font-display">{art.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">{art.summary}</p>
                <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => onNavigate('research')}
                    className="text-white underline hover:no-underline"
                  >
                    READ ARTICLE
                  </button>
                  <button
                    onClick={() => orbinexStore.toggleSaveArticle(art.id)}
                    className="text-neutral-500 hover:text-white"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CERTIFICATES TAB */}
      {activeTab === 'CERTIFICATES' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-neutral-500">CREDENTIALS &amp; ACCOMPLISHMENTS</div>
            <h2 className="text-2xl font-bold font-display text-white">Verified Certificates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userCertificates.map((cert) => (
              <div
                key={cert.id}
                className="p-8 bg-neutral-950 border-2 border-neutral-800 rounded space-y-6 relative overflow-hidden"
              >
                <div className="space-y-1 text-center border-b border-neutral-900 pb-4">
                  <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    ORBINEX — AMT INITIATIVE
                  </div>
                  <div className="text-base font-bold font-display text-white tracking-wide">
                    CERTIFICATE OF PARTICIPATION
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-xs text-neutral-400 font-mono">THIS IS PROUDLY CONFERRED UPON</div>
                  <div className="text-2xl font-bold text-white font-display">{cert.recipientName}</div>
                  <div className="text-xs text-neutral-300 font-mono pt-1">
                    FOR SUCCESSFUL PARTICIPATION &amp; CONTRIBUTIONS TO:
                  </div>
                  <div className="text-sm font-semibold text-neutral-100">{cert.eventName}</div>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <div>
                    <div>ISSUED: {cert.issuedDate}</div>
                    <div>NUMBER: #{cert.certificateNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{cert.badge}</div>
                    <div className="text-emerald-400">VERIFIED CREDENTIAL</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === 'PROFILE' && (
        <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-900 rounded max-w-2xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-neutral-900">
            <h2 className="text-xl font-bold font-display text-white">Profile &amp; Credentials</h2>
            <p className="text-xs text-neutral-400 font-mono">
              Update your research credentials and community information.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-400">FULL NAME</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                onBlur={(e) => orbinexStore.updateUserProfile({ name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">PROFESSION / COURSE</label>
              <input
                type="text"
                defaultValue={currentUser.profession || ''}
                onBlur={(e) => orbinexStore.updateUserProfile({ profession: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">COLLEGE / INSTITUTION</label>
              <input
                type="text"
                defaultValue={currentUser.collegeOrOrg || ''}
                onBlur={(e) => orbinexStore.updateUserProfile({ collegeOrOrg: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">LOCATION</label>
              <input
                type="text"
                defaultValue={currentUser.location || ''}
                onBlur={(e) => orbinexStore.updateUserProfile({ location: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="pt-2 text-[11px] text-neutral-500">
              Changes are automatically saved to your profile state.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
