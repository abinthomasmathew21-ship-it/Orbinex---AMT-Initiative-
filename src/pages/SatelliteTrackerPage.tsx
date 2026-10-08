import React, { useState } from 'react';
import { SatelliteTrackerCanvas } from '../components/three/SatelliteTrackerCanvas';
import { Search, Radio, Compass, Info, Copy, Check, Filter } from 'lucide-react';
import { orbinexStore } from '../data/store';
import { Satellite } from '../types';

export const SatelliteTrackerPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSat, setSelectedSat] = useState<Satellite | null>(orbinexStore.satellites[0]);
  const [copiedTle, setCopiedTle] = useState(false);

  const categories = ['ALL', 'Space Station', 'Earth Observation', 'Astrophysics', 'Communication', 'Deep Space'];

  const filteredSatellites = orbinexStore.satellites.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.noradId.toString().includes(search) ||
      s.operator.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const copyTle = () => {
    if (!selectedSat) return;
    navigator.clipboard.writeText(`${selectedSat.tleLine1}\n${selectedSat.tleLine2}`);
    setCopiedTle(true);
    setTimeout(() => setCopiedTle(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          TELEMETRY // THREE.JS ORBITAL SIMULATOR
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">
          Satellite Orbit Tracker
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Interactive real-time propagation of operational satellites, space stations, and community CubeSats using calibrated SGP4 ephemeris and orbital vectors.
        </p>
      </div>

      {/* 3D Visualizer Canvas */}
      <SatelliteTrackerCanvas
        satellites={filteredSatellites}
        selectedSatellite={selectedSat}
        onSelectSatellite={(sat) => setSelectedSat(sat)}
      />

      {/* Control Strip & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by satellite name, NORAD ID (e.g. 25544, ISS, Hubble)..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Split: Satellite Directory List + Details HUD Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Satellite Cards Directory */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 px-1">
            <span>PROPAGATED ASSETS ({filteredSatellites.length})</span>
            <span>CLICK TO FOCUS</span>
          </div>

          <div className="space-y-2">
            {filteredSatellites.map((sat) => {
              const isSelected = selectedSat?.id === sat.id;
              return (
                <div
                  key={sat.id}
                  onClick={() => setSelectedSat(sat)}
                  className={`p-4 rounded border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-neutral-900 border-white'
                      : 'bg-neutral-950 border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold font-mono text-white">{sat.name}</span>
                      <span className="text-[10px] font-mono text-neutral-400">NORAD #{sat.noradId}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                      <span>{sat.category}</span>
                      <span>·</span>
                      <span>{sat.orbitType}</span>
                      <span>·</span>
                      <span className="text-neutral-300 tabular-nums">{sat.altitudeKm.toFixed(0)} km</span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs text-white tabular-nums">{sat.velocityKmh.toLocaleString()} km/h</div>
                    <div className="text-[10px] text-emerald-400">{sat.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Satellite Detailed Telemetry Inspector */}
        {selectedSat && (
          <div className="lg:col-span-5 p-6 bg-neutral-950 border border-neutral-800 rounded space-y-6 sticky top-20">
            <div className="space-y-2 pb-4 border-b border-neutral-900">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>ORBITAL TELEMETRY INSPECTOR</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {selectedSat.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white">{selectedSat.name}</h2>
              <div className="text-xs font-mono text-neutral-400">
                OPERATOR: {selectedSat.operator}
              </div>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded">
                <div className="text-[10px] text-neutral-500">NORAD CATALOG ID</div>
                <div className="text-base font-semibold text-white mt-0.5 tabular-nums">
                  #{selectedSat.noradId}
                </div>
              </div>

              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded">
                <div className="text-[10px] text-neutral-500">ORBIT REGIME</div>
                <div className="text-base font-semibold text-white mt-0.5">
                  {selectedSat.orbitType}
                </div>
              </div>

              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded">
                <div className="text-[10px] text-neutral-500">CURRENT ALTITUDE</div>
                <div className="text-base font-semibold text-white mt-0.5 tabular-nums">
                  {selectedSat.altitudeKm.toFixed(1)} km
                </div>
              </div>

              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded">
                <div className="text-[10px] text-neutral-500">ORBITAL VELOCITY</div>
                <div className="text-base font-semibold text-white mt-0.5 tabular-nums">
                  {selectedSat.velocityKmh.toLocaleString()} km/h
                </div>
              </div>

              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded">
                <div className="text-[10px] text-neutral-500">INCLINATION</div>
                <div className="text-base font-semibold text-white mt-0.5 tabular-nums">
                  {selectedSat.inclinationDeg.toFixed(2)}°
                </div>
              </div>

              <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded">
                <div className="text-[10px] text-neutral-500">ORBITAL PERIOD</div>
                <div className="text-base font-semibold text-white mt-0.5 tabular-nums">
                  {selectedSat.periodMinutes.toFixed(1)} min
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 text-xs">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">MISSION OBJECTIVE</div>
              <p className="text-neutral-400 leading-relaxed">{selectedSat.description}</p>
            </div>

            {/* TLE Ephemeris Viewer */}
            <div className="space-y-2 pt-2 border-t border-neutral-900">
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span>TWO-LINE ELEMENT SET (TLE)</span>
                <button
                  type="button"
                  onClick={copyTle}
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedTle ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTle ? 'COPIED' : 'COPY TLE'}</span>
                </button>
              </div>

              <pre className="p-3 bg-neutral-900/90 border border-neutral-800 rounded text-[10px] font-mono text-neutral-300 overflow-x-auto leading-relaxed">
                {selectedSat.tleLine1}
                {'\n'}
                {selectedSat.tleLine2}
              </pre>

              <div className="text-[10px] font-mono text-neutral-500 flex items-center justify-between pt-1">
                <span>SOURCE: {selectedSat.lastUpdated}</span>
                <span>LAUNCH: {selectedSat.launchDate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
