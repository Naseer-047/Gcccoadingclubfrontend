import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * PageTransition — Desktop-only emerald curtain wipe.
 * Renders two overlay panels that sweep in then retract on every route change.
 * On mobile (< 768px) it does nothing and stays invisible.
 */
export default function PageTransition({ theme }) {
  const location = useLocation();
  const overlayRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const labelRef = useRef(null);
  const isFirstRender = useRef(true);

  const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

  // Map route paths to display labels
  const getRouteLabel = (pathname) => {
    const map = {
      '/': 'Home',
      '/events': 'Events',
      '/resources': 'Resources',
      '/leaderboard': 'Leaderboard',
      '/live-rooms': 'Arena',
      '/quiz': 'Quiz',
      '/domains': 'Domains',
      '/auth': 'Login',
      '/profile': 'Profile',
      '/my-resources': 'My Resources',
    };
    // fuzzy match
    for (const [key, val] of Object.entries(map)) {
      if (pathname === key || pathname.startsWith(key + '/')) return val;
    }
    return 'GCC';
  };

  useEffect(() => {
    if (window.innerWidth < 768) return;
    gsap.set([panel1Ref.current, panel2Ref.current], { yPercent: 100 });
  }, []);

  useEffect(() => {
    // Skip on mobile — window width < 768px
    if (window.innerWidth < 768) return;

    const overlay = overlayRef.current;
    const p1 = panel1Ref.current;
    const p2 = panel2Ref.current;
    const label = labelRef.current;

    if (!overlay || !p1 || !p2) return;

    // Skip animation on very first mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const label_text = getRouteLabel(location.pathname);
    if (label) label.textContent = label_text;

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    // Phase 1: Panels sweep IN from bottom
    tl.set(overlay, { pointerEvents: 'all' })
      .set(p1, { yPercent: 100 })
      .set(p2, { yPercent: 100 })
      .set(label, { opacity: 0, y: 20 })
      .to(p1, { yPercent: 0, duration: 0.55 })
      .to(p2, { yPercent: 0, duration: 0.5 }, '-=0.45')
      .to(label, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2')

      // Phase 2: Hold briefly, then panels sweep OUT upward
      .to(label, { opacity: 0, y: -10, duration: 0.2 }, '+=0.25')
      .to(p2, { yPercent: -100, duration: 0.5, ease: 'power3.inOut' })
      .to(p1, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }, '-=0.45')
      .set(overlay, { pointerEvents: 'none' });

    return () => { tl.kill(); };
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99998] pointer-events-none overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {/* Panel 1 — back panel, slightly lighter */}
      <div
        ref={panel1Ref}
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-emerald-600 to-teal-800' 
            : 'bg-gradient-to-br from-emerald-500 to-emerald-400'
        }`}
      />
      {/* Panel 2 — front panel, darker emerald */}
      <div
        ref={panel2Ref}
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-slate-950' 
            : 'bg-slate-50'
        }`}
      >
        {/* Centered label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
          <div className={`w-8 h-[2px] transition-colors duration-500 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
          <span
            ref={labelRef}
            className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${
              isDark ? 'text-emerald-500' : 'text-slate-900'
            }`}
          />
          <div className={`w-8 h-[2px] transition-colors duration-500 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
        </div>

        {/* Corner decorations */}
        <div className={`absolute top-8 left-8 text-[10px] font-black tracking-[0.3em] transition-colors duration-500 ${
          isDark ? 'text-emerald-500/40' : 'text-slate-400/60'
        } uppercase`}>
          GCC
        </div>
        <div className={`absolute bottom-8 right-8 text-[10px] font-black tracking-[0.3em] transition-colors duration-500 ${
          isDark ? 'text-emerald-500/40' : 'text-slate-400/60'
        } uppercase tabular-nums`}>
          {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
