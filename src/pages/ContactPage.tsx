import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Phone, Globe } from 'lucide-react';
import { orbinexStore } from '../data/store';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    orbinexStore.submitContactMessage({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          COMMUNICATIONS // AMT INITIATIVE DESK
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          Contact ORBINEX
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Submit official partnership inquiries, academic chapter proposals, research submissions, or direct questions to the Directorate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-neutral-950 border border-neutral-900 rounded space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-display text-white">Direct Message Transmission</h2>
            <p className="text-xs text-neutral-400 font-mono">
              Inquiries are logged securely to the administrative inbox.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-neutral-900/60 border border-emerald-500/30 rounded text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-semibold text-white font-mono">TRANSMISSION CONFIRMED</div>
              <p className="text-xs text-neutral-400">
                Your message has been received by the ORBINEX Directorate. We will respond to your specified email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-400">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abin Mathew Thomas"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-400">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@space.org"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">SUBJECT / PURPOSE</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Ground Station Node Integration / Research Proposal"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">TRANSMISSION MESSAGE *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide detailed description of your proposal, research paper, or inquiry..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </form>
          )}
        </div>

        {/* Directorate Contact Points */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-4">
            <h3 className="text-base font-semibold text-white font-display">Administrative Directorate</h3>
            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-neutral-500">EXECUTIVE DESK</div>
                  <div className="text-white">abinthomasmathew21@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-neutral-500">INITIATIVE PORTAL</div>
                  <div className="text-white">orbinex.space</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-neutral-500">GROUND STATION LABS</div>
                  <div className="text-neutral-400">
                    AMT Space Technologies Facility, Kerala, India
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-2 font-mono text-xs">
            <div className="text-neutral-500 text-[10px]">OFFICIAL LAUNCH PROTOCOL</div>
            <div className="text-white font-semibold">14 OCTOBER 2026</div>
            <p className="text-neutral-400 text-[11px] leading-relaxed pt-1">
              Symposium registrations and collegiate observatory affiliations are processed within 24 hours of submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
