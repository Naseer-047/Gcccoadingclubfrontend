import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Globe, ArrowLeft, ArrowRight, 
  Zap, Search, Sparkles, Filter, CalendarDays,
  Layers, MapPin, Users, Trophy, Terminal,
  MessageSquare, HelpCircle, X, ChevronDown, Award
} from 'lucide-react';
import axios from 'axios';
import useScrollReveal from '../hooks/useScrollReveal';

const CategoryIcons = {
  all: Layers,
  workshop: Terminal,
  hackathon: Trophy,
  talk: MessageSquare,
  competition: Zap,
  meetup: Users,
  other: Sparkles
};

export default function Events() {
  useScrollReveal();
  
  // Advanced filters state
  const [eventCategory, setEventCategory] = useState('all');
  const [eventTimeFilter, setEventTimeFilter] = useState('all');
  const [eventFormatFilter, setEventFormatFilter] = useState('all');
  const [eventCostFilter, setEventCostFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
    window.scrollTo(0, 0);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      if (res.data.success) {
        setEvents(res.data.events);
      }
    } catch (err) {
      console.error('Error fetching events', err);
    } finally {
      setLoading(false);
    }
  };

  // Advanced Filtering Logic
  const filteredEvents = events.filter(item => {
    // 1. Search Query
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase());
      
    // 2. Category
    const matchesCategory = eventCategory === 'all' || 
      item.category?.toLowerCase() === eventCategory.toLowerCase();
      
    // 3. Time status
    const eventDate = new Date(item.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let matchesTime = true;
    if (eventTimeFilter === 'upcoming') matchesTime = eventDate >= today;
    else if (eventTimeFilter === 'past') matchesTime = eventDate < today;
    
    // 4. Venue Format (Online / In-Person)
    let matchesFormat = true;
    if (eventFormatFilter === 'online') {
      matchesFormat = item.venue?.toLowerCase() === 'online';
    } else if (eventFormatFilter === 'in-person') {
      matchesFormat = item.venue?.toLowerCase() !== 'online';
    }
    
    // 5. Cost (Free / Paid)
    let matchesCost = true;
    if (eventCostFilter === 'free') {
      matchesCost = !item.price || item.price === 0;
    } else if (eventCostFilter === 'paid') {
      matchesCost = item.price > 0;
    }
    
    return matchesSearch && matchesCategory && matchesTime && matchesFormat && matchesCost && item.isActive !== false;
  });

  const predefinedCategories = ['all', 'Workshop', 'Hackathon', 'Talk', 'Competition', 'Meetup', 'Other'];

  const getCategoryCount = (cat) => {
    return events.filter(item => {
      if (item.isActive === false) return false;
      if (cat === 'all') return true;
      return item.category?.toLowerCase() === cat.toLowerCase();
    }).length;
  };

  const resetAllFilters = () => {
    setEventCategory('all');
    setEventTimeFilter('all');
    setEventFormatFilter('all');
    setEventCostFilter('all');
    setSearchQuery('');
  };

  const activeFiltersCount = 
    (eventCategory !== 'all' ? 1 : 0) + 
    (eventTimeFilter !== 'all' ? 1 : 0) + 
    (eventFormatFilter !== 'all' ? 1 : 0) + 
    (eventCostFilter !== 'all' ? 1 : 0) + 
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pb-32 relative overflow-hidden transition-colors duration-300">
      
      {/* Immersive background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/8 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.015] dark:opacity-[0.03] z-0" />

      {/* Header Area */}
      <div className="relative pt-24 md:pt-32 pb-8 md:pb-12 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300 mb-6 md:mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Workspace
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-[2px] bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Activity Log</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white uppercase">
                Events<br className="hidden md:block" />
                <span className="text-emerald-500 dark:text-emerald-400"> &amp; Workshops.</span>
              </h1>
              
              <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed mt-1">
                Explore hackathons, workshops, and technical events hosted by GAT Coding Club.
              </p>
            </div>

            {/* Desktop Counter Box */}
            <div className="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-widest">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Segment Available' : 'Segments Available'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE-FIRST HORIZONTAL CATEGORIES STRIP ( Snappy Touch Interaction ) */}
      <div className="lg:hidden sticky top-[80px] z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-y border-slate-200 dark:border-white/5 py-3 px-6 overflow-x-auto no-scrollbar flex items-center gap-2">
        {predefinedCategories.map(cat => {
          const isActive = eventCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setEventCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex-shrink-0 cursor-pointer active:scale-95 ${
                isActive 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
              }`}
            >
              {cat} ({getCategoryCount(cat)})
            </button>
          );
        })}
      </div>

      {/* Main Grid View */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-6 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filter Column */}
          <div className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-[100px] z-20 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 rounded-[2rem] p-6 shadow-sm flex flex-col gap-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-500" /> Filter Engine
                </span>
                {activeFiltersCount > 0 && (
                  <button 
                    onClick={resetAllFilters}
                    className="text-[9px] font-black text-red-500 dark:text-red-400 hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Search</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Keywords..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500/40 transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Category</label>
                <div className="flex flex-col gap-1.5">
                  {predefinedCategories.map(cat => {
                    const IconComp = CategoryIcons[cat.toLowerCase()] || HelpCircle;
                    const isActive = eventCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        onClick={() => setEventCategory(cat)}
                        className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                            : 'bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                          {cat}
                        </span>
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                          {getCategoryCount(cat)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Venue format</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-white/5">
                  {['all', 'online', 'in-person'].map(f => (
                    <button
                      key={f}
                      onClick={() => setEventFormatFilter(f)}
                      className={`py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-center transition-all cursor-pointer ${
                        eventFormatFilter === f ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Access cost</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-white/5">
                  {['all', 'free', 'paid'].map(c => (
                    <button
                      key={c}
                      onClick={() => setEventCostFilter(c)}
                      className={`py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-center transition-all cursor-pointer ${
                        eventCostFilter === c ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Timeline</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-white/5">
                  {['all', 'upcoming', 'past'].map(t => (
                    <button
                      key={t}
                      onClick={() => setEventTimeFilter(t)}
                      className={`py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-center transition-all cursor-pointer ${
                        eventTimeFilter === t ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {t === 'upcoming' ? 'Active' : t === 'past' ? 'Closed' : 'All'}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Main Columns: Grid + Tags Area */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            
            {/* Active Tags / Counters Bar */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active flags:</span>
                {activeFiltersCount === 0 ? (
                  <span className="text-[9px] font-medium text-slate-400 italic">No filtering flags active</span>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {eventCategory !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-wider">
                        {eventCategory}
                        <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setEventCategory('all')} />
                      </span>
                    )}
                    {eventTimeFilter !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-wider">
                        Status: {eventTimeFilter}
                        <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setEventTimeFilter('all')} />
                      </span>
                    )}
                    {eventFormatFilter !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-wider">
                        Format: {eventFormatFilter}
                        <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setEventFormatFilter('all')} />
                      </span>
                    )}
                    {eventCostFilter !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-wider">
                        Cost: {eventCostFilter}
                        <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setEventCostFilter('all')} />
                      </span>
                    )}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-wider">
                        "{searchQuery}"
                        <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSearchQuery('')} />
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest tabular-nums">
                Found {filteredEvents.length}
              </span>
            </div>

            {/* Event Display */}
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="h-[300px] rounded-[2rem] animate-pulse bg-slate-200 dark:bg-slate-900" />
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              
              <div className="py-20 flex flex-col items-center gap-6 text-center max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">No transmissions matches</h3>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-3 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all cursor-pointer shadow-md"
                >
                  Reset Filtering Flags
                </button>
              </div>

            ) : (
              
              /* Adaptive Events Cards Grid (Flexible responsive classes) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
                {filteredEvents.map((item, idx) => {
                  const isPast = new Date(item.date) < new Date();
                  const registered = item.registeredCount || item.attendees?.length || 0;
                  const isPremium = item.price > 0;

                  return (
                    /* Optimized Mobile Card Container (Row layout on mobile/small-widths, block on desktop) */
                    <div
                      key={item._id}
                      className="group relative flex flex-row md:flex-col items-center md:items-stretch rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 bg-white dark:bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 active:scale-[0.98] md:active:scale-100"
                    >
                      {/* Image panel (Compact square on mobile, widescreen block on desktop) */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-full md:h-48 flex-shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-950">
                        <img
                          src={item.image || 'https://via.placeholder.com/800x500'}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-95 md:block hidden" />

                        {/* Floating badges (Desktop only inside image) */}
                        <div className="absolute top-3 left-3 hidden md:flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest shadow-md">
                            {item.category || 'Workshop'}
                          </span>
                          {isPremium && (
                            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-widest shadow-md backdrop-blur-sm">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details Area (Touch Optimized spacing on mobile) */}
                      <div className="flex-1 min-w-0 flex flex-col p-4 md:p-6 gap-3">
                        
                        <div className="flex flex-col gap-1.5">
                          {/* Mobile-only tags strip */}
                          <div className="flex md:hidden items-center gap-1">
                            <span className="text-[8px] font-black uppercase text-emerald-500 tracking-wider">
                              {item.category || 'Workshop'}
                            </span>
                            {isPremium && (
                              <span className="text-[8px] font-bold text-slate-400">· Premium</span>
                            )}
                            {isPast && (
                              <span className="text-[8px] font-bold text-red-500">· Concluded</span>
                            )}
                          </div>

                          <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1 md:line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-1 md:line-clamp-2">
                            {item.shortDesc || item.description || 'An elite technical gathering hosted by GAT Coding Club.'}
                          </p>
                        </div>

                        {/* Meta info bar */}
                        <div className="flex items-center gap-3 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/5 pt-2">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3 text-emerald-500" />
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{item.venue}</span>
                          </span>
                        </div>

                        {/* Mobile & Desktop Action button */}
                        <div className="flex items-center gap-2 mt-1">
                          <Link
                            to={`/event/${item._id}`}
                            className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-center hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-1 active:scale-95"
                          >
                            Details <ArrowRight className="w-3 h-3" />
                          </Link>
                          {!isPast && (
                            <Link
                              to={`/register/event/${item._id}`}
                              className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-center hover:bg-emerald-600 transition-all duration-300 active:scale-95 shadow-sm shadow-emerald-500/10"
                            >
                              Register
                            </Link>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            )}
          </div>

        </div>
      </div>

      {/* MOBILE-FIRST FLOATING FILTER BUTTON ( Center Sticky Trigger ) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-6 py-4.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all border border-white/10 dark:border-slate-200"
        >
          <Filter className="w-3.5 h-3.5 text-emerald-500" /> Advanced Filter 
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[8px] flex items-center justify-center font-black">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* PREMIUM MOBILE FILTER BOTTOM SHEET DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileFiltersOpen(false)}
          />
          
          {/* Bottom Sheet Modal */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[2.5rem] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
              <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-500" /> Filter Engine
              </span>
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Filters */}
            <div className="flex flex-col gap-5 overflow-y-auto max-h-[60vh] pr-1">
              
              {/* Search */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Search keywords</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              {/* Venue Format */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Venue format</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl">
                  {[
                    { id: 'all', label: 'All Format' },
                    { id: 'online', label: 'Online' },
                    { id: 'in-person', label: 'Venue' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setEventFormatFilter(f.id)}
                      className={`py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-center transition-all ${
                        eventFormatFilter === f.id ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Access */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Access cost</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl">
                  {[
                    { id: 'all', label: 'All Cost' },
                    { id: 'free', label: 'Free' },
                    { id: 'paid', label: 'Premium' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setEventCostFilter(c.id)}
                      className={`py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-center transition-all ${
                        eventCostFilter === c.id ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Timeline */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Timeline segment</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl">
                  {[
                    { id: 'all', label: 'All Segments' },
                    { id: 'upcoming', label: 'Active' },
                    { id: 'past', label: 'Closed' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setEventTimeFilter(t.id)}
                      className={`py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-center transition-all ${
                        eventTimeFilter === t.id ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom buttons inside sheet */}
            <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={resetAllFilters}
                className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-md shadow-emerald-500/10"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
