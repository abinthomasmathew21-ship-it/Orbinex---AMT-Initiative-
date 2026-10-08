import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { SatelliteTrackerPage } from './pages/SatelliteTrackerPage';
import { LiveSpacePage } from './pages/LiveSpacePage';
import { SpaceResearchPage } from './pages/SpaceResearchPage';
import { SpaceUpdatesPage } from './pages/SpaceUpdatesPage';
import { MissionsPage } from './pages/MissionsPage';
import { EventsPage } from './pages/EventsPage';
import { CommunityPage } from './pages/CommunityPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPages } from './pages/AuthPages';
import { UserPortalPage } from './pages/UserPortalPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { HelpChatbot } from './components/common/HelpChatbot';
import { orbinexStore } from './data/store';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [, setTick] = useState(0);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = orbinexStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    orbinexStore.setCurrentUser(null);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Top Bar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        currentUser={orbinexStore.currentUser}
        unreadNotifsCount={orbinexStore.notifications.filter((n) => !n.read).length}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activeTab === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {activeTab === 'team' && <TeamPage onNavigate={handleNavigate} />}
        {activeTab === 'satellites' && <SatelliteTrackerPage />}
        {activeTab === 'live-space' && <LiveSpacePage />}
        {activeTab === 'research' && <SpaceResearchPage />}
        {activeTab === 'updates' && <SpaceUpdatesPage />}
        {activeTab === 'missions' && <MissionsPage onNavigate={handleNavigate} />}
        {activeTab === 'events' && <EventsPage onNavigate={handleNavigate} />}
        {activeTab === 'community' && <CommunityPage onNavigate={handleNavigate} />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'login' && (
          <AuthPages
            initialMode="LOGIN"
            onSuccess={(role) => setActiveTab(role.includes('ADMIN') ? 'admin-portal' : 'user-portal')}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'register' && (
          <AuthPages
            initialMode="REGISTER"
            onSuccess={() => setActiveTab('user-portal')}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'user-portal' && (
          <UserPortalPage onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        {activeTab === 'admin-portal' && (
          <AdminPortalPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Integrated ORBINEX Help Assistant */}
      <HelpChatbot onNavigate={handleNavigate} />
    </div>
  );
}
