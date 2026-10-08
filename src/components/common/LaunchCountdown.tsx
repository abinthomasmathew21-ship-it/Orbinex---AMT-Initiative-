import React, { useState, useEffect } from 'react';

interface LaunchCountdownProps {
  targetDateStr?: string; // default "2026-10-14T00:00:00.000Z"
  isLiveForced?: boolean;
}

export const LaunchCountdown: React.FC<LaunchCountdownProps> = ({
  targetDateStr = '2026-10-14T00:00:00.000Z',
  isLiveForced = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      if (isLiveForced) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isLive: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr, isLiveForced]);

  if (timeLeft.isLive) {
    return (
      <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-900/90 border border-emerald-500/30 rounded font-mono text-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold tracking-widest text-emerald-400">ORBINEX IS LIVE</span>
        <span className="text-neutral-500">|</span>
        <span className="text-neutral-300">GLOBAL OPERATIONS ACTIVE</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <span className="tracking-widest uppercase">OFFICIALLY LAUNCHING · 14 OCTOBER 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
        <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded text-center">
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase mt-0.5">DAYS</div>
        </div>
        <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded text-center">
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase mt-0.5">HOURS</div>
        </div>
        <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded text-center">
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase mt-0.5">MINUTES</div>
        </div>
        <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded text-center">
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase mt-0.5">SECONDS</div>
        </div>
      </div>
    </div>
  );
};
