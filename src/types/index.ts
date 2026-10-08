export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  collegeOrOrg?: string;
  profession?: string;
  location?: string;
  interests?: string[];
  skills?: string[];
  linkedin?: string;
  github?: string;
  avatarUrl?: string;
  joinedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  biography: string;
  skills: string[];
  avatarUrl: string;
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  isExecutive?: boolean;
}

export interface Satellite {
  id: string;
  name: string;
  noradId: number;
  category: 'Space Station' | 'Earth Observation' | 'Astrophysics' | 'Navigation' | 'Communication' | 'Deep Space';
  orbitType: 'LEO' | 'MEO' | 'GEO' | 'Lagrange L2';
  altitudeKm: number;
  velocityKmh: number;
  periodMinutes: number;
  inclinationDeg: number;
  latitude: number;
  longitude: number;
  lastUpdated: string;
  status: 'OPERATIONAL' | 'NOMINAL' | 'DECAYING' | 'EXTENDED_MISSION';
  launchDate: string;
  operator: string;
  description: string;
  tleLine1: string;
  tleLine2: string;
}

export interface SpaceUpdate {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  category: 'Space Missions' | 'Satellite Launches' | 'Astronomy' | 'NASA' | 'ESA' | 'ISRO' | 'SpaceX' | 'Research' | 'Discoveries' | 'Space Technology';
  publishedDate: string;
  source: string;
  sourceUrl?: string;
  author: string;
  imageUrl?: string;
  readTime: string;
}

export interface ResearchArticle {
  id: string;
  title: string;
  category: 'Space Science' | 'Satellite Technology' | 'Astronomy' | 'Planetary Science' | 'AI + Space' | 'Robotics + Space' | 'Future Technologies';
  author: string;
  authorAffiliation: string;
  date: string;
  summary: string;
  fullAbstract: string;
  doi?: string;
  downloadsCount: number;
  tags: string[];
}

export interface Mission {
  id: string;
  name: string;
  codename: string;
  objective: string;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED' | 'DESIGN_PHASE';
  launchTarget: string;
  orbit: string;
  lead: string;
  description: string;
  milestones: { title: string; date: string; completed: boolean }[];
}

export interface PlatformEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  mode: 'VIRTUAL' | 'HYBRID' | 'ON_SITE';
  description: string;
  organizer: string;
  speakers: string[];
  totalSeats: number;
  registeredCount: number;
  registrationOpen: boolean;
  registrationDeadline: string;
  category: 'Workshop' | 'Space Talk' | 'Hackathon' | 'Competition' | 'Webinar' | 'Astronomy Night' | 'Meetup';
  rules?: string[];
  schedule?: { time: string; activity: string }[];
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  registeredAt: string;
  attendanceMarked: boolean;
}

export interface Certificate {
  id: string;
  userId: string;
  recipientName: string;
  eventName: string;
  issuedDate: string;
  certificateNumber: string;
  issuer: string;
  badge: string;
}

export interface NotificationItem {
  id: string;
  userId?: string; // null for broadcast
  title: string;
  message: string;
  timestamp: string;
  type: 'EVENT' | 'RESEARCH' | 'ANNOUNCEMENT' | 'SYSTEM';
  read: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

export interface SiteSettings {
  launchDate: string; // e.g. "2026-10-14T00:00:00.000Z"
  isLiveForced?: boolean;
  announcementText: string;
  announcementActive: boolean;
  allowRegistrations: boolean;
}
