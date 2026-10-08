import {
  User,
  TeamMember,
  Satellite,
  SpaceUpdate,
  ResearchArticle,
  Mission,
  PlatformEvent,
  EventRegistration,
  Certificate,
  NotificationItem,
  SiteSettings,
  ContactMessage,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_CORE_TEAM,
  INITIAL_SATELLITES,
  INITIAL_SPACE_UPDATES,
  INITIAL_RESEARCH_ARTICLES,
  INITIAL_MISSIONS,
  INITIAL_EVENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CERTIFICATES,
  INITIAL_USERS,
  INITIAL_CONTACT_MESSAGES,
} from './initialData';

const STORAGE_KEY_PREFIX = 'orbinex_data_';

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export class OrbinexStore {
  settings: SiteSettings;
  currentUser: User | null;
  users: User[];
  coreTeam: TeamMember[];
  satellites: Satellite[];
  spaceUpdates: SpaceUpdate[];
  researchArticles: ResearchArticle[];
  missions: Mission[];
  events: PlatformEvent[];
  registrations: EventRegistration[];
  certificates: Certificate[];
  notifications: NotificationItem[];
  savedArticles: string[]; // ids
  contactMessages: ContactMessage[];

  constructor() {
    this.settings = loadFromStorage('settings', INITIAL_SETTINGS);
    this.users = loadFromStorage('users', INITIAL_USERS);
    this.currentUser = loadFromStorage('currentUser', this.users[0]); // Default to Abin Mathew Thomas (Founder & CEO) for quick exploration
    this.coreTeam = loadFromStorage('coreTeam', INITIAL_CORE_TEAM);
    this.satellites = loadFromStorage('satellites', INITIAL_SATELLITES);
    this.spaceUpdates = loadFromStorage('spaceUpdates', INITIAL_SPACE_UPDATES);
    this.researchArticles = loadFromStorage('researchArticles', INITIAL_RESEARCH_ARTICLES);
    this.missions = loadFromStorage('missions', INITIAL_MISSIONS);
    this.events = loadFromStorage('events', INITIAL_EVENTS);
    this.registrations = loadFromStorage('registrations', [
      {
        id: 'reg-demo-1',
        eventId: 'evt-inaugural',
        userId: 'user-abin',
        userName: 'Abin Mathew Thomas',
        userEmail: 'abinthomasmathew21@gmail.com',
        registeredAt: '2026-09-01T10:00:00.000Z',
        attendanceMarked: false,
      },
    ]);
    this.certificates = loadFromStorage('certificates', INITIAL_CERTIFICATES);
    this.notifications = loadFromStorage('notifications', INITIAL_NOTIFICATIONS);
    this.savedArticles = loadFromStorage('savedArticles', ['res-1', 'res-3']);
    this.contactMessages = loadFromStorage('contactMessages', INITIAL_CONTACT_MESSAGES);
  }

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  // Auth & User switching
  setCurrentUser(user: User | null) {
    this.currentUser = user;
    saveToStorage('currentUser', user);
    notify();
  }

  loginAs(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.setCurrentUser(user);
    }
  }

  registerUser(newUser: Omit<User, 'id' | 'joinedAt' | 'status'>): User {
    const user: User = {
      ...newUser,
      id: `user-${Date.now()}`,
      joinedAt: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
    };
    this.users.unshift(user);
    saveToStorage('users', this.users);
    this.setCurrentUser(user);
    this.addNotification({
      title: 'Welcome to ORBINEX!',
      message: `Your account has been registered successfully. Welcome to the space research collective.`,
      type: 'SYSTEM',
    });
    return user;
  }

  updateUserProfile(updated: Partial<User>) {
    if (!this.currentUser) return;
    this.currentUser = { ...this.currentUser, ...updated };
    this.users = this.users.map((u) => (u.id === this.currentUser?.id ? this.currentUser : u));
    saveToStorage('currentUser', this.currentUser);
    saveToStorage('users', this.users);
    notify();
  }

  // Site Settings
  updateSettings(newSettings: Partial<SiteSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    saveToStorage('settings', this.settings);
    notify();
  }

  // Core Team Management
  addTeamMember(member: Omit<TeamMember, 'id'>) {
    const newMember: TeamMember = {
      ...member,
      id: `team-${Date.now()}`,
    };
    this.coreTeam.push(newMember);
    this.coreTeam.sort((a, b) => a.order - b.order);
    saveToStorage('coreTeam', this.coreTeam);
    notify();
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>) {
    this.coreTeam = this.coreTeam.map((m) => (m.id === id ? { ...m, ...updates } : m));
    this.coreTeam.sort((a, b) => a.order - b.order);
    saveToStorage('coreTeam', this.coreTeam);
    notify();
  }

  deleteTeamMember(id: string) {
    this.coreTeam = this.coreTeam.filter((m) => m.id !== id);
    saveToStorage('coreTeam', this.coreTeam);
    notify();
  }

  // Events Management
  addEvent(event: Omit<PlatformEvent, 'id' | 'registeredCount'>) {
    const newEvent: PlatformEvent = {
      ...event,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
    };
    this.events.unshift(newEvent);
    saveToStorage('events', this.events);
    this.addNotification({
      title: `New Event: ${newEvent.name}`,
      message: `Registration has opened for ${newEvent.name} scheduled for ${newEvent.date}.`,
      type: 'EVENT',
    });
    notify();
  }

  updateEvent(id: string, updates: Partial<PlatformEvent>) {
    this.events = this.events.map((e) => (e.id === id ? { ...e, ...updates } : e));
    saveToStorage('events', this.events);
    notify();
  }

  deleteEvent(id: string) {
    this.events = this.events.filter((e) => e.id !== id);
    this.registrations = this.registrations.filter((r) => r.eventId !== id);
    saveToStorage('events', this.events);
    saveToStorage('registrations', this.registrations);
    notify();
  }

  registerForEvent(eventId: string) {
    if (!this.currentUser) return { success: false, message: 'Please log in first' };
    const event = this.events.find((e) => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found' };
    if (!event.registrationOpen) return { success: false, message: 'Registration is closed' };
    if (event.registeredCount >= event.totalSeats) return { success: false, message: 'Event is fully booked' };

    const alreadyRegistered = this.registrations.some(
      (r) => r.eventId === eventId && r.userId === this.currentUser?.id
    );
    if (alreadyRegistered) return { success: false, message: 'Already registered for this event' };

    const newReg: EventRegistration = {
      id: `reg-${Date.now()}`,
      eventId,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      userEmail: this.currentUser.email,
      registeredAt: new Date().toISOString(),
      attendanceMarked: false,
    };

    this.registrations.push(newReg);
    event.registeredCount += 1;
    saveToStorage('registrations', this.registrations);
    saveToStorage('events', this.events);

    // Auto issue certificate entry on registration for preview
    this.addNotification({
      title: `Registered: ${event.name}`,
      message: `Your seat has been confirmed for ${event.name} on ${event.date}. Access details sent to your registered email.`,
      type: 'EVENT',
    });

    notify();
    return { success: true, message: 'Registration successful!' };
  }

  unregisterForEvent(eventId: string) {
    if (!this.currentUser) return;
    this.registrations = this.registrations.filter(
      (r) => !(r.eventId === eventId && r.userId === this.currentUser?.id)
    );
    const event = this.events.find((e) => e.id === eventId);
    if (event && event.registeredCount > 0) {
      event.registeredCount -= 1;
    }
    saveToStorage('registrations', this.registrations);
    saveToStorage('events', this.events);
    notify();
  }

  // Satellites
  addSatellite(satellite: Omit<Satellite, 'id'>) {
    const newSat: Satellite = {
      ...satellite,
      id: `sat-${Date.now()}`,
    };
    this.satellites.push(newSat);
    saveToStorage('satellites', this.satellites);
    notify();
  }

  updateSatellite(id: string, updates: Partial<Satellite>) {
    this.satellites = this.satellites.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveToStorage('satellites', this.satellites);
    notify();
  }

  deleteSatellite(id: string) {
    this.satellites = this.satellites.filter((s) => s.id !== id);
    saveToStorage('satellites', this.satellites);
    notify();
  }

  // Space Updates
  addSpaceUpdate(update: Omit<SpaceUpdate, 'id'>) {
    const newUpdate: SpaceUpdate = {
      ...update,
      id: `update-${Date.now()}`,
    };
    this.spaceUpdates.unshift(newUpdate);
    saveToStorage('spaceUpdates', this.spaceUpdates);
    this.addNotification({
      title: `Space Dispatch: ${newUpdate.title.slice(0, 40)}...`,
      message: newUpdate.shortDescription,
      type: 'ANNOUNCEMENT',
    });
    notify();
  }

  updateSpaceUpdate(id: string, updates: Partial<SpaceUpdate>) {
    this.spaceUpdates = this.spaceUpdates.map((u) => (u.id === id ? { ...u, ...updates } : u));
    saveToStorage('spaceUpdates', this.spaceUpdates);
    notify();
  }

  deleteSpaceUpdate(id: string) {
    this.spaceUpdates = this.spaceUpdates.filter((u) => u.id !== id);
    saveToStorage('spaceUpdates', this.spaceUpdates);
    notify();
  }

  // Research Articles
  addResearchArticle(article: Omit<ResearchArticle, 'id' | 'downloadsCount'>) {
    const newArt: ResearchArticle = {
      ...article,
      id: `res-${Date.now()}`,
      downloadsCount: 0,
    };
    this.researchArticles.unshift(newArt);
    saveToStorage('researchArticles', this.researchArticles);
    notify();
  }

  updateResearchArticle(id: string, updates: Partial<ResearchArticle>) {
    this.researchArticles = this.researchArticles.map((a) => (a.id === id ? { ...a, ...updates } : a));
    saveToStorage('researchArticles', this.researchArticles);
    notify();
  }

  deleteResearchArticle(id: string) {
    this.researchArticles = this.researchArticles.filter((a) => a.id !== id);
    saveToStorage('researchArticles', this.researchArticles);
    notify();
  }

  toggleSaveArticle(articleId: string) {
    if (this.savedArticles.includes(articleId)) {
      this.savedArticles = this.savedArticles.filter((id) => id !== articleId);
    } else {
      this.savedArticles.push(articleId);
    }
    saveToStorage('savedArticles', this.savedArticles);
    notify();
  }

  incrementDownload(articleId: string) {
    const article = this.researchArticles.find((a) => a.id === articleId);
    if (article) {
      article.downloadsCount += 1;
      saveToStorage('researchArticles', this.researchArticles);
      notify();
    }
  }

  // Missions
  addMission(mission: Omit<Mission, 'id'>) {
    const newMission: Mission = {
      ...mission,
      id: `mis-${Date.now()}`,
    };
    this.missions.push(newMission);
    saveToStorage('missions', this.missions);
    notify();
  }

  toggleMissionMilestone(missionId: string, milestoneIndex: number) {
    const m = this.missions.find((item) => item.id === missionId);
    if (m && m.milestones[milestoneIndex]) {
      m.milestones[milestoneIndex].completed = !m.milestones[milestoneIndex].completed;
      saveToStorage('missions', this.missions);
      notify();
    }
  }

  // Notifications
  addNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    this.notifications.unshift(newNotif);
    saveToStorage('notifications', this.notifications);
    notify();
  }

  markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map((n) => (n.id === id ? { ...n, ...readTrue(n) } : n));
    saveToStorage('notifications', this.notifications);
    notify();
  }

  markAllNotificationsAsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
    saveToStorage('notifications', this.notifications);
    notify();
  }

  // Contact Messages
  submitContactMessage(msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      read: false,
    };
    this.contactMessages.unshift(newMsg);
    saveToStorage('contactMessages', this.contactMessages);
    notify();
  }

  markContactMessageAsRead(id: string) {
    this.contactMessages = this.contactMessages.map((m) => (m.id === id ? { ...m, read: true } : m));
    saveToStorage('contactMessages', this.contactMessages);
    notify();
  }

  // Community member activation
  toggleUserStatus(userId: string) {
    this.users = this.users.map((u) =>
      u.id === userId ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u
    );
    saveToStorage('users', this.users);
    notify();
  }

  updateUserRole(userId: string, role: User['role']) {
    this.users = this.users.map((u) => (u.id === userId ? { ...u, role } : u));
    if (this.currentUser?.id === userId) {
      this.currentUser.role = role;
      saveToStorage('currentUser', this.currentUser);
    }
    saveToStorage('users', this.users);
    notify();
  }
}

function readTrue(n: NotificationItem) {
  return { ...n, read: true };
}

export const orbinexStore = new OrbinexStore();
