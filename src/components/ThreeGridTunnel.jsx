import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CODING_CARDS = [
  { lines: ["import { useState } from 'react';", "const [xp, setXp] = useState(100);"] },
  { lines: ["const nebula = new CoreNebula();", "nebula.glow({ intensity: 0.85 });"] },
  { lines: ["git commit -m 'feat: tunnel'", "git push origin master"] },
  { lines: ["await db.connect();", "console.log('Connected!');"] },
  { lines: ["gcc.on('hackathon', (e) => {", "  e.join({ team: 'Alpha' });"] },
  { lines: ["const isLeader = score > 1500;", "const rank = isLeader ? 'Elite' : 'Pro';"] },
  { lines: ["socket.emit('join-room', {", "  room: 'coding-lab'"] },
  { lines: ["class Dev extends Human {", "  code() { return 'coffee'; }"] },
];

// Pre-baked texture pool — created ONCE, reused forever
const texturePool = { dark: [], light: [] };
let poolReady = false;

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function buildTexturePool(isDark) {
  const key = isDark ? 'dark' : 'light';
  if (texturePool[key].length > 0) return;

  CODING_CARDS.forEach((cardData) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;  // Half size — was 512
    canvas.height = 128; // Half size — was 256
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)';
    drawRoundedRect(ctx, 2, 2, 252, 124, 8);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.3)';
    drawRoundedRect(ctx, 2, 2, 252, 124, 8);
    ctx.stroke();

    // macOS dots
    ['#ef4444', '#f59e0b', '#10b981'].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(14 + i * 10, 12, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = isDark ? 'rgba(148,163,184,0.15)' : 'rgba(148,163,184,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(2, 22); ctx.lineTo(254, 22); ctx.stroke();

    cardData.lines.forEach((line, idx) => {
      const y = 42 + idx * 20;
      ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
      ctx.font = "bold 10px monospace";
      ctx.fillText(`0${idx + 1}`, 8, y);
      ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';
      ctx.font = "10px monospace";
      ctx.fillText(line.slice(0, 34), 28, y);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    texturePool[key].push(tex);
  });
}

function getPoolTexture(isDark) {
  const key = isDark ? 'dark' : 'light';
  buildTexturePool(isDark);
  const pool = texturePool[key];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ThreeGridTunnel() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const segmentsRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollPosRef = useRef(0);
  const autoProgressRef = useRef(0);
  const lookAtVec = useRef(new THREE.Vector3()); // Reuse — no allocation per frame
  const isDarkRef = useRef(isDark);

  const TUNNEL_WIDTH = 22;
  const TUNNEL_HEIGHT = 14;
  const SEGMENT_DEPTH = 6;
  const NUM_SEGMENTS = 10; // Reduced from 14

  const FLOOR_COLS = 6;
  const WALL_ROWS = 4;
  const COL_WIDTH = TUNNEL_WIDTH / FLOOR_COLS;
  const ROW_HEIGHT = TUNNEL_HEIGHT / WALL_ROWS;

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  // Detect dark mode
  useEffect(() => {
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 120);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,        // OFF — major perf win
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // capped at 1.5
    rendererRef.current = renderer;

    scene.fog = new THREE.FogExp2(0x050505, 0.025);

    const populateCards = (group, w, h, d, dark) => {
      const addCard = (pos, rot, cw, ch) => {
        const geom = new THREE.PlaneGeometry(cw - 0.5, ch - 0.5);
        const mat = new THREE.MeshBasicMaterial({
          map: getPoolTexture(dark),
          transparent: true,
          opacity: 0.88,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.copy(pos);
        mesh.rotation.copy(rot);
        mesh.name = 'code_card';
        group.add(mesh);
      };

      for (let i = 0; i < FLOOR_COLS; i++) {
        if (Math.random() > 0.82) addCard(
          new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, -h, -d / 2),
          new THREE.Euler(-Math.PI / 2, 0, 0), COL_WIDTH, d
        );
      }
      for (let i = 0; i < WALL_ROWS; i++) {
        if (Math.random() > 0.82) addCard(
          new THREE.Vector3(-w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
          new THREE.Euler(0, Math.PI / 2, 0), d, ROW_HEIGHT
        );
        if (Math.random() > 0.82) addCard(
          new THREE.Vector3(w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
          new THREE.Euler(0, -Math.PI / 2, 0), d, ROW_HEIGHT
        );
      }
    };

    const createSegment = (zPos, dark) => {
      const group = new THREE.Group();
      group.position.z = zPos;

      const w = TUNNEL_WIDTH / 2;
      const h = TUNNEL_HEIGHT / 2;
      const d = SEGMENT_DEPTH;

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: dark ? 0.45 : 0.35,
      });

      const verts = [];
      for (let i = 0; i <= FLOOR_COLS; i++) {
        const x = -w + i * COL_WIDTH;
        verts.push(x, -h, 0, x, -h, -d, x, h, 0, x, h, -d);
      }
      for (let i = 1; i < WALL_ROWS; i++) {
        const y = -h + i * ROW_HEIGHT;
        verts.push(-w, y, 0, -w, y, -d, w, y, 0, w, y, -d);
      }
      verts.push(-w, -h, 0, w, -h, 0, -w, h, 0, w, h, 0, -w, -h, 0, -w, h, 0, w, -h, 0, w, h, 0);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      const lines = new THREE.LineSegments(geo, lineMat);
      lines.name = 'grid_lines';
      group.add(lines);

      populateCards(group, w, h, d, dark);
      return group;
    };

    const segments = [];
    const initDark = document.documentElement.classList.contains('dark');
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const seg = createSegment(-i * SEGMENT_DEPTH, initDark);
      scene.add(seg);
      segments.push(seg);
    }
    segmentsRef.current = segments;

    // --- OPTIMIZED ANIMATION LOOP ---
    let lastTime = performance.now();
    let frameCount = 0;
    let isIntersecting = true;

    const recycleCards = (segment) => {
      const toRemove = [];
      segment.traverse((child) => { if (child.name === 'code_card') toRemove.push(child); });
      toRemove.forEach((child) => {
        segment.remove(child);
        child.geometry.dispose();
        // Don't dispose material.map — it's a pooled texture!
        child.material.dispose();
      });
      populateCards(segment, TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, SEGMENT_DEPTH, isDarkRef.current);
    };

    const animate = (time) => {
      if (!isIntersecting) {
        animationFrameIdRef.current = null;
        return;
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
      frameCount++;

      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      autoProgressRef.current += delta * 0.0025;
      const scrollZ = scrollPosRef.current * 0.035;
      const targetZ = -(autoProgressRef.current + scrollZ);
      camera.position.z += (targetZ - camera.position.z) * 0.07;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      camera.position.x = mouse.x * 2.0;
      camera.position.y = mouse.y * 1.2;

      // Reuse Vector3 — zero allocations per frame
      lookAtVec.current.set(0, 0, camera.position.z - 12);
      camera.lookAt(lookAtVec.current);

      // Segment recycling — only check every 3 frames
      if (frameCount % 3 === 0) {
        const camZ = camera.position.z;
        let minZ = 0, maxZ = -999999;
        segmentsRef.current.forEach(s => {
          if (s.position.z < minZ) minZ = s.position.z;
          if (s.position.z > maxZ) maxZ = s.position.z;
        });

        segmentsRef.current.forEach((seg) => {
          if (seg.position.z > camZ + SEGMENT_DEPTH) {
            seg.position.z = minZ - SEGMENT_DEPTH;
            minZ = seg.position.z;
            recycleCards(seg);
          } else if (seg.position.z < camZ - (NUM_SEGMENTS - 1.5) * SEGMENT_DEPTH) {
            seg.position.z = maxZ + SEGMENT_DEPTH;
            maxZ = seg.position.z;
            recycleCards(seg);
          }
        });
      }

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          if (!animationFrameIdRef.current) {
            lastTime = performance.now();
            animationFrameIdRef.current = requestAnimationFrame(animate);
          }
        } else {
          if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
          }
        }
      });
    }, { threshold: 0.05 });

    observer.observe(containerRef.current);

    const onScroll = () => { scrollPosRef.current = window.scrollY; };
    const onMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseRef.current.targetY = -(e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      segmentsRef.current.forEach((seg) => {
        seg.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          } else if (child instanceof THREE.LineSegments) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      });
      renderer.dispose();
    };
  }, []);

  // React to dark mode changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const bgHex = isDark ? 0x050505 : 0xffffff;
    const lineOp = isDark ? 0.45 : 0.35;
    sceneRef.current.background = new THREE.Color(bgHex);
    if (sceneRef.current.fog) sceneRef.current.fog.color.setHex(bgHex);

    segmentsRef.current.forEach((seg) => {
      seg.traverse((child) => {
        if (child.name === 'grid_lines' && child instanceof THREE.LineSegments) {
          child.material.opacity = lineOp;
          child.material.needsUpdate = true;
        }
        if (child.name === 'code_card' && child instanceof THREE.Mesh) {
          child.material.map = getPoolTexture(isDark);
          child.material.needsUpdate = true;
        }
      });
    });
  }, [isDark]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.4)_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(5,5,5,0.5)_95%)] pointer-events-none" />
    </div>
  );
}
