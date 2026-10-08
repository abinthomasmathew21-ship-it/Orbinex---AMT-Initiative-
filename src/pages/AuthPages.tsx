import React, { useState } from 'react';
import { UserRole } from '../types';
import { orbinexStore } from '../data/store';
import { Shield, User as UserIcon, Lock, Mail, ArrowRight, Check } from 'lucide-react';

interface AuthPagesProps {
  initialMode?: 'LOGIN' | 'REGISTER';
  onSuccess: (role: UserRole) => void;
  onNavigate: (page: string) => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  initialMode = 'LOGIN',
  onSuccess,
  onNavigate,
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeOrOrg, setCollegeOrOrg] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const existing = orbinexStore.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (existing) {
      orbinexStore.setCurrentUser(existing);
      onSuccess(existing.role);
    } else {
      // Mock login fallback if testing with custom email
      const newUser = orbinexStore.registerUser({
        name: email.split('@')[0],
        email: email.trim(),
        role: 'USER',
        profession: 'Space Enthusiast',
      });
      onSuccess(newUser.role);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setError('Please provide full name and email.');
      return;
    }

    const newUser = orbinexStore.registerUser({
      name: fullName,
      email: email.trim(),
      role: 'USER',
      phone,
      collegeOrOrg,
      profession,
      location,
      interests: interests.split(',').map((s) => s.trim()).filter(Boolean),
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      linkedin,
      github,
    });

    onSuccess(newUser.role);
  };

  const quickSwitch = (userId: string) => {
    orbinexStore.loginAs(userId);
    const u = orbinexStore.users.find((user) => user.id === userId);
    if (u) {
      onSuccess(u.role);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          SECURITY ACCESS PROTOCOL // AMT GATEWAY
        </div>
        <h1 className="text-3xl font-bold font-display text-white">
          {mode === 'LOGIN' ? 'Sign In to ORBINEX' : 'Register Member Account'}
        </h1>
        <p className="text-xs text-neutral-400 font-mono">
          {mode === 'LOGIN'
            ? 'Access your orbital dashboard, saved papers, and certificates.'
            : 'Join the global community of space researchers and satellite trackers.'}
        </p>
      </div>

      {/* Quick Demo Switcher Card for Instant Testing */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 rounded space-y-2 font-mono text-xs">
        <div className="text-[10px] text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-neutral-400" />
          <span>FAST ROLE SWITCHER (DEVELOPER / EVALUATION PREVIEW)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => quickSwitch('user-abin')}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded text-left transition-colors cursor-pointer"
          >
            <div className="text-white font-semibold truncate">Abin Mathew Thomas</div>
            <div className="text-[10px] text-emerald-400">SUPER ADMIN / CEO</div>
          </button>

          <button
            type="button"
            onClick={() => quickSwitch('user-anjana')}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded text-left transition-colors cursor-pointer"
          >
            <div className="text-white font-semibold truncate">Anjana Koshal</div>
            <div className="text-[10px] text-neutral-300">ADMIN / CO-FOUNDER</div>
          </button>

          <button
            type="button"
            onClick={() => quickSwitch('user-member-1')}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded text-left transition-colors cursor-pointer"
          >
            <div className="text-white font-semibold truncate">Aarav Sharma</div>
            <div className="text-[10px] text-neutral-400">RESEARCH MEMBER</div>
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-900 rounded space-y-6">
        {error && (
          <div className="p-3 bg-red-950/50 border border-red-900 text-red-300 text-xs font-mono rounded">
            {error}
          </div>
        )}

        {mode === 'LOGIN' ? (
          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-400">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abinthomasmathew21@gmail.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-semibold rounded text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>AUTHENTICATE &amp; ENTER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-400">FULL NAME *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Abin Mathew Thomas"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-neutral-400">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@domain.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">PHONE NUMBER</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">PASSWORD *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a secure password"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-neutral-400">COLLEGE / ORGANIZATION</label>
                <input
                  type="text"
                  value={collegeOrOrg}
                  onChange={(e) => setCollegeOrOrg(e.target.value)}
                  placeholder="e.g. National Institute of Tech"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">PROFESSION / COURSE</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="e.g. Aerospace Engineering"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">LOCATION</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">INTERESTS (COMMA SEPARATED)</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Satellite Tracking, CubeSats, SDR, Astrophysics"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-400">TECHNICAL SKILLS (COMMA SEPARATED)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Python, C++, SGP4, GNU Radio, MATLAB"
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-semibold rounded text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CREATE ACCOUNT &amp; JOIN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Toggle Mode */}
        <div className="pt-4 border-t border-neutral-900 text-center text-xs font-mono text-neutral-500">
          {mode === 'LOGIN' ? (
            <div>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('REGISTER')}
                className="text-white underline hover:no-underline font-medium"
              >
                Register Now
              </button>
            </div>
          ) : (
            <div>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('LOGIN')}
                className="text-white underline hover:no-underline font-medium"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
