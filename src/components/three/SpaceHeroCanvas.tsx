import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Satellite } from '../../types';

interface SpaceHeroCanvasProps {
  onSelectSatellite?: (satelliteName: string) => void;
  className?: string;
}

export const SpaceHeroCanvas: React.FC<SpaceHeroCanvasProps> = ({ onSelectSatellite, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [activeSat, setActiveSat] = useState<string | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050505, 0.0018);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(22, 14, 38);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222226, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8);
    sunLight.position.set(45, 20, 30);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x8899aa, 1.4);
    rimLight.position.set(-40, -10, -30);
    scene.add(rimLight);

    // Procedural Earth Texture (Precision Monochrome Continents)
    const createEarthTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Deep dark oceans
      ctx.fillStyle = '#08090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Procedural continents approximation with high-precision organic land patterns
      ctx.fillStyle = '#26292e';
      
      // Draw land masses (Americas, Eurasia, Africa, Australia, Antarctica)
      const drawLandBlob = (x: number, y: number, rx: number, ry: number) => {
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      };

      // North America
      drawLandBlob(450, 320, 180, 130);
      drawLandBlob(380, 420, 80, 70);
      // South America
      drawLandBlob(600, 680, 120, 190);
      // Europe
      drawLandBlob(1050, 300, 140, 100);
      // Africa
      drawLandBlob(1100, 560, 170, 180);
      // Asia
      drawLandBlob(1420, 340, 280, 180);
      drawLandBlob(1580, 440, 140, 110);
      // India subcontinental peninsula
      drawLandBlob(1380, 480, 70, 90);
      // Australia
      drawLandBlob(1700, 720, 120, 90);
      // Antarctica
      drawLandBlob(1000, 960, 900, 60);

      // Subtle topography lines
      ctx.strokeStyle = '#3a3e45';
      ctx.lineWidth = 1;
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        ctx.arc(startX, startY, 40 + Math.random() * 80, 0, Math.PI * 1.5);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // Earth Sphere
    const earthRadius = 12;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTexture = createEarthTexture();

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.75,
      metalness: 0.15,
      bumpScale: 0.05,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere Glow Shell
    const atmoGeometry = new THREE.SphereGeometry(earthRadius * 1.025, 48, 48);
    const atmoMaterial = new THREE.MeshBasicMaterial({
      color: 0x99bbdd,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmoGeometry, atmoMaterial);
    scene.add(atmosphere);

    // Coordinate Grid Ring (Latitude / Longitude Wireframe)
    const gridGeometry = new THREE.WireframeGeometry(new THREE.SphereGeometry(earthRadius * 1.008, 24, 18));
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x444d56,
      transparent: true,
      opacity: 0.28,
    });
    const gridMesh = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridMesh);

    // Starfield Background
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 90 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xdddddd,
      size: 0.85,
      transparent: true,
      opacity: 0.7,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Satellites Group & Orbital Rings
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    interface SatelliteVisual {
      name: string;
      norad: number;
      semiMajor: number;
      inclination: number; // in radians
      speed: number;
      angle: number;
      color: number;
      mesh: THREE.Mesh;
      ring: THREE.Line;
    }

    const satDefs = [
      { name: 'ISS (Zarya)', norad: 25544, semiMajor: 15.5, inclination: 0.9, speed: 0.008, color: 0xffffff },
      { name: 'ORBINEX CubeSat-1', norad: 59901, semiMajor: 17.2, inclination: 1.68, speed: 0.006, color: 0xd4d4d4 },
      { name: 'Hubble Space Telescope', norad: 20580, semiMajor: 18.8, inclination: 0.5, speed: 0.005, color: 0xaaaaaa },
      { name: 'NOAA-20 Polar', norad: 43013, semiMajor: 20.4, inclination: 1.72, speed: 0.004, color: 0xcccccc },
      { name: 'Tiangong Station', norad: 48274, semiMajor: 15.0, inclination: 0.72, speed: 0.0082, color: 0xffffff },
      { name: 'GEO Relay Sentinel', norad: 40122, semiMajor: 27.5, inclination: 0.08, speed: 0.0015, color: 0x888888 },
    ];

    const satellites: SatelliteVisual[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    satDefs.forEach((def) => {
      // Create Orbit Ring
      const ringPoints: THREE.Vector3[] = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * def.semiMajor;
        const z = Math.sin(theta) * def.semiMajor;
        ringPoints.push(new THREE.Vector3(x, 0, z));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x3a3f45,
        transparent: true,
        opacity: 0.45,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = def.inclination;
      orbitGroup.add(ring);

      // Create Satellite Mesh
      const satGeo = new THREE.BoxGeometry(0.8, 0.4, 0.4);
      const satMat = new THREE.MeshStandardMaterial({
        color: def.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x111111,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.userData = { name: def.name, norad: def.norad };

      // Solar panels attachment
      const panelGeo = new THREE.BoxGeometry(1.6, 0.05, 0.4);
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x1a2634, metalness: 0.9, roughness: 0.1 });
      const panel = new THREE.Mesh(panelGeo, panelMat);
      satMesh.add(panel);

      orbitGroup.add(satMesh);
      interactiveMeshes.push(satMesh);

      satellites.push({
        ...def,
        angle: Math.random() * Math.PI * 2,
        mesh: satMesh,
        ring,
      });
    });

    // Orbit Controls (Simple clean drag-rotate without bulky external bundles)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotationX));
      }

      // Raycasting for hover tooltip
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging) {
        // Click raycast
        const rect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveMeshes);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const name = hit.userData.name;
          setActiveSat(name);
          if (onSelectSatellite) onSelectSatellite(name);
        }
      }
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.03;
      camera.position.z = Math.max(24, Math.min(65, camera.position.z + zoomFactor));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: true });
    dom.addEventListener('touchend', onTouchEnd, { passive: true });

    // Window resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', onResize);

    // Context loss handler
    const onContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
    dom.addEventListener('webglcontextlost', onContextLost);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Earth rotation
      if (isRotating) {
        earth.rotation.y += delta * 0.05;
        gridMesh.rotation.y += delta * 0.05;
      }

      // Smooth camera interpolation for drag
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      earth.rotation.x = currentRotationX;
      scene.rotation.y = currentRotationY;

      // Update satellites position
      satellites.forEach((sat) => {
        sat.angle += sat.speed * (isRotating ? 1 : 0.2);
        const x = Math.cos(sat.angle) * sat.semiMajor;
        const z = Math.sin(sat.angle) * sat.semiMajor;
        
        // Inclined orbit transform
        const rotatedY = -z * Math.sin(sat.inclination);
        const rotatedZ = z * Math.cos(sat.inclination);

        sat.mesh.position.set(x, rotatedY, rotatedZ);
        sat.mesh.rotation.y = sat.angle + Math.PI / 2;
        sat.mesh.rotation.z = sat.inclination;
      });

      // Layer visibility
      satellites.forEach((s) => (s.ring.visible = showOrbits));
      gridMesh.visible = showGrid;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mousedown', onMouseDown);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      dom.removeEventListener('webglcontextlost', onContextLost);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating, showOrbits, showGrid, onSelectSatellite]);

  return (
    <div className={`relative w-full h-full min-h-[460px] overflow-hidden select-none ${className}`}>
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Fallback if WebGL unavailable */}
      {!webGlSupported && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 p-6 text-center">
          <div className="max-w-md space-y-2">
            <div className="text-xs font-mono text-neutral-400">TELEMETRY DISPLAY MODE: STATIC 2D</div>
            <p className="text-sm text-neutral-300">
              WebGL hardware acceleration is unavailable on this device. Orbit telemetry continues streaming via the tabular engine.
            </p>
          </div>
        </div>
      )}

      {/* Floating HUD Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <div className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-neutral-400 bg-black/60 backdrop-blur-md border border-white/10 rounded">
          ORBITAL HUD // THREE.JS ENGINE
        </div>
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={`px-2.5 py-1 text-[11px] font-mono transition-colors border rounded ${
            isRotating
              ? 'bg-white text-black border-white'
              : 'bg-black/60 text-neutral-300 border-white/10 hover:border-white/30'
          }`}
        >
          {isRotating ? 'PAUSE ROTATION' : 'RESUME ROTATION'}
        </button>
        <button
          type="button"
          onClick={() => setShowOrbits(!showOrbits)}
          className={`px-2.5 py-1 text-[11px] font-mono transition-colors border rounded ${
            showOrbits
              ? 'bg-neutral-800 text-white border-neutral-600'
              : 'bg-black/60 text-neutral-400 border-white/10'
          }`}
        >
          {showOrbits ? 'ORBITS: ON' : 'ORBITS: OFF'}
        </button>
        <button
          type="button"
          onClick={() => setShowGrid(!showGrid)}
          className={`px-2.5 py-1 text-[11px] font-mono transition-colors border rounded ${
            showGrid
              ? 'bg-neutral-800 text-white border-neutral-600'
              : 'bg-black/60 text-neutral-400 border-white/10'
          }`}
        >
          {showGrid ? 'GRID: ON' : 'GRID: OFF'}
        </button>
      </div>

      {/* Satellite Inspection Tooltip if clicked */}
      {activeSat && (
        <div className="absolute bottom-4 left-4 z-10 p-3 bg-black/80 backdrop-blur-md border border-white/20 rounded max-w-xs text-xs space-y-1 animate-fadeIn">
          <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
            <span>TRACKED ASSET</span>
            <button
              onClick={() => setActiveSat(null)}
              className="text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="text-sm font-semibold text-white font-mono">{activeSat}</div>
          <div className="text-[11px] text-neutral-300">
            Real-time orbital vector active. Click "Explore Live Space" or "Satellite Tracker" for full TLE ephemeris and downlink frequency telemetry.
          </div>
        </div>
      )}

      {/* Navigation Helper */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-3 text-[10px] font-mono text-neutral-500 bg-black/40 px-3 py-1.5 rounded border border-white/5">
        <span>DRAG TO ROTATE</span>
        <span>·</span>
        <span>SCROLL TO ZOOM</span>
        <span>·</span>
        <span>CLICK SATELLITE TO INSPECT</span>
      </div>
    </div>
  );
};
