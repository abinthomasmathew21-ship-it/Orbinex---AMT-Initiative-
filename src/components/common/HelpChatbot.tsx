import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { orbinexStore } from '../../data/store';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: { label: string; page: string };
}

interface HelpChatbotProps {
  onNavigate: (page: string) => void;
}

export const HelpChatbot: React.FC<HelpChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Greetings. I am the ORBINEX Orbital Knowledge Assistant. How may I assist you with space research, satellite tracking, events, or community initiatives under the AMT Initiative?',
      timestamp: 'Now',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'When is the official launch?',
    'Who are the founders of ORBINEX?',
    'How do I track satellites?',
    'What upcoming events can I register for?',
    'What is the AMT Initiative?',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateAnswer = (query: string): { text: string; action?: { label: string; page: string } } => {
    const q = query.toLowerCase();

    if (q.includes('launch') || q.includes('when')) {
      return {
        text: 'ORBINEX officially launches on 14 October 2026. The Inaugural Space Technology Symposium is taking place on the same date with keynotes from Founder & CEO Abin Mathew Thomas and Co-Founder Anjana Koshal.',
        action: { label: 'View Launch & Events', page: 'events' },
      };
    }

    if (q.includes('founder') || q.includes('ceo') || q.includes('abin') || q.includes('anjana') || q.includes('team')) {
      return {
        text: 'ORBINEX was founded by Abin Mathew Thomas (Founder & CEO, systems architect and aerospace technologist) and Anjana Koshal (Co-Founder, planetary science and observational astronomy lead) under the AMT Initiative.',
        action: { label: 'Explore Core Team', page: 'team' },
      };
    }

    if (q.includes('satellite') || q.includes('track') || q.includes('iss') || q.includes('norad')) {
      const satCount = orbinexStore.satellites.length;
      return {
        text: `ORBINEX features an interactive 3D Satellite Tracker propagating ${satCount} active space assets including the International Space Station (NORAD #25544), Tiangong Space Station, Hubble Space Telescope, Landsat 9, and the community ORBINEX CubeSat-1.`,
        action: { label: 'Open Satellite Tracker', page: 'satellites' },
      };
    }

    if (q.includes('event') || q.includes('workshop') || q.includes('hackathon') || q.includes('register')) {
      const upcoming = orbinexStore.events[0];
      return {
        text: `The premier upcoming event is the "${upcoming.name}" on ${upcoming.date} (${upcoming.mode}). Currently ${upcoming.registeredCount} out of ${upcoming.totalSeats} seats are reserved. Registration is open on the platform.`,
        action: { label: 'Browse Events & Register', page: 'events' },
      };
    }

    if (q.includes('amt') || q.includes('initiative') || q.includes('about') || q.includes('what is')) {
      return {
        text: 'ORBINEX is a technology and space-focused community initiative operating under the AMT Initiative. It combines space research, satellite tracking, astronomy, CubeSat mission design, and open scientific data resources for researchers and students.',
        action: { label: 'Read About ORBINEX', page: 'about' },
      };
    }

    if (q.includes('research') || q.includes('paper') || q.includes('article') || q.includes('study')) {
      return {
        text: 'ORBINEX publishes peer-reviewed research papers covering Decentralized Ground Station Arrays, Exoplanet Atmospheric Transit Spectroscopy, Reinforcement Learning for Swarm Satellites, and Lunar ISRU sintering kinetics.',
        action: { label: 'View Research Portal', page: 'research' },
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      return {
        text: 'You can submit inquiries directly through the Contact page or reach the directorate at abinthomasmathew21@gmail.com. Inquiries are monitored by the administrative desk.',
        action: { label: 'Go to Contact Form', page: 'contact' },
      };
    }

    if (q.includes('community') || q.includes('member') || q.includes('join')) {
      return {
        text: 'The ORBINEX Community brings together engineers, astronomers, students, and researchers. Registered members can collaborate on open satellite ground stations, participate in hackathons, and earn verified certificates.',
        action: { label: 'Join Community', page: 'community' },
      };
    }

    return {
      text: 'I can assist with queries regarding the ORBINEX launch (14 Oct 2026), Founders Abin Mathew Thomas & Anjana Koshal, Satellite Tracking, Research Papers, Events Registration, and Community participation.',
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };

    const reply = generateAnswer(query);
    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'assistant',
      text: reply.text,
      timestamp: 'Now',
      suggestedAction: reply.action,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: 'Conversation cleared. How can I help you today regarding ORBINEX?',
        timestamp: 'Now',
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open ORBINEX Help Assistant"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 bg-white text-black hover:bg-neutral-200 rounded-full shadow-2xl transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Chatbot Overlay Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-40 w-[92vw] sm:w-[380px] max-h-[560px] h-[520px] bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="text-xs font-mono font-bold tracking-wider text-white">ORBINEX ASSISTANT</div>
                <div className="text-[10px] text-neutral-400 font-mono">KNOWLEDGE BASE & GUIDANCE</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearChat}
                title="Clear conversation"
                className="text-neutral-400 hover:text-white p-1 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded px-3 py-2 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-neutral-100 text-black font-medium'
                      : 'bg-neutral-900 text-neutral-200 border border-neutral-800'
                  }`}
                >
                  {m.text}
                </div>

                {m.suggestedAction && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(m.suggestedAction!.page);
                      setIsOpen(false);
                    }}
                    className="mt-1.5 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
                  >
                    <span>{m.suggestedAction.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-neutral-900/50 border-t border-neutral-800/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2 py-1 text-[10px] font-mono text-neutral-400 bg-neutral-900 hover:text-white hover:bg-neutral-800 border border-neutral-800 rounded transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ORBINEX, launch date, satellites..."
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 font-mono"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-3 py-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-30 rounded text-xs font-mono transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
