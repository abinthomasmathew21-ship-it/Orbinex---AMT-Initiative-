import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { orbinexStore } from '../data/store';
import { PlatformEvent } from '../types';

interface EventsPageProps {
  onNavigate: (page: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [selectedEvent, setSelectedEvent] = useState<PlatformEvent | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ id: string; text: string } | null>(null);

  const events = orbinexStore.events;
  const currentUser = orbinexStore.currentUser;

  const handleRegister = (event: PlatformEvent) => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }

    const res = orbinexStore.registerForEvent(event.id);
    setFeedbackMsg({ id: event.id, text: res.message });
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const isUserRegistered = (eventId: string) => {
    if (!currentUser) return false;
    return orbinexStore.registrations.some(
      (r) => r.eventId === eventId && r.userId === currentUser.id
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          COMMUNITY SYMPOSIA // WORKSHOPS &amp; MISSIONS
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          Space Events &amp; Symposia
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          From hands-on satellite tracking workshops to global orbital hackathons and launch symposia. Reserve your seat and receive verified digital certificates of completion.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => {
          const registered = isUserRegistered(event.id);
          const percentFilled = Math.min(100, Math.round((event.registeredCount / event.totalSeats) * 100));

          return (
            <div
              key={event.id}
              className="p-6 sm:p-8 bg-neutral-950 border border-neutral-900 rounded space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-white font-medium">
                    {event.category}
                  </span>
                  <span className="text-neutral-500 font-medium">{event.mode}</span>
                </div>

                <h2
                  onClick={() => setSelectedEvent(event)}
                  className="text-xl sm:text-2xl font-bold text-white font-display hover:text-neutral-300 transition-colors cursor-pointer leading-snug"
                >
                  {event.name}
                </h2>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {event.description}
                </p>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span className="truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300 col-span-2">
                    <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Seat Capacity Bar */}
                <div className="space-y-1.5 pt-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>CAPACITY:</span>
                    <span className="tabular-nums">
                      {event.registeredCount} / {event.totalSeats} seats ({percentFilled}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${percentFilled}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-900 space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleRegister(event)}
                    disabled={registered || event.registeredCount >= event.totalSeats}
                    className={`flex-1 py-2.5 rounded font-mono text-xs font-semibold transition-colors cursor-pointer ${
                      registered
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                        : event.registeredCount >= event.totalSeats
                        ? 'bg-neutral-900 text-neutral-500 cursor-not-allowed'
                        : 'bg-white hover:bg-neutral-200 text-black'
                    }`}
                  >
                    {registered ? 'SEAT CONFIRMED' : event.registeredCount >= event.totalSeats ? 'EVENT FULL' : 'RESERVE SEAT'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded font-mono text-xs text-neutral-300 transition-colors"
                  >
                    DETAILS
                  </button>
                </div>

                {feedbackMsg && feedbackMsg.id === event.id && (
                  <div className="text-[11px] font-mono text-emerald-400 text-center animate-fadeIn">
                    {feedbackMsg.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Comprehensive Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-900">
              <div className="space-y-1">
                <div className="text-xs font-mono text-neutral-500 uppercase">{selectedEvent.category} · {selectedEvent.mode}</div>
                <h3 className="text-2xl font-bold font-display text-white">{selectedEvent.name}</h3>
                <div className="text-xs font-mono text-neutral-400">ORGANIZED BY: {selectedEvent.organizer}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-neutral-500 uppercase">OVERVIEW</div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">{selectedEvent.description}</p>
            </div>

            {/* Speakers */}
            {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-neutral-500 uppercase">CONFIRMED SPEAKERS &amp; FACILITATORS</div>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-white">
                  {selectedEvent.speakers.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-neutral-500 uppercase">SESSION SCHEDULE</div>
                <div className="space-y-1.5 font-mono text-xs">
                  {selectedEvent.schedule.map((item, idx) => (
                    <div key={idx} className="p-2 bg-neutral-900/50 border border-neutral-800 rounded flex gap-3">
                      <span className="text-neutral-400 shrink-0">{item.time}</span>
                      <span className="text-white">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules & Guidelines */}
            {selectedEvent.rules && selectedEvent.rules.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-neutral-500 uppercase">PARTICIPATION GUIDELINES</div>
                <ul className="space-y-1 text-xs text-neutral-400 font-mono list-disc list-inside">
                  {selectedEvent.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  handleRegister(selectedEvent);
                }}
                disabled={isUserRegistered(selectedEvent.id) || selectedEvent.registeredCount >= selectedEvent.totalSeats}
                className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-semibold rounded transition-colors"
              >
                {isUserRegistered(selectedEvent.id) ? 'ALREADY REGISTERED' : 'CONFIRM REGISTRATION'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs rounded border border-neutral-800"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
