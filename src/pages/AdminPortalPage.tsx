import React, { useState } from 'react';
import {
  Shield,
  Users,
  Calendar,
  Radio,
  FileText,
  Compass,
  Bell,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Send,
  BarChart2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { orbinexStore } from '../data/store';
import { TeamMember, PlatformEvent, Satellite, SpaceUpdate, ResearchArticle, Mission, User } from '../types';

interface AdminPortalPageProps {
  onNavigate: (page: string) => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<
    | 'DASHBOARD'
    | 'TEAM'
    | 'EVENTS'
    | 'SATELLITES'
    | 'RESEARCH'
    | 'UPDATES'
    | 'MISSIONS'
    | 'MEMBERS'
    | 'NOTIFICATIONS'
    | 'MESSAGES'
    | 'SETTINGS'
  >('DASHBOARD');

  const [notificationBroadcast, setNotificationBroadcast] = useState({ title: '', message: '' });
  const [announcementDraft, setAnnouncementDraft] = useState(orbinexStore.settings.announcementText);
  const [launchDateDraft, setLaunchDateDraft] = useState(orbinexStore.settings.launchDate);

  // Modals for adding entities
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    department: '',
    biography: '',
    skills: '',
    order: 10,
  });

  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '2026-11-15',
    time: '18:00 UTC',
    location: 'Virtual Broadcast',
    mode: 'VIRTUAL' as const,
    description: '',
    organizer: 'ORBINEX Operations',
    totalSeats: 300,
    category: 'Space Talk' as const,
    registrationDeadline: '2026-11-14T23:59:00Z',
    registrationOpen: true,
  });

  const [showAddSatellite, setShowAddSatellite] = useState(false);
  const [newSatellite, setNewSatellite] = useState({
    name: '',
    noradId: 60000,
    category: 'Earth Observation' as const,
    orbitType: 'LEO' as const,
    altitudeKm: 500,
    velocityKmh: 27500,
    periodMinutes: 94.5,
    inclinationDeg: 97.5,
    latitude: 0,
    longitude: 0,
    lastUpdated: 'Live Feed',
    status: 'OPERATIONAL' as const,
    launchDate: '2026-10-14',
    operator: 'AMT Initiative',
    description: '',
    tleLine1: '1 60000U 26001A   26281.00000000  .00001000  00000-0  10000-3 0  9999',
    tleLine2: '2 60000  97.5000 120.0000 0001000  45.0000 315.0000 15.20000000  100',
  });

  const currentUser = orbinexStore.currentUser;
  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';

  if (!isSuperAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4 font-mono text-xs">
        <Shield className="w-10 h-10 text-neutral-500 mx-auto" />
        <h2 className="text-xl font-bold font-display text-white">Access Prohibited</h2>
        <p className="text-neutral-400">
          This portal requires Administrator or Super Administrator credentials under the AMT Initiative.
        </p>
        <button
          onClick={() => onNavigate('login')}
          className="px-4 py-2 bg-white text-black font-semibold rounded"
        >
          SIGN IN AS ADMINISTRATOR
        </button>
      </div>
    );
  }

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationBroadcast.title || !notificationBroadcast.message) return;
    orbinexStore.addNotification({
      title: notificationBroadcast.title,
      message: notificationBroadcast.message,
      type: 'ANNOUNCEMENT',
    });
    setNotificationBroadcast({ title: '', message: '' });
    alert('System announcement dispatched to all members.');
  };

  const handleSaveSettings = () => {
    orbinexStore.updateSettings({
      announcementText: announcementDraft,
      launchDate: launchDateDraft,
    });
    alert('Site settings updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-900 gap-4">
        <div>
          <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>EXECUTIVE DIRECTORATE // AMT INITIATIVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            ORBINEX Administration Portal
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-neutral-400">
            ADMIN: <span className="text-white font-semibold">{currentUser.name}</span>
          </span>
          <button
            onClick={() => onNavigate('home')}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded border border-neutral-800"
          >
            PUBLIC SITE →
          </button>
        </div>
      </div>

      {/* Main Admin Navigation Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-mono no-scrollbar">
        {[
          { id: 'DASHBOARD', label: 'Dashboard & Metrics' },
          { id: 'TEAM', label: `Core Team (${orbinexStore.coreTeam.length})` },
          { id: 'EVENTS', label: `Events (${orbinexStore.events.length})` },
          { id: 'SATELLITES', label: `Satellites (${orbinexStore.satellites.length})` },
          { id: 'RESEARCH', label: `Research (${orbinexStore.researchArticles.length})` },
          { id: 'UPDATES', label: `News (${orbinexStore.spaceUpdates.length})` },
          { id: 'MISSIONS', label: `Missions (${orbinexStore.missions.length})` },
          { id: 'MEMBERS', label: `Users (${orbinexStore.users.length})` },
          { id: 'MESSAGES', label: `Inquiries (${orbinexStore.contactMessages.length})` },
          { id: 'NOTIFICATIONS', label: 'Broadcast' },
          { id: 'SETTINGS', label: 'System Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-3 py-2 rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeSection === tab.id
                ? 'bg-white text-black font-semibold'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION: DASHBOARD */}
      {activeSection === 'DASHBOARD' && (
        <div className="space-y-8 font-mono">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">COMMUNITY USERS</div>
              <div className="text-3xl font-bold text-white tabular-nums">{orbinexStore.users.length}</div>
              <div className="text-[10px] text-emerald-400">● 100% Active Directory</div>
            </div>

            <div className="p-5 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">EVENT REGISTRATIONS</div>
              <div className="text-3xl font-bold text-white tabular-nums">
                {orbinexStore.registrations.length + 942}
              </div>
              <div className="text-[10px] text-neutral-400">Launch 14 Oct Symposium</div>
            </div>

            <div className="p-5 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">TRACKED SATELLITES</div>
              <div className="text-3xl font-bold text-white tabular-nums">{orbinexStore.satellites.length}</div>
              <div className="text-[10px] text-emerald-400">● SGP4 Real-time Feed</div>
            </div>

            <div className="p-5 bg-neutral-950 border border-neutral-900 rounded space-y-1">
              <div className="text-[10px] text-neutral-500 uppercase">RESEARCH WHITEPAPERS</div>
              <div className="text-3xl font-bold text-white tabular-nums">{orbinexStore.researchArticles.length}</div>
              <div className="text-[10px] text-neutral-400">Peer Preprints Available</div>
            </div>
          </div>

          {/* Quick Shortcuts & Inquiries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>RECENT CONTACT INQUIRIES</span>
                <button
                  onClick={() => setActiveSection('MESSAGES')}
                  className="text-white underline hover:no-underline"
                >
                  VIEW ALL
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {orbinexStore.contactMessages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className="p-3 bg-neutral-900/60 border border-neutral-800 rounded space-y-1">
                    <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                      <span className="text-white font-medium">{msg.name}</span>
                      <span>{new Date(msg.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-neutral-200 font-semibold">{msg.subject}</div>
                    <p className="text-[11px] text-neutral-400 font-sans line-clamp-1">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-4">
              <div className="text-xs text-neutral-400">SYSTEM HEALTH &amp; TELEMETRY</div>
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">OFFICIAL LAUNCH DATE:</span>
                  <span className="text-white font-semibold">14 OCTOBER 2026</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">GROUND STATION SDR NODES:</span>
                  <span className="text-emerald-400">12 ONLINE / 2 STANDBY</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">CELESTRAK SGP4 EPHEMERIS:</span>
                  <span className="text-white">SYNCHRONIZED (UTC)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-neutral-500">LEADERSHIP DIRECTORATE:</span>
                  <span>Abin Mathew Thomas &amp; Anjana Koshal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: CORE TEAM MANAGEMENT */}
      {activeSection === 'TEAM' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-white">Core Team &amp; Directorate Management</h2>
              <p className="text-xs font-mono text-neutral-400">
                Manage executive founders Abin Mathew Thomas &amp; Anjana Koshal, and technical department leads.
              </p>
            </div>
            <button
              onClick={() => setShowAddMember(true)}
              className="px-3 py-2 bg-white text-black font-mono text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD TEAM MEMBER</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {orbinexStore.coreTeam.map((m) => (
              <div
                key={m.id}
                className="p-4 bg-neutral-950 border border-neutral-800 rounded flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0 flex items-center justify-center">
                    {m.avatarUrl ? (
                      <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover filter grayscale" />
                    ) : (
                      m.name.slice(0, 2)
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{m.name}</span>
                      {m.isExecutive && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-white">
                          EXECUTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-neutral-400">{m.position} · {m.department}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <span className="text-[11px] text-neutral-500 mr-2">ORDER #{m.order}</span>
                  {!m.isExecutive && (
                    <button
                      onClick={() => orbinexStore.deleteTeamMember(m.id)}
                      className="p-2 text-neutral-500 hover:text-red-400 rounded"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Team Member Modal */}
          {showAddMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                  <h3 className="text-base font-bold text-white font-display">Add Core Team Member</h3>
                  <button onClick={() => setShowAddMember(false)} className="text-neutral-500 hover:text-white">✕</button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-neutral-500">NAME</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="e.g. Dr. K. Radhakrishnan"
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500">POSITION</label>
                    <input
                      type="text"
                      value={newMember.position}
                      onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                      placeholder="e.g. Astrophotography Lead"
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500">DEPARTMENT</label>
                    <input
                      type="text"
                      value={newMember.department}
                      onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                      placeholder="e.g. Observational Astronomy"
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500">BIOGRAPHY</label>
                    <textarea
                      rows={3}
                      value={newMember.biography}
                      onChange={(e) => setNewMember({ ...newMember, biography: e.target.value })}
                      placeholder="Brief research background..."
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1 font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500">SKILLS (COMMA SEPARATED)</label>
                    <input
                      type="text"
                      value={newMember.skills}
                      onChange={(e) => setNewMember({ ...newMember, skills: e.target.value })}
                      placeholder="Spectroscopy, Telescope Alignment, Astropy"
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-neutral-900">
                  <button onClick={() => setShowAddMember(false)} className="px-3 py-2 bg-neutral-900 text-neutral-400 rounded">
                    CANCEL
                  </button>
                  <button
                    onClick={() => {
                      if (!newMember.name || !newMember.position) return;
                      orbinexStore.addTeamMember({
                        name: newMember.name,
                        position: newMember.position,
                        department: newMember.department,
                        biography: newMember.biography,
                        skills: newMember.skills.split(',').map((s) => s.trim()).filter(Boolean),
                        avatarUrl: '',
                        order: newMember.order,
                        status: 'ACTIVE',
                      });
                      setShowAddMember(false);
                      setNewMember({ name: '', position: '', department: '', biography: '', skills: '', order: 10 });
                    }}
                    className="px-4 py-2 bg-white text-black font-semibold rounded"
                  >
                    CONFIRM &amp; ADD
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION: EVENTS MANAGEMENT */}
      {activeSection === 'EVENTS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-white">Event Organizing System</h2>
              <p className="text-xs font-mono text-neutral-400">
                Publish workshops, hackathons, and symposiums with seat constraints.
              </p>
            </div>
            <button
              onClick={() => setShowAddEvent(true)}
              className="px-3 py-2 bg-white text-black font-mono text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>CREATE EVENT</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {orbinexStore.events.map((e) => (
              <div key={e.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{e.name}</span>
                    <span className="text-[10px] text-neutral-400">{e.category}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    DATE: {e.date} · {e.mode} · SEATS: {e.registeredCount} / {e.totalSeats}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => orbinexStore.deleteEvent(e.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 rounded"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Event Modal */}
          {showAddEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                  <h3 className="text-base font-bold text-white font-display">Create Space Event</h3>
                  <button onClick={() => setShowAddEvent(false)} className="text-neutral-500 hover:text-white">✕</button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-neutral-500">EVENT NAME</label>
                    <input
                      type="text"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      placeholder="e.g. CubeSat Avionics Bootcamp"
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-neutral-500">DATE</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-500">TOTAL SEATS</label>
                      <input
                        type="number"
                        value={newEvent.totalSeats}
                        onChange={(e) => setNewEvent({ ...newEvent, totalSeats: Number(e.target.value) })}
                        className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-neutral-500">DESCRIPTION</label>
                    <textarea
                      rows={3}
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Overview of the workshop or symposium..."
                      className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white mt-1 font-sans"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-neutral-900">
                  <button onClick={() => setShowAddEvent(false)} className="px-3 py-2 bg-neutral-900 text-neutral-400 rounded">
                    CANCEL
                  </button>
                  <button
                    onClick={() => {
                      if (!newEvent.name) return;
                      orbinexStore.addEvent({
                        ...newEvent,
                        speakers: ['ORBINEX Core Directorate'],
                      });
                      setShowAddEvent(false);
                      setNewEvent({ ...newEvent, name: '', description: '' });
                    }}
                    className="px-4 py-2 bg-white text-black font-semibold rounded"
                  >
                    PUBLISH EVENT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION: SATELLITES */}
      {activeSection === 'SATELLITES' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-white">Satellite Catalog &amp; Ephemeris</h2>
              <p className="text-xs font-mono text-neutral-400">
                Manage orbital data propagated across the 3D Satellite Tracker.
              </p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {orbinexStore.satellites.map((s) => (
              <div key={s.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{s.name}</div>
                  <div className="text-[11px] text-neutral-400">
                    NORAD #{s.noradId} · {s.category} · Alt: {s.altitudeKm} km · Vel: {s.velocityKmh} km/h
                  </div>
                </div>
                <button
                  onClick={() => orbinexStore.deleteSatellite(s.id)}
                  className="p-2 text-neutral-500 hover:text-red-400 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: NOTIFICATIONS BROADCAST */}
      {activeSection === 'NOTIFICATIONS' && (
        <div className="p-6 bg-neutral-950 border border-neutral-900 rounded max-w-xl space-y-4 font-mono text-xs">
          <h2 className="text-lg font-bold font-display text-white">Platform Broadcast Notification</h2>
          <p className="text-neutral-400">
            Dispatch announcements directly to all member consoles and the global alert bar.
          </p>

          <form onSubmit={handleBroadcast} className="space-y-3">
            <div>
              <label className="text-neutral-500">HEADLINE</label>
              <input
                type="text"
                required
                value={notificationBroadcast.title}
                onChange={(e) => setNotificationBroadcast({ ...notificationBroadcast, title: e.target.value })}
                placeholder="e.g. Ground Station Lock Achieved"
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
              />
            </div>

            <div>
              <label className="text-neutral-500">MESSAGE BODY</label>
              <textarea
                required
                rows={4}
                value={notificationBroadcast.message}
                onChange={(e) => setNotificationBroadcast({ ...notificationBroadcast, message: e.target.value })}
                placeholder="Details of the announcement..."
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded text-white mt-1 font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DISPATCH BROADCAST</span>
            </button>
          </form>
        </div>
      )}

      {/* SECTION: MESSAGES */}
      {activeSection === 'MESSAGES' && (
        <div className="space-y-4 font-mono text-xs">
          <h2 className="text-lg font-bold font-display text-white">Inbound Contact Inquiries</h2>
          <div className="space-y-3">
            {orbinexStore.contactMessages.map((msg) => (
              <div key={msg.id} className="p-5 bg-neutral-950 border border-neutral-800 rounded space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                  <span className="text-white font-semibold text-xs">{msg.name} ({msg.email})</span>
                  <span>{new Date(msg.submittedAt).toLocaleString()}</span>
                </div>
                <div className="text-white font-medium">{msg.subject}</div>
                <p className="text-neutral-300 font-sans leading-relaxed text-xs">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: SETTINGS */}
      {activeSection === 'SETTINGS' && (
        <div className="p-6 bg-neutral-950 border border-neutral-900 rounded max-w-xl space-y-6 font-mono text-xs">
          <h2 className="text-lg font-bold font-display text-white">System &amp; Launch Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="text-neutral-400">OFFICIAL LAUNCH TIMESTAMP (ISO STRING)</label>
              <input
                type="text"
                value={launchDateDraft}
                onChange={(e) => setLaunchDateDraft(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
              />
              <span className="text-[10px] text-neutral-500">Default: 2026-10-14T00:00:00.000Z</span>
            </div>

            <div>
              <label className="text-neutral-400">TOP ANNOUNCEMENT BANNER TEXT</label>
              <textarea
                rows={3}
                value={announcementDraft}
                onChange={(e) => setAnnouncementDraft(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded text-white mt-1"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-900/50 border border-neutral-800 rounded">
              <span>FORCE "ORBINEX IS LIVE" STATUS (TESTING)</span>
              <button
                type="button"
                onClick={() =>
                  orbinexStore.updateSettings({ isLiveForced: !orbinexStore.settings.isLiveForced })
                }
                className={`px-3 py-1 rounded text-[11px] font-semibold ${
                  orbinexStore.settings.isLiveForced
                    ? 'bg-emerald-500 text-black'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {orbinexStore.settings.isLiveForced ? 'FORCED LIVE' : 'COUNTDOWN ACTIVE'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveSettings}
              className="w-full py-2.5 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors"
            >
              SAVE SETTINGS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
