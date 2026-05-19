import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../hooks/useOnboarding';
import AnimatedBackground from '../components/AnimatedBackground';
import DrGirish from '../assets/Dr. Girish Rao Salanke N S.png';
import ProfAshoka from '../assets/Prof. Ashoka S.png';
import ProfRavindranath from '../assets/Prof. R C Ravindranath.png';
import ProfSharadadevi from '../assets/Prof. Sharadadevi Kaganurmath.png';
import ProfSharmila from '../assets/Prof. Sharmila Chidaravalli.png';
import ProfVasugi from '../assets/Prof. Vasugi I.png';
import RecruitmentBanner from '../assets/banners/gcc-club-recruitment-instagram.webp';
import WorkshopBanner1 from '../assets/banners/workshop 1.webp';
import GccLogo from '../assets/logo/gcc logo.png';
import { 
  Code, Menu, X, ArrowLeft, ArrowRight, Sun, Moon, Sparkles, Terminal as TerminalIcon, Shield, Layers, Award, Users, ChevronRight, Check, Calendar, Globe, MessageSquare, ArrowBigUp, Monitor, Zap, Video, Mic, Sword, BookOpen, Rocket, Trophy
} from 'lucide-react';
import { Github, Instagram, Linkedin } from '../components/Icons';
import HeroTerminal from '../components/HeroTerminal';
import BannerSpotlight from '../components/BannerSpotlight';
import Magnetic from '../components/Magnetic';
import socket from '../utils/socket';
import ThreeGridTunnel from '../components/ThreeGridTunnel';
import useScrollReveal from '../hooks/useScrollReveal';


const CodeNebula = () => {
  const codeSnippets = [
    { text: 'async await', color: 'text-emerald-500', top: '15%', left: '10%', scale: 1.2, delay: 0 },
    { text: '=>', color: 'text-cyan-400', top: '25%', left: '80%', scale: 1.5, delay: 2 },
    { text: '{...}', color: 'text-amber-400', top: '65%', left: '15%', scale: 1.3, delay: 1 },
    { text: 'GCC.init()', color: 'text-emerald-400', top: '75%', left: '75%', scale: 1.1, delay: 3 },
    { text: 'const', color: 'text-purple-400', top: '45%', left: '5%', scale: 1.4, delay: 0.5 },
    { text: 'return', color: 'text-rose-400', top: '10%', left: '60%', scale: 1.2, delay: 1.5 },
    { text: '<html>', color: 'text-blue-400', top: '85%', left: '40%', scale: 1.6, delay: 2.5 },
    { text: '[ ]', color: 'text-emerald-500', top: '55%', left: '90%', scale: 1.4, delay: 0.2 },
    { text: 'await GAT()', color: 'text-cyan-500', top: '35%', left: '70%', scale: 1.3, delay: 1.8 },
    { text: 'import { Node }', color: 'text-slate-400', top: '80%', left: '10%', scale: 1.1, delay: 0.7 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {codeSnippets.map((snippet, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3, 0.7, 0.4],
            scale: [snippet.scale, snippet.scale * 1.05, snippet.scale],
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: snippet.delay,
            ease: "easeInOut"
          }}
          className={`absolute font-black font-mono select-none tracking-tighter ${snippet.color}`}
          style={{ 
            top: snippet.top, 
            left: snippet.left,
            fontSize: `${20 * snippet.scale}px`,
            textShadow: '0 0 10px currentColor'
          }}
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: snippet.delay + 1, ease: "steps(12)" }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            {snippet.text}
          </motion.span>
        </motion.div>
      ))}
      
      {/* Neural Network Connections (Subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.07]">
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Central focus glow (Cleaned for White Backgrounds) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,23,42,0.6)_100%)]" />
    </div>
  );
};

const StaticCodeNebula = () => {
  const codeSnippets = [
    { text: 'async await', color: 'text-emerald-500/20', top: '15%', left: '10%', scale: 1.2 },
    { text: '=>', color: 'text-cyan-400/20', top: '25%', left: '80%', scale: 1.5 },
    { text: '{...}', color: 'text-amber-400/20', top: '65%', left: '15%', scale: 1.3 },
    { text: 'GCC.init()', color: 'text-emerald-400/20', top: '75%', left: '75%', scale: 1.1 },
    { text: 'const', color: 'text-purple-400/20', top: '45%', left: '5%', scale: 1.4 },
    { text: 'return', color: 'text-rose-400/20', top: '10%', left: '60%', scale: 1.2 },
    { text: '<html>', color: 'text-blue-400/20', top: '85%', left: '40%', scale: 1.6 },
  ];
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
      {codeSnippets.map((snippet, idx) => (
        <div
          key={idx}
          className={`absolute font-black font-mono select-none tracking-tighter ${snippet.color}`}
          style={{ 
            top: snippet.top, 
            left: snippet.left,
            fontSize: `${20 * snippet.scale}px`,
          }}
        >
          {snippet.text}
        </div>
      ))}
    </div>
  );
};

const SplitText = ({ text, className }) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <span key={i} className={`char inline-block ${char === ' ' ? 'w-[0.25em]' : ''}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const MobileHero = ({ banners }) => {
  const navigate = useNavigate();

  return (
    <section className="md:hidden relative h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden bg-transparent">
      
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-sm">
        <div className="flex flex-col gap-4 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-max px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            GAT Coding Club
          </motion.div>
          
          <motion.h1 
            id="mobile-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[3.2rem] font-bold tracking-tighter leading-[0.85] text-slate-950 dark:text-white"
          >
            Learn <span className="text-emerald-500 dark:text-emerald-400">coding.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-normal max-w-[280px] leading-relaxed text-slate-500 dark:text-slate-400 mt-2"
          >
            Build the projects of your dreams to scale your skills and career, <span className="text-emerald-500 dark:text-emerald-400 font-semibold">infinitely</span>
          </motion.p>
        </div>

        <div className="flex items-center gap-6 mt-2">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/domains')}
            className="rounded-full px-6 py-3 text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/15"
          >
            Explore Domains
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
          >
            Our Mission <span>→</span>
          </motion.button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40">
        <ArrowRight className="w-6 h-6 rotate-90 text-emerald-500" />
      </div>
    </section>
  );
};

gsap.registerPlugin(ScrollTrigger);

const IconMap = {
  Code: <Code className="w-14 h-14" />,
  Sparkles: <Sparkles className="w-14 h-14" />,
  Terminal: <TerminalIcon className="w-14 h-14" />,
  Layers: <Layers className="w-14 h-14" />,
  Shield: <Shield className="w-14 h-14" />,
  Globe: <Globe className="w-14 h-14" />
};

function QuizSection() {
  return (
    <section id="quiz" className="panel py-24 md:py-32 px-6 relative z-10 border-t border-black/5 dark:border-white/5 overflow-hidden bg-white dark:bg-slate-950 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center animate-on-scroll">
        <div className="flex-1 flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand flex items-center gap-2">
            <Code className="w-3.5 h-3.5" /> Challenge Arena
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            Test Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
              Coding
            </span>{' '}
            Skills
          </h2>
          <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
            Quick-fire coding questions covering Python, JavaScript, C++ and more. Pick the right answer, see the explanation, and track your score.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { label: '20+ Questions', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
              { label: '3 Difficulty Levels', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
              { label: 'Arena', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
            ].map(({ label, color }) => (
              <span key={label} className={`px-4 py-1.5 rounded-full text-xs font-black border ${color}`}>
                {label}
              </span>
            ))}
          </div>

          <Link to="/quiz" className="w-max px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl hover:shadow-emerald-500/20">
            Start Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex-1 w-full max-w-lg">
          <div className="flex flex-col items-center mt-20 md:mt-24 lg:mt-32">
             <div className="relative mb-6">
                <div className="absolute inset-0 blur-2xl opacity-20 bg-emerald-500 rounded-full animate-pulse" />
             </div>
             <div className="glass-panel p-6 md:p-8 flex flex-col gap-5 select-none pointer-events-none relative">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black border bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Medium</span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-black border bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-black/5 dark:border-white/5">JavaScript</span>
                </div>
                <span className="text-xs font-black text-slate-400 tracking-widest">Q 1 / 5</span>
              </div>

              <p className="text-sm font-bold text-slate-900 dark:text-white">What does <code className="text-brand bg-brand/10 px-1.5 py-0.5 rounded-md font-mono text-xs">typeof null</code> return in JavaScript?</p>

              <div className="bg-slate-950 rounded-xl overflow-hidden border border-white/10">
                <div className="px-4 py-2 bg-slate-900 border-b border-white/5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-bold text-slate-500">Q 1 / 5</span>
                </div>
                <pre className="px-5 py-4 text-xs font-mono text-cyan-300">console.log(typeof null);</pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["'null'", "'undefined'", "'object'", "'boolean'"].map((opt, i) => (
                  <div key={i} className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-xs font-bold ${i === 2 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400'}`}>
                    <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[9px] font-black flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Home({ theme }) {
  useScrollReveal();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { startHomeTour } = useOnboarding();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [showAllDomains, setShowAllDomains] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'Starting GAT Club System...', type: 'system' },
    { text: 'Type "help" to see what you can do.', type: 'info' }
  ]);
  const [activeTab, setActiveTab] = useState('events');
  const [banners, setBanners] = useState([]);
  const activeBanners = banners.filter(b => {
    if (!b.targetDate) return true;
    return new Date(b.targetDate).getTime() > Date.now();
  });
  const [showBanner, setShowBanner] = useState(() => {
    return !sessionStorage.getItem('gcc_banner_closed');
  });

  const [loadingBanners, setLoadingBanners] = useState(true);
  const [events, setEvents] = useState([]);
  const [domains, setDomains] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [domainsLoading, setDomainsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const termRef = useRef(null);

  useEffect(() => {
    fetchEvents();
    fetchDomains();
    fetchRooms();
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    // Only start tour if not loading basic data to ensure elements exist
    if (!domainsLoading && !eventsLoading) {
      startHomeTour(
        () => setIsTourRunning(true),
        () => setIsTourRunning(false)
      );
    }
  }, [domainsLoading, eventsLoading]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('/api/users/leaderboard');
      if (res.data.success) {
        setLeaderboard(res.data.users || []);
      }
    } catch (err) {
      console.error('Error fetching leaderboard', err);
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      if (res.data.success && Array.isArray(res.data.events)) {
        setEvents(res.data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching events', err);
    } finally {
      setEventsLoading(false);
    }
  };


  const fetchDomains = async () => {
    try {
      const res = await axios.get('/api/domains');
      if (res.data.success) {
        setDomains(res.data.domains);
      }
    } catch (err) {
      console.error('Error fetching domains', err);
    } finally {
      setDomainsLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/api/live-rooms');
      setRooms(res.data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching rooms', err);
    } finally {
      setRoomsLoading(false);
    }
  };

  // Removed scrollDomains function

  // Removed drag-to-scroll logic for Domains
  useEffect(() => {
    // Removed Domain Horizontal Scroll GSAP
    
    // Digital Nexus Reveal Animation
    const nexusReveals = document.querySelectorAll('.nexus-reveal');
      
    // Removed Mobile wiggle hint

    const blade = document.querySelector('.nexus-blade');
    if (nexusReveals.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#nexus',
          start: 'top 60%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.to(nexusReveals, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out'
      });

      if (blade) {
        tl.fromTo(blade, 
          { top: '0%', opacity: 0 },
          { top: '100%', opacity: 1, duration: 1.5, ease: 'power2.inOut' },
          '-=1'
        ).to(blade, { opacity: 0, duration: 0.5 });
      }
    }
  }, [domainsLoading]);

  useEffect(() => {
    let interval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Hero Reveal Animation
  useEffect(() => {
    if (loading) return;

    const tl = gsap.timeline();
    tl.to('#hero-door-l', { x: '-100%', duration: 1.5, ease: 'power4.inOut', delay: 0.2 })
      .to('#hero-door-r', { x: '100%', duration: 1.5, ease: 'power4.inOut' }, '-=1.5')
      .fromTo('#hero-title', { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' }, '-=0.8')
      .fromTo('#hero-subtitle', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }, '-=1.2')
      .fromTo('#hero-actions', { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' }, '-=1.2');
  }, [loading]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get('/api/banners');
        if (res.data.success) setBanners(res.data.banners);
      } catch (err) {
        console.error('Failed to fetch banners:', err);
      } finally {
        setLoadingBanners(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <div className="relative font-sans select-none overflow-x-clip min-h-screen">
      {/* Shared WebGL Background - Mounted exactly once to save GPU memory & avoid lag */}
      <div className="absolute top-0 left-0 right-0 h-[100dvh] pointer-events-none z-0">
        <ThreeGridTunnel />
      </div>
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader"
            id="preloader" 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black font-sans select-none overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 1 }}
              animate={counter === 100 ? { opacity: 0, y: -20 } : {}}
              className="relative flex flex-col items-center max-w-lg w-full px-8 gap-6"
            >
              <div className="flex justify-between items-baseline w-full">
                <span className="text-sm font-mono tracking-widest text-brand font-black uppercase">GAT CLUB</span>
                <span className="text-6xl md:text-8xl font-black font-sans text-slate-900 dark:text-white tracking-tight leading-none tabular-nums select-none flex items-start">
                  {counter < 10 ? `0${counter}` : counter}
                  <span className="text-xl md:text-2xl text-brand font-light ml-1">%</span>
                </span>
              </div>

              <div className="w-full h-1.5 md:h-2 bg-slate-200/80 rounded-full overflow-hidden backdrop-blur-md border border-black/5 relative flex items-center">
                <div 
                  id="preloader-line-fill" 
                  className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-400 rounded-full transition-all duration-300 ease-out flex items-center justify-end relative select-none"
                  style={{ width: `${counter}%` }}
                >
                  <div className="w-4 h-4 rounded-full bg-white absolute -right-1 filter drop-shadow-[0_0_10px_#10b981]"></div>
                </div>
              </div>

              <div className="flex justify-between items-center w-full text-xs font-mono font-bold tracking-widest text-slate-600 uppercase select-none">
                <span className="animate-pulse">
                  {counter < 30 && 'Initializing Core Systems'}
                  {counter >= 30 && counter < 60 && 'Constructing Nodes & Pipelines'}
                  {counter >= 60 && counter < 90 && 'Compiling Premium Sections'}
                  {counter >= 90 && counter <= 100 && 'Launch Imminent'}
                </span>
                <span className="text-brand/80">v1.0.0</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showBanner && activeBanners.length > 0 && (
        <div className={`absolute top-[8rem] left-0 right-0 z-[1001] pointer-events-none transition-opacity duration-500 ${isTourRunning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pointer-events-auto">
            <BannerSpotlight banners={activeBanners} />
          </div>
        </div>
      )}      {/* DESKTOP HERO */}
      <section id="hero" className={`hidden md:flex md:sticky md:top-0 md:z-0 min-h-[100vh] flex-col items-center justify-center pb-6 px-6 overflow-hidden bg-transparent ${(showBanner && activeBanners.length > 0) ? 'pt-24 md:pt-32' : 'pt-32 md:pt-40'}`}>
        {/* Shutter Doors */}
        <div id="hero-door-l" className="hero-door hero-door-left"></div>
        <div id="hero-door-r" className="hero-door hero-door-right"></div>
 
        <div id="home-content" className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6 w-full relative z-20">
          <div className="flex flex-col gap-6 items-center">
            <h1 id="hero-title" className="text-[5rem] md:text-[7rem] lg:text-[8rem] leading-[0.85] font-black tracking-tighter text-slate-950 dark:text-white mb-2">
              Learn <span className="text-emerald-500 dark:text-emerald-400">coding.</span>
            </h1>
            <p id="hero-subtitle" className="text-lg md:text-xl font-normal max-w-xl leading-relaxed mb-6 text-slate-500 dark:text-slate-400">
              Build the projects of your dreams to scale your skills and career, <span className="text-emerald-500 dark:text-emerald-400 font-semibold">infinitely</span>
            </p>
          </div>

          <div id="hero-actions" className="flex items-center gap-6 mt-2">
            <Magnetic strength={0.3}>
              <Link 
                to="/domains"
                className="rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-300 bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.25)] dark:shadow-[0_8px_20px_rgba(16,185,129,0.15)]"
              >
                Explore Domains
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.2}>
              <button 
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
              >
                Our Mission <span>→</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* MOBILE HERO (The Magnet) */}
      <MobileHero banners={activeBanners} />
      {/* Stats Overlay for Desktop */}
      <div className="hidden lg:block pointer-events-none relative">
        <div className="absolute right-[4vw] bottom-[10dvh] flex flex-col gap-8 items-end text-right z-30">
           <div className="flex flex-col gap-1.5 group animate-on-scroll items-end text-right">
             <div className="w-6 h-[2px] bg-emerald-500 mb-1"></div>
             <span className="text-4xl font-black text-emerald-500 dark:text-emerald-400 leading-none">500+</span>
             <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">Members</span>
           </div>
           <div className="flex flex-col gap-1.5 group animate-on-scroll items-end text-right">
             <div className="w-6 h-[2px] bg-emerald-500 mb-1"></div>
             <span className="text-4xl font-black text-emerald-500 dark:text-emerald-400 leading-none">15+</span>
             <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">Projects</span>
           </div>
        </div>
      </div>

      <section id="about" className="relative z-20 py-16 md:py-32 px-4 sm:px-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-slate-950 select-none overflow-x-clip">
        <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-[20px] z-0" />
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 md:gap-16 relative z-10">
          <div id="about-left" className="lg:col-span-5">
            <div className="lg:sticky lg:top-[120px] flex flex-col gap-6 md:gap-8 animate-on-scroll">
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> WHO WE ARE
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white char-reveal">
                <SplitText text="About Our " />
                <span className="text-emerald-500">
                  <SplitText text="Club" />
                </span>
              </h2>
              <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed animate-on-scroll">
                We are a group of students who love technology. We work together to learn new skills and build amazing software projects.
              </p>
              <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed animate-on-scroll">
                We organize workshops and competitions to help students get better at coding. We believe in learning by doing and help everyone build projects that solve real problems.
              </p>
            </div>
          </div>

            <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
              <div className="glass-panel p-8 md:p-12 flex flex-col gap-6 animate-on-scroll hover:scale-[1.02] transition-transform duration-500">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                    <span className="text-yellow-400 text-3xl select-none">★</span> Vision
                  </h3>
                </div>
                <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  To build a community where everyone can learn coding, build cool things, and get ready for a great career in technology.
                </p>
              </div>

              <div className="glass-panel p-8 md:p-12 flex flex-col gap-8 animate-on-scroll hover:scale-[1.02] transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                  <span className="text-green-500 font-bold select-none text-2xl">✓</span> Mission
                </h3>
                <div className="flex flex-col gap-6">
                  {[
                    { title: 'Learn and Grow', desc: 'Join our regular coding sessions and workshops to learn new skills.' },
                    { title: 'Build Projects', desc: 'Work on real projects and join coding competitions.' },
                    { title: 'Career Help', desc: 'Get guidance on resumes and interviews to get ready for jobs.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="text-green-500 font-bold select-none mt-0.5">✓</span>
                      <div className="flex flex-col gap-1">
                        <span className="text-base md:text-lg font-black text-slate-900 dark:text-white leading-tight">{item.title}</span>
                        <span className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 md:p-12 flex flex-col gap-8 animate-on-scroll hover:scale-[1.02] transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                  <span className="text-brand font-bold select-none text-2xl">→</span> Objectives
                </h3>
                <div className="flex flex-col gap-6">
                  {[
                    'Learn new technology through projects and workshops.',
                    'Work together and help each other grow.',
                    'Help our college grow through technology.'
                  ].map((desc, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="text-brand font-bold select-none mt-0.5">→</span>
                      <span className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900 z-20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:44px_44px] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 dark:bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 animate-on-scroll">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500">The Ecosystem</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.88] text-slate-900 dark:text-white">
                Specialized<br />
                <span className="text-emerald-500">Domains.</span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium">
                Elite divisions with dedicated tools, mentorship, and high-impact projects.
              </p>
            </div>
            <Link to="/domains" className="group hidden md:flex items-center gap-2 self-end px-6 py-3 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300">
              All Domains <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domainsLoading ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl animate-pulse bg-slate-200 dark:bg-slate-800" />
            )) : domains.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <Zap className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">No domains yet</p>
              </div>
            ) : domains.slice(0, 4).map((domain, idx) => (
              <div key={domain._id} className="group relative flex flex-col bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/8 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/8 transition-all duration-400 animate-on-scroll" style={{ transitionDelay: `${idx * 70}ms` }}>
                {/* Index */}
                <span className="absolute top-4 right-5 text-[10px] font-black text-slate-300 dark:text-slate-700 tabular-nums">{String(idx + 1).padStart(2, '0')}</span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-5 group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-all duration-300">
                  {IconMap[domain.icon] || <Layers className="w-5 h-5" />}
                </div>

                {/* Status dot */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Active</span>
                </div>

                {/* Title & desc */}
                <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{domain.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">{domain.desc}</p>

                {/* Buttons */}
                <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-white/5">
                  <Link to={`/register/domain/${domain._id}`} className="flex-1 py-2 rounded-lg bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors text-center">Join</Link>
                  <Link to={`/domain/${domain.slug}`} className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-center">Details</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="flex md:hidden justify-center mt-10">
            <Link to="/domains" className="flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
              All Domains <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden z-20">
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-on-scroll">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-500">Activity Log</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.88]">
                Latest<br />
                <span className="text-emerald-500">Activities.</span>
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                From hackathons to workshops and elite recruitment drives.
              </p>
            </div>
            <Link
              to="/events"
              className="group hidden md:flex items-center gap-3 self-end px-7 py-3.5 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
            >
              Full Archive <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Event Cards */}
          <div className="flex flex-col gap-5">
            {eventsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-[140px] rounded-2xl animate-pulse bg-slate-200 dark:bg-slate-800" />
              ))
            ) : events.length === 0 ? (
              <div className="py-24 text-center">
                <Zap className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">No Active Transmissions</h3>
              </div>
            ) : (
              events.filter(ev => ev.isActive !== false).slice(0, 4).map((item, idx) => (
                <div
                  key={item._id}
                  className="group relative flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-emerald-500/40 bg-white dark:bg-slate-900 transition-all duration-400 hover:shadow-lg hover:shadow-emerald-500/8 animate-on-scroll"
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  {/* Image panel */}
                  <div className="relative md:w-64 lg:w-80 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image || 'https://via.placeholder.com/600x400'}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/60 dark:from-slate-900/0 dark:to-slate-900/60 md:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-900/80 to-transparent md:hidden" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                      {item.type || item.category || 'Event'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col md:flex-row items-stretch justify-between gap-6 p-6 md:p-8">
                    <div className="flex flex-col justify-between gap-4 flex-1">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-2">
                          {item.description || 'An elite technical gathering hosted by GAT Coding Club.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {item.venue && (
                          <span className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-emerald-500" />
                            {item.venue}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col items-center justify-start md:justify-center gap-3 flex-shrink-0">
                      <Link
                        to={`/register/event/${item._id}`}
                        className="px-5 py-2.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 active:scale-95 transition-all text-center whitespace-nowrap"
                      >
                        Register
                      </Link>
                      <Link
                        to={`/event/${item._id}`}
                        className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[9px] font-black uppercase tracking-widest hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-center whitespace-nowrap"
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                  {/* Index */}
                  <div className="absolute bottom-4 right-6 text-[10px] font-black text-slate-400 dark:text-slate-700 tabular-nums tracking-widest group-hover:text-emerald-500/40 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mobile view all */}
          <div className="flex md:hidden justify-center mt-10">
            <Link
              to="/events"
              className="flex items-center gap-2 px-7 py-3 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              Full Archive <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Coding Hub / Live Rooms Teaser */}
      <section id="live-rooms-preview" className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900 z-20">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:44px_44px] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-400/5 dark:bg-emerald-500/8 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Content */}
            <div className="flex flex-col gap-7 animate-on-scroll order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
                  <Video className="w-3.5 h-3.5" /> Live Community Arena
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.88] text-slate-900 dark:text-white">
                Code Together,<br />
                <span className="text-emerald-500">Live.</span>
              </h2>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                Engage with fellow developers in real-time. From technical workshops to coding marathons and intense debates — the Arena is where the club comes alive.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Real-time Interaction', icon: '⚡' },
                  { label: 'Voice & Video', icon: '🎙️' },
                  { label: 'Screen Share', icon: '🖥️' },
                ].map(({ label, icon }) => (
                  <span key={label} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                    {icon} {label}
                  </span>
                ))}
              </div>

              <Link
                to="/live-rooms"
                className="group w-max flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 text-white text-sm font-black uppercase tracking-widest hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
              >
                Enter Arena <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: Live Room Preview Card */}
            <div className="order-1 lg:order-2 animate-on-scroll">
              <div className="relative bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/8 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-black/40">
                {/* Top glow accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl -translate-y-12 translate-x-12 pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                    </span>
                    <span className="px-3 py-1 rounded-full text-[9px] font-black bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase tracking-widest">Coding Room</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-xs font-black">12 Active</span>
                  </div>
                </div>

                {/* Room Info */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5">
                  <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight mb-4">System Architecture Deep Dive</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2.5">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">+8</div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">In session · 48m</span>
                  </div>
                </div>

                {/* Terminal */}
                <div className="bg-slate-950 m-4 rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Streaming Terminal</span>
                  </div>
                  <div className="font-mono text-xs space-y-1.5">
                    <div className="flex gap-3"><span className="text-slate-600 select-none">01</span><span><span className="text-pink-400">async function</span> <span className="text-blue-400">optimizePipeline</span><span className="text-slate-300">() {'{'}</span></span></div>
                    <div className="flex gap-3"><span className="text-slate-600 select-none">02</span><span className="text-slate-300">&nbsp;&nbsp;<span className="text-pink-400">const</span> nodes = <span className="text-pink-400">await</span> <span className="text-blue-400">fetchNodes</span>();</span></div>
                    <div className="flex gap-3"><span className="text-slate-600 select-none">03</span><span className="text-slate-300">&nbsp;&nbsp;<span className="text-pink-400">return</span> nodes.<span className="text-blue-400">map</span>(n <span className="text-pink-400">=&gt;</span> n.<span className="text-yellow-400">id</span>);</span></div>
                    <div className="flex gap-3"><span className="text-slate-600 select-none">04</span><span className="text-emerald-400">{'}'} <span className="text-slate-600 animate-pulse">█</span></span></div>
                  </div>
                </div>

                {/* Join CTA inside card */}
                <div className="px-4 pb-4">
                  <Link to="/live-rooms" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-500 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors">
                    <Video className="w-3.5 h-3.5" /> Join Room
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <QuizSection />

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-24 md:py-32 px-6 relative z-20 overflow-hidden bg-white dark:bg-slate-950">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:44px_44px] opacity-[0.025] dark:opacity-[0.04]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/5 dark:bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 animate-on-scroll">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500">Global Rankings</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.88] text-slate-900 dark:text-white">
                Elite<br />
                <span className="text-emerald-500">Leaderboard.</span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium">
                The top performers competing for dominance in the GAT ecosystem.
              </p>
            </div>
            <Link to="/leaderboard" className="group hidden md:flex items-center gap-2 self-end px-6 py-3 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all duration-300">
              Full Rankings <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Top 3 Podium */}
          {!leaderboardLoading && (leaderboard || []).length >= 3 && (
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 animate-on-scroll">
              {/* 2nd place */}
              {[leaderboard[1], leaderboard[0], leaderboard[2]].map((row, podiumIdx) => {
                const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
                const medals = ['🥈', '🥇', '🥉'];
                const heights = ['pt-6', 'pt-0', 'pt-8'];
                const rings = ['border-slate-300 dark:border-slate-600', 'border-emerald-400', 'border-amber-600/60'];
                if (!row) return <div key={podiumIdx} />;
                return (
                  <div key={row._id} className={`flex flex-col items-center gap-3 ${heights[podiumIdx]}`}>
                    <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 ${rings[podiumIdx]} overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg`}>
                      {row.avatar
                        ? <img src={row.avatar} className="w-full h-full object-cover" alt="" />
                        : <span className="w-full h-full flex items-center justify-center font-black text-xl text-slate-500">{row.name?.charAt(0)}</span>
                      }
                    </div>
                    <span className="text-xl">{medals[podiumIdx]}</span>
                    <div className="text-center">
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[80px] md:max-w-[120px]">{row.name}</p>
                      <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">{row.totalPoints || 0} XP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Ranked List */}
          <div className="flex flex-col gap-2 animate-on-scroll">
            {leaderboardLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-16 rounded-2xl animate-pulse bg-slate-100 dark:bg-slate-900" />
              ))
            ) : (leaderboard || []).length === 0 ? (
              <div className="py-20 text-center">
                <Zap className="w-10 h-10 text-slate-200 dark:text-slate-800 mx-auto mb-3" />
                <p className="text-sm font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">No Rankings Yet</p>
              </div>
            ) : (
              leaderboard.slice(0, 8).map((row, idx) => {
                const maxPts = leaderboard[0]?.totalPoints || 1;
                const pct = Math.min(100, Math.round(((row.totalPoints || 0) / maxPts) * 100));
                const rankColors = ['text-yellow-500', 'text-slate-400', 'text-amber-700', ''];
                const bgAccents = ['bg-yellow-500/5 dark:bg-yellow-500/5', 'bg-slate-500/5 dark:bg-slate-500/5', 'bg-amber-700/5 dark:bg-amber-700/5', ''];
                return (
                  <div
                    key={row._id}
                    className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-100 dark:border-white/5 ${bgAccents[idx] || 'bg-slate-50 dark:bg-slate-900/60'} hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300`}
                  >
                    {/* Rank */}
                    <span className={`w-8 text-center text-sm font-black tabular-nums ${rankColors[idx] || 'text-slate-400 dark:text-slate-600'}`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0 border border-slate-200 dark:border-white/5">
                      {row.avatar
                        ? <img src={row.avatar} className="w-full h-full object-cover" alt="" />
                        : <span className="w-full h-full flex items-center justify-center font-black text-sm text-slate-500">{row.name?.charAt(0)}</span>
                      }
                    </div>

                    {/* Name + meta */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{row.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{row.department} · {row.year}</p>
                    </div>

                    {/* XP + bar */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">{row.totalPoints || 0}</span>
                      <div className="w-20 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Mobile CTA */}
          <div className="flex md:hidden justify-center mt-10">
            <Link to="/leaderboard" className="flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
              Full Rankings <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Team Accordion Section */}
      <section id="team" className="py-16 md:py-32 px-4 sm:px-6 relative z-20 bg-slate-50 dark:bg-slate-900 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          {/* Header Section */}
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto animate-on-scroll">
            <span className="text-sm font-bold uppercase tracking-widest text-brand">Our Team</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight char-reveal">
              Meet the People Behind <span className="text-emerald-500">GAT Club</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto animate-on-scroll">The teachers and students who make everything happen.</p>
          </div>

          {/* Faculty Mentor Spotlight */}
          <div className="flex flex-col gap-10 animate-on-scroll">
            <h3 className="text-center text-xs font-black tracking-widest text-slate-400 uppercase">Faculty Mentor</h3>
            <div className="flex justify-center">
              <div className="glass-panel group max-w-4xl w-full p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl">
                  <img src={DrGirish} alt="Dr. Girish Rao Salanke N S" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-4 text-center md:text-left flex-1">
                  <h4 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Dr. Girish Rao Salanke N S</h4>
                  <span className="text-lg font-bold text-brand">Faculty Mentor</span>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    "Guiding students to become great engineers and leaders."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty Coordinators Grid */}
          <div className="flex flex-col gap-12 animate-on-scroll">
            <h3 className="text-center text-xs font-black tracking-widest text-slate-400 uppercase">Faculty Coordinators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20">
              {[
                { name: 'Prof. Ashoka S', role: 'Faculty Coordinator', img: ProfAshoka, dept: 'AIDS' },
                { name: 'Prof. Vasugi I', role: 'Faculty Coordinator', img: ProfVasugi, dept: 'AIML' },
                { name: 'Prof. R C Ravindranath', role: 'Faculty Coordinator', img: ProfRavindranath, dept: 'CSE' },
                { name: 'Prof. Sharadadevi Kaganurmath', role: 'Faculty Coordinator', img: ProfSharadadevi, dept: 'CS-AIML' },
                { name: 'Prof. Sharmila Chidaravalli', role: 'Faculty Coordinator', img: ProfSharmila, dept: 'ISE' },
              ].map((member, idx) => (
                <div key={idx} className="flex flex-col items-center gap-6 text-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">{member.name}</h4>
                    <span className="text-sm font-bold text-brand">{member.dept} Department</span>
                    <span className="text-xs font-medium text-slate-500">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Teams */}
          <div className="flex flex-col md:flex-row gap-8 justify-center mt-12 animate-on-scroll">
            <div className="px-12 py-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center flex-1 max-w-md">
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Core Team</h4>
              <p className="text-sm font-bold text-brand uppercase tracking-widest">Coming Soon</p>
            </div>
            <div className="px-12 py-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center flex-1 max-w-md">
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Sub Core Team</h4>
              <p className="text-sm font-bold text-brand uppercase tracking-widest">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is handled globally in App.jsx */}
    </div>
  );
}
