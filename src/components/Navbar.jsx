import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, LogOut, Users, 
  ArrowRight, Shield, Zap, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GccLogo from '../assets/logo/gcc logo.png';
import NotificationCenter from './NotificationCenter';

export default function Navbar({ theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background change
      setScrolled(currentScrollY > 20);

      // Visibility logic: show on up, hide on down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === 'events') {
      navigate('/events');
      return;
    }

    if (targetId === 'quiz') {
      navigate('/quiz');
      return;
    }

    if (targetId === 'live-rooms') {
      navigate('/live-rooms');
      return;
    }

    if (targetId === 'resources') {
      navigate('/resources');
      return;
    }

    if (targetId === 'leaderboard') {
      navigate('/leaderboard');
      return;
    }

    if (targetId === 'domains') {
      navigate('/domains');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Events', id: 'events' },
    { label: 'Resources', id: 'resources' },
    { label: 'Leaderboard', id: 'leaderboard' },
    { label: 'Arena', id: 'live-rooms' },
    { label: 'Quiz', id: 'quiz' },
    { label: 'Domains', id: 'domains' },
  ];

  // Determine active item loosely based on path
  const isActive = (id) => {
    if (id === 'home' && location.pathname === '/') return true;
    if (location.pathname.includes(id)) return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 
      ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent pt-[2vh]'} 
      ${visible ? 'translate-y-0' : '-translate-y-full'}
      flex flex-col pointer-events-auto`}
    >
      <div className="max-w-[1700px] w-full mx-auto px-[3vw] h-[8vh] min-h-[60px] max-h-[80px] flex items-center justify-between">
        
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-[0.8vw] group">
          <div className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] flex-shrink-0 relative bg-white rounded-lg flex items-center justify-center p-[0.2vw] shadow-sm border border-slate-100">
            <img src={GccLogo} alt="GCC Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-slate-900 font-black tracking-wide text-[clamp(14px,1.2vw,18px)] leading-tight uppercase">GAT Coding Club</span>
            <span className="text-slate-500 text-[clamp(8px,0.6vw,10px)] font-bold tracking-[0.2em] uppercase leading-tight">Code. Collaborate. Create.</span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-[2.5vw] absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const active = isActive(item.id);
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex flex-col items-center justify-center text-[clamp(12px,1vw,16px)] font-bold transition-colors duration-300 ${active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {item.label}
                {/* Green Dot for Active State */}
                <span className={`absolute -bottom-[1vh] w-[0.4vw] h-[0.4vw] min-w-[4px] min-h-[4px] rounded-full bg-[#1da039] transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
              </button>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-[1.5vw] z-10">
          <button
            onClick={toggleTheme}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-[1.5vw] h-[1.5vw] min-w-[20px] min-h-[20px]" /> : <Moon className="w-[1.5vw] h-[1.5vw] min-w-[20px] min-h-[20px]" />}
          </button>

          {/* Hardcoded notification for exact match in reference image */}
          <div className="relative cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">
            <Bell className="w-[1.5vw] h-[1.5vw] min-w-[20px] min-h-[20px]" />
            <div className="absolute -top-[0.2vw] -right-[0.2vw] w-[1vw] h-[1vw] min-w-[14px] min-h-[14px] bg-[#1da039] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#fafafa]">3</div>
          </div>

          {user ? (
            <div id="navbar-user-section" className="hidden md:flex items-center gap-[0.5vw] pl-[1vw] border-l border-slate-200">
              <Link 
                to="/profile" 
                className="w-[2.5vw] h-[2.5vw] min-w-[36px] min-h-[36px] rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 hover:border-[#1da039] transition-all"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-[1.2vw] h-[1.2vw] min-w-[18px] min-h-[18px] text-slate-400" />
                )}
              </Link>
              <button 
                onClick={handleLogout}
                className="w-[2.5vw] h-[2.5vw] min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-red-200"
              >
                <LogOut className="w-[1.2vw] h-[1.2vw] min-w-[18px] min-h-[18px]" />
              </button>
            </div>
          ) : (
            <Link 
              id="navbar-auth-button"
              to="/auth" 
              className="hidden sm:flex items-center gap-[0.5vw] px-[1.5vw] py-[1vh] rounded-full bg-white border border-green-200/60 text-slate-900 text-[clamp(12px,0.9vw,16px)] font-bold hover:border-[#1da039] hover:text-[#1da039] transition-all duration-300 group shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <Users className="w-[1vw] h-[1vw] min-w-[16px] min-h-[16px] text-[#1da039] transition-colors" /> Join GCC
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px]" /> : <Menu className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[8vh] min-top-[60px] max-top-[80px] bg-white z-[9999] transition-all duration-300 ease-in-out border-t border-slate-100
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col p-[5vw] gap-[3vh] pt-[4vh] h-[calc(100vh-8vh)] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-[2vh]">
            {user ? (
              <Link 
                to="/profile" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center justify-between py-[2vh] px-[5vw] rounded-2xl bg-[#1da039] text-white font-black text-sm shadow-lg shadow-[#1da039]/20"
              >
                MY PROFILE <Users className="w-5 h-5" />
              </Link>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="py-[2vh] px-[5vw] rounded-2xl bg-slate-50 border border-green-200 text-[#1da039] font-black text-center text-sm flex items-center justify-center gap-3">
                JOIN GCC CLUB <Users className="w-5 h-5" />
              </Link>
            )}
          </div>

          <div className="h-px bg-slate-100 my-[1vh]" />

          <div className="flex flex-col gap-[1vh]">
             <div className="flex items-center justify-between mb-[2vh]">
                <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">Navigation</span>
             </div>
             {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-xl font-bold text-slate-900 tracking-tight text-left py-[1.5vh] relative z-10"
                >
                  {item.label}
                </button>
              ))}
          </div>

          {user && (
            <div className="mt-auto pt-[3vh] pb-[4vh]">
              <button onClick={handleLogout} className="w-full py-[2vh] px-[5vw] rounded-2xl bg-red-50 text-red-500 font-black text-sm text-center border border-red-100 uppercase tracking-widest">LOGOUT</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


