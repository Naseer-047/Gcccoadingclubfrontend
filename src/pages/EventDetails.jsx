import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Globe, Users, Share2, 
  MapPin, Clock, CheckCircle2, Zap, Timer,
  AlertTriangle, Rocket, ChevronRight, Edit2,
  Award, ShieldAlert, Compass
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Event: ${event?.title}`,
          text: `Check out this upcoming event on GAT Coding Club: "${event?.title}"!`,
          url: window.location.href
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Share failed:', err);
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard! 📋');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };
  
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get(`/api/events/${id}`);
        if (res.data.success) {
          setEvent(res.data.event);
          if (user && res.data.event.attendees?.includes(user._id)) {
            setIsRegistered(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, user]);

  // Countdown Logic
  useEffect(() => {
    if (!event) return;
    
    const targetDate = new Date(event.date);
    
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [event]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Experience...</span>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black p-6">
        <div className="flex flex-col gap-6 text-center items-center max-w-md">
          <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500">
             <Calendar className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Event Not Found</h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">The event you are looking for does not exist or has been removed. Check the URL or return to home.</p>
          <Link to="/" className="px-10 py-4 rounded-xl bg-emerald-500 text-white font-black hover:scale-105 transition-transform shadow-xl uppercase tracking-widest text-[10px]">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pb-32 relative overflow-x-clip">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/5 dark:bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-10dvw] w-[40vw] h-[40vw] bg-cyan-500/5 dark:bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-4 relative z-10">
        <Link 
          to="/events" 
          className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-all duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Archive
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 mt-4 relative z-10">
        
        {/* Event Header Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Left Hero Card: Details & Image */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Visual Container */}
            <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/8 shadow-2xl bg-white dark:bg-slate-900 group">
              <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img 
                  src={event.image || 'https://via.placeholder.com/1200x675'} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                
                {/* Overlay details */}
                <div className="absolute top-6 left-6 flex items-center gap-2.5">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {event.category}
                  </span>
                  {!isExpired && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                    </div>
                  )}
                </div>

                <div className="absolute top-6 right-6">
                  <button 
                    onClick={handleShare}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 border border-white/10 hover:border-emerald-500 text-white transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                    title="Share Event"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom title info on image container */}
                <div className="absolute bottom-6 left-6 right-6 text-white md:hidden">
                  <h1 className="text-2xl font-black uppercase tracking-tight leading-tight">{event.title}</h1>
                </div>
              </div>
            </div>

            {/* Title & Metadata (Desktop) */}
            <div className="hidden md:flex flex-col gap-4 mt-2">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                {event.title}
              </h1>
              
              {/* Meta details list */}
              <div className="flex flex-wrap gap-6 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 px-4 py-2 rounded-xl shadow-sm">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 px-4 py-2 rounded-xl shadow-sm">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 px-4 py-2 rounded-xl shadow-sm">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span>{event.attendees?.length || 0} Registered</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Ticket Card */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[120px] z-20">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 rounded-[2rem] p-8 flex flex-col gap-6 shadow-xl">
              
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md ${isExpired ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                  {isExpired ? 'Closed' : isRegistered ? 'Registered' : 'Open'}
                </span>
              </div>

              {/* Countdown Component */}
              {!isExpired && (
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 text-center">Registration Ends In</span>
                  <div className="grid grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                    {[
                      { label: 'Days', val: timeLeft.days },
                      { label: 'Hours', val: timeLeft.hours },
                      { label: 'Mins', val: timeLeft.minutes },
                      { label: 'Secs', val: timeLeft.seconds }
                    ].map((t, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-2xl font-black text-slate-900 dark:text-white leading-none tabular-nums">{String(t.val).padStart(2, '0')}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If Expired warning details */}
              {isExpired && (
                <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 p-4 rounded-2xl text-red-500">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider">Event Concluded</span>
                    <span className="text-[9px] font-medium leading-relaxed opacity-80">Registrations for this technical segment are no longer being processed.</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isExpired ? (
                <button 
                  disabled
                  className="w-full py-4.5 rounded-xl text-[10px] font-black tracking-[0.2em] flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 uppercase cursor-not-allowed border border-slate-200 dark:border-white/5"
                >
                  REGISTRATION CLOSED
                </button>
              ) : (
                <Link 
                  to={`/register/event/${id}`}
                  className={`w-full py-4.5 rounded-xl text-[10px] font-black tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 uppercase shadow-lg text-center ${
                    isRegistered 
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20 border border-emerald-400' 
                      : 'bg-slate-950 text-white hover:bg-emerald-500 dark:bg-white dark:text-slate-900 dark:hover:bg-emerald-500 dark:hover:text-white'
                  }`}
                >
                  {isRegistered ? <><Edit2 className="w-3.5 h-3.5" /> Modify Registration</> : 'Secure Your Seat'}
                </Link>
              )}

              <div className="text-center">
                <span className="text-[9px] font-medium text-slate-400 leading-tight">
                  {isRegistered ? 'Need to adjust your details? Click above.' : 'Instant approval. E-ticket issued upon confirmation.'}
                </span>
              </div>

              </div>
            </div>
          </div>

        </div>

        {/* Detailed Content Section */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Overview / About */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2.5 text-slate-900 dark:text-white">
                <Compass className="w-5 h-5 text-emerald-500" /> Description
              </h2>
              <div className="h-px bg-slate-100 dark:bg-white/5 mb-6" />
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 shadow-sm flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Rocket className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">The Experience</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Join a dynamic collaborative space built to fast-track technical capabilities, solve live programming challenges, and network with elite peers.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 shadow-sm flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">Requirements</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Open to all active campus code builders. Laptop computer, dynamic curiosity, and a basic understanding of computer logic structures are required.
                </p>
              </div>

            </div>

            {/* Rules Block */}
            {event.rules && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2.5 text-slate-900 dark:text-white">
                  <ShieldAlert className="w-5 h-5 text-emerald-500" /> Guidelines & Rules
                </h2>
                <div className="h-px bg-slate-100 dark:bg-white/5 mb-6" />
                <div className="flex flex-col gap-4">
                  {event.rules.split('\n').map((rule, idx) => {
                    if (!rule.trim()) return null;
                    return (
                      <div key={idx} className="flex gap-3.5 items-start">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{rule}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar / Additional Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Host Details Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Host Institution</span>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 flex items-center justify-center font-black text-emerald-500 text-sm">
                  GAT
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 dark:text-white leading-tight">Global Academy of Technology</span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">Department of Computer Science</span>
                </div>
              </div>
            </div>

            {/* Perks / Inclusions */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Perks & Awards</span>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'E-Certificate of Participation', desc: 'Valid credential for resume building' },
                  { label: 'XP Points Boost', desc: 'Accelerates ranking on elite leaderboard' },
                  { label: 'Mentorship Access', desc: 'Direct connection with core division heads' }
                ].map((perk, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Award className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-900 dark:text-white leading-tight">{perk.label}</span>
                      <span className="text-[9px] text-slate-400 font-medium mt-0.5">{perk.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
