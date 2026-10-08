import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Satellite } from '../../types';

interface SatelliteTrackerCanvasProps {
  satellites: Satellite[];
  selectedSatellite: Satellite | null;
  onSelectSatellite: (satellite: Satellite) => void;
}

export const SatelliteTrackerCanvas: React.FC<SatelliteTrackerCanvasProps> = ({
  satellites,
  selectedSatellite,
  onSelectSatellite,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cameraMode, setCameraMode] = useState<'FREE' | 'FOLLOW'>('FREE');
  const selectedSatRef = useRef<Satellite | null>(selectedSatellite);

  useEffect(() => {
    selectedSatRef.current = selectedSatellite;
  }, [selectedSatellite]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 20, 48);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x282b30, 1.5);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xffffff, 2.6);
    sun.position.set(50, 25, 30);
    scene.add(sun);

    // Precision Earth Canvas Texture
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 1024;
    earthCanvas.height = 512;
    const ctx = earthCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0a0c10';
      ctx.fillRect(0, 0, 1024, 512);

      // Continent shapes in crisp slate monochrome
      ctx.fillStyle = '#22252a';
      const drawBlob = (x: number, y: number, rx: number, ry: number) => {
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      };
      drawBlob(220, 170, 90, 70); // North America
      drawBlob(300, 340, 60, 95);  // South America
      drawBlob(520, 160, 70, 50);  // Europe
      drawBlob(550, 280, 85, 90);  // Africa
      drawBlob(710, 170, 140, 90); // Asia
      drawBlob(690, 240, 35, 45);  // India
      drawBlob(850, 360, 60, 45);  // Australia
    }
    const earthTexture = new THREE.CanvasTexture(earthCanvas);

    // Earth Sphere (radius = 12 units)
    const earthRadius = 12;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.8,
      metalness: 0.1,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Atmosphere Ring
    const atmoGeo = new THREE.SphereGeometry(earthRadius * 1.025, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x88aacc,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmo);

    // Latitude / Longitude lines
    const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(earthRadius * 1.006, 24, 18));
    const gridMat = new THREE.LineBasicMaterial({ color: 0x333b44, transparent: true, opacity: 0.35 });
    const gridMesh = new THREE.LineSegments(gridGeo, gridMat);
    scene.add(gridMesh);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 120 + Math.random() * 100;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      starPos[i] = r * Math.sin(ph) * Math.cos(th);
      starPos[i + 1] = r * Math.sin(ph) * Math.sin(th);
      starPos[i + 2] = r * Math.cos(ph);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xcccccc, size: 0.8 });
    scene.add(new THREE.Points(starGeo, starMat));

    // Satellite Objects & Orbit Arcs
    const satGroup = new THREE.Group();
    scene.add(satGroup);

    interface SatObj {
      data: Satellite;
      mesh: THREE.Mesh;
      ring: THREE.Line;
      semiMajor: number;
      inclination: number;
      speed: number;
      angle: number;
    }

    const satObjs: SatObj[] = [];
    const interactiveList: THREE.Mesh[] = [];

    satellites.forEach((sat, idx) => {
      // Map altitude to 3D distance
      // Normal LEO (400-800km) mapped to radius 14.5 to 19
      // Deep space mapped to 28
      let r = 14.5 + (sat.altitudeKm / 1000) * 3.5;
      if (sat.orbitType === 'Lagrange L2') r = 32;

      const inclRad = (sat.inclinationDeg * Math.PI) / 180;
      const speed = (sat.velocityKmh / 28000) * 0.007;

      // Orbit Path Circle
      const segments = 96;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
      }
      const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const orbitLineMat = new THREE.LineBasicMaterial({
        color: sat.id === selectedSatellite?.id ? 0xffffff : 0x404852,
        transparent: true,
        opacity: sat.id === selectedSatellite?.id ? 0.9 : 0.4,
      });
      const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
      orbitLine.rotation.x = inclRad;
      satGroup.add(orbitLine);

      // Satellite Object
      const satMeshGeo = new THREE.SphereGeometry(0.55, 12, 12);
      const isSelected = selectedSatellite?.id === sat.id;
      const satMeshMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xffffff : 0xd8d8d8,
        emissive: isSelected ? 0x666666 : 0x111111,
        metalness: 0.8,
        roughness: 0.2,
      });
      const satMesh = new THREE.Mesh(satMeshGeo, satMeshMat);
      satMesh.userData = { sat };

      // Solar Wings
      const wingGeo = new THREE.BoxGeometry(1.4, 0.04, 0.35);
      const wingMat = new THREE.MeshStandardMaterial({ color: 0x152230 });
      const wing = new THREE.Mesh(wingGeo, wingMat);
      satMesh.add(wing);

      satGroup.add(satMesh);
      interactiveList.push(satMesh);

      satObjs.push({
        data: sat,
        mesh: satMesh,
        ring: orbitLine,
        semiMajor: r,
        inclination: inclRad,
        speed,
        angle: (idx * 0.75) % (Math.PI * 2),
      });
    });

    // Interaction controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0;
    let rotY = 0;

    const onDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        rotY += dx * 0.005;
        rotX += dy * 0.005;
        rotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotX));
      }
    };

    const onUp = (e: MouseEvent) => {
      if (!isDragging) {
        const rect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(interactiveList);
        if (hits.length > 0) {
          const hitSat = hits[0].object.userData.sat as Satellite;
          if (hitSat) {
            onSelectSatellite(hitSat);
          }
        }
      }
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(20, Math.min(80, camera.position.z + e.deltaY * 0.03));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Window resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      earth.rotation.y += delta * 0.04;
      gridMesh.rotation.y += delta * 0.04;

      scene.rotation.y = rotY;
      earth.rotation.x = rotX;

      // Animate satellites
      satObjs.forEach((s) => {
        s.angle += s.speed;
        const x = Math.cos(s.angle) * s.semiMajor;
        const z = Math.sin(s.angle) * s.semiMajor;
        const y = -z * Math.sin(s.inclination);
        const actualZ = z * Math.cos(s.inclination);

        s.mesh.position.set(x, y, actualZ);
        s.mesh.rotation.y = s.angle + Math.PI / 2;

        const isCurrentlySelected = selectedSatRef.current?.id === s.data.id;
        (s.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(
          isCurrentlySelected ? 0x888888 : 0x111111
        );
        (s.ring.material as THREE.LineBasicMaterial).color.setHex(
          isCurrentlySelected ? 0xffffff : 0x404852
        );
        (s.ring.material as THREE.LineBasicMaterial).opacity = isCurrentlySelected ? 0.9 : 0.35;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      dom.removeEventListener('mousedown', onDown);
      dom.removeEventListener('wheel', onWheel);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [satellites, onSelectSatellite]);

  return (
    <div className="relative w-full h-[520px] bg-neutral-950 border border-neutral-800 rounded overflow-hidden">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Overlay Status Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-neutral-300 bg-black/70 backdrop-blur-md border border-neutral-800 rounded">
          SATELLITE ORBIT SIMULATOR // SGP4
        </span>
        <span className="px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-black/70 backdrop-blur-md border border-emerald-950 rounded flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {satellites.length} ASSETS PROPAGATING
        </span>
      </div>

      {/* Selected Satellite Telemetry HUD Card */}
      {selectedSatellite && (
        <div className="absolute bottom-4 left-4 z-10 p-4 bg-black/85 backdrop-blur-md border border-neutral-700 rounded max-w-sm text-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
            <span>TARGET TELEMETRY</span>
            <span className="text-white">NORAD #{selectedSatellite.noradId}</span>
          </div>
          <div className="text-sm font-semibold text-white">{selectedSatellite.name}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px] text-neutral-300">
            <div>
              <span className="text-neutral-500">ALTITUDE: </span>
              <span className="tabular-nums text-white font-medium">{selectedSatellite.altitudeKm.toFixed(1)} km</span>
            </div>
            <div>
              <span className="text-neutral-500">VELOCITY: </span>
              <span className="tabular-nums text-white font-medium">{selectedSatellite.velocityKmh.toLocaleString()} km/h</span>
            </div>
            <div>
              <span className="text-neutral-500">INCLINATION: </span>
              <span className="tabular-nums text-white font-medium">{selectedSatellite.inclinationDeg.toFixed(2)}°</span>
            </div>
            <div>
              <span className="text-neutral-500">PERIOD: </span>
              <span className="tabular-nums text-white font-medium">{selectedSatellite.periodMinutes.toFixed(1)} min</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-neutral-400 pt-1 border-t border-neutral-800 flex items-center justify-between">
            <span>STATUS: {selectedSatellite.status}</span>
            <span>{selectedSatellite.operator}</span>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-500 bg-black/50 px-2.5 py-1 rounded border border-neutral-800">
        <span>CLICK ANY SATELLITE TO LOCK TELEMETRY</span>
      </div>
    </div>
  );
};
