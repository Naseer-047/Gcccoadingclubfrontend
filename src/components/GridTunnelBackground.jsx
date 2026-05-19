import React, { useEffect, useRef, useState } from 'react';

const CODING_SNIPPETS = [
  'const', 'let', 'function', '=>', 'async', 'await', 'import', 'export', 
  'return', 'class', 'extends', 'true', 'false', 'null', 'undefined', 
  '{}', '[]', '()', '<html>', '<body>', '<div>', '<App />', 'map()', 
  'filter()', 'reduce()', 'promise', 'fetch()', 'axios', 'npm', 'git', 
  'GCC.init()', 'GAT()', '010101', 'useState', 'useEffect', 'useRef', 
  'Context', 'Router', 'Vite', 'React', 'GSAP', 'CSS', 'HTML', 'JSON', 
  'API', 'console.log', 'process.env', 'npm run dev', 'npm run build',
  'req, res', 'try { } catch', '&&', '||', '!=', '===', 'GitHub'
];

const COLORS_DARK = [
  '#34d399', // Emerald
  '#22d3ee', // Cyan
  '#a78bfa', // Violet
  '#fbbf24', // Amber
  '#38bdf8'  // Light blue
];

const COLORS_LIGHT = [
  '#047857', // Emerald-700
  '#0369a1', // Cyan-700
  '#6d28d9', // Violet-700
  '#b45309', // Amber-700
  '#0284c7'  // Light blue-700
];

export default function GridTunnelBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  // Tracks mouse position relative to center of the viewport
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Detect dark mode
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    };

    checkTheme();

    // Use MutationObserver to watch class changes on documentElement (HTML tag)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Resize handler
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Support high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse movement handler
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Get coordinates relative to center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      mouseRef.current.targetX = (e.clientX - rect.left - centerX) * 0.45;
      mouseRef.current.targetY = (e.clientY - rect.top - centerY) * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Grid properties
    const numRings = 9;
    const ringSpeed = 0.0018; // Speed of tunnel forward motion
    let ringOffset = 0; // Cumulative offset for moving forward
    let rotationAngle = 0; // Slowly rotating tunnel

    // Initialize floating coding snippets
    const numElements = 25;
    const elements = [];

    const createNewElement = (zOverride = 0) => {
      const colors = isDark ? COLORS_DARK : COLORS_LIGHT;
      return {
        text: CODING_SNIPPETS[Math.floor(Math.random() * CODING_SNIPPETS.length)],
        t: zOverride, // Depth progress (0 = far away vanishing point, 1 = passes screen)
        angle: Math.random() * Math.PI * 2, // Angular position in tunnel slice
        radiusFactor: 0.15 + Math.random() * 0.75, // Radial placement distance from core
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.002 + Math.random() * 0.003,
        scale: 0.7 + Math.random() * 0.7,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        elementRot: Math.random() * Math.PI * 2
      };
    };

    // Populate initial elements with staggered depths
    for (let i = 0; i < numElements; i++) {
      elements.push(createNewElement(Math.random()));
    }

    // Tunnel geometric boundaries
    const R_MIN = 8;
    
    // Animation loop
    let lastTime = performance.now();

    const draw = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for mouse parallax vanishing point
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const centerX = width / 2;
      const centerY = height / 2;
      const R_MAX = Math.max(width, height) * 0.9;
      const k = Math.log(R_MAX / R_MIN);

      // Vanishing point offset by mouse parallax
      const vpX = centerX + mouse.x;
      const vpY = centerY + mouse.y;

      // Update tunnel movement parameters
      ringOffset = (ringOffset + ringSpeed * (delta * 0.05)) % (1 / numRings);
      rotationAngle += 0.0006 * delta;

      // Draw Tunnel Rings & Radial Lines
      // We draw an octagon tunnel
      const numSides = 8;
      const ringPositions = [];

      for (let i = 0; i < numRings; i++) {
        const t = (i / numRings + ringOffset) % 1;
        // Exponential radius scaling
        const radius = R_MIN * Math.exp(k * t);

        // Center shift for curving effect
        const ringShiftX = Math.sin(time * 0.0006 + t * Math.PI) * 20;
        const ringShiftY = Math.cos(time * 0.0004 + t * Math.PI) * 20;
        const cx = vpX + ringShiftX * (1 - t);
        const cy = vpY + ringShiftY * (1 - t);

        ringPositions.push({ cx, cy, radius, t });
      }

      // Sort rings from furthest (t near 0) to closest (t near 1) to draw radial lines correctly
      ringPositions.sort((a, b) => a.t - b.t);

      // Set styles for grid lines
      ctx.lineWidth = 1;
      if (isDark) {
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)'; // soft emerald
        ctx.shadowBlur = 0;
      } else {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)'; // soft slate
        ctx.shadowBlur = 0;
      }

      // Draw concentric octagons
      ringPositions.forEach((ring) => {
        // Adjust lines opacity based on depth
        // Fade in near center, fade out when passing screen
        let opacity = 1;
        if (ring.t < 0.15) {
          opacity = ring.t / 0.15;
        } else if (ring.t > 0.8) {
          opacity = (1 - ring.t) / 0.2;
        }

        ctx.strokeStyle = isDark 
          ? `rgba(16, 185, 129, ${0.15 * opacity})` 
          : `rgba(148, 163, 184, ${0.18 * opacity})`;

        ctx.beginPath();
        for (let side = 0; side <= numSides; side++) {
          const angle = (side / numSides) * Math.PI * 2 + rotationAngle;
          const x = ring.cx + ring.radius * Math.cos(angle);
          const y = ring.cy + ring.radius * Math.sin(angle);
          
          if (side === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Draw radial lane connections
      // We connect the vertices of the outer ring to the inner ring (center vp)
      const outerRing = ringPositions[ringPositions.length - 1];
      const innerRing = ringPositions[0];
      if (outerRing && innerRing) {
        for (let side = 0; side < numSides; side++) {
          const angle = (side / numSides) * Math.PI * 2 + rotationAngle;
          
          // Connect matching corners across rings
          ctx.beginPath();
          ctx.strokeStyle = isDark
            ? `rgba(6, 182, 212, 0.06)` // soft cyan glow lanes
            : `rgba(203, 213, 225, 0.08)`;
          
          const startX = innerRing.cx + innerRing.radius * Math.cos(angle);
          const startY = innerRing.cy + innerRing.radius * Math.sin(angle);
          const endX = outerRing.cx + outerRing.radius * Math.cos(angle);
          const endY = outerRing.cy + outerRing.radius * Math.sin(angle);
          
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      }

      // Draw floating coding elements
      elements.forEach((el, index) => {
        // Update depth
        el.t += el.speed * (delta * 0.05);

        // Reset if element flies past user screen
        if (el.t >= 1) {
          elements[index] = createNewElement(0);
          return;
        }

        // Calculate size and coordinates
        const currentRadius = R_MIN * Math.exp(k * el.t);

        // Center position shift at current depth
        const ringShiftX = Math.sin(time * 0.0006 + el.t * Math.PI) * 20;
        const ringShiftY = Math.cos(time * 0.0004 + el.t * Math.PI) * 20;
        const cx = vpX + ringShiftX * (1 - el.t);
        const cy = vpY + ringShiftY * (1 - el.t);

        const dist = currentRadius * el.radiusFactor;
        const angle = el.angle + rotationAngle;

        const x = cx + dist * Math.cos(angle);
        const y = cy + dist * Math.sin(angle);

        // Scale factor for font size
        const fontSize = Math.max(9, Math.round(10 * Math.exp(k * el.t * 0.6) * el.scale));
        
        // Don't draw if it overflows/gets way too large
        if (fontSize > 160) return;

        // Calculate opacity based on progress
        let opacity = 1;
        if (el.t < 0.25) {
          opacity = el.t / 0.25; // fade-in
        } else if (el.t > 0.75) {
          opacity = Math.max(0, (1 - el.t) / 0.25); // fade-out
        }

        // Update rotation
        el.elementRot += el.rotSpeed * delta * 0.05;

        // Draw snippet text
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(el.elementRot);

        // Apply visual text glow in dark mode
        if (isDark) {
          ctx.shadowColor = el.color;
          ctx.shadowBlur = el.t > 0.4 ? 12 : 5; // more glow as it gets closer
          ctx.fillStyle = el.color;
          ctx.globalAlpha = opacity * 0.85;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.fillStyle = el.color;
          ctx.globalAlpha = opacity * 0.65; // softer in light mode
        }

        ctx.font = `black ${fontSize}px 'JetBrains Mono', 'Space Grotesk', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.text, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
      {/* Soft gradient blur to smooth edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,23,42,0.6)_100%)] pointer-events-none" />
    </div>
  );
}
