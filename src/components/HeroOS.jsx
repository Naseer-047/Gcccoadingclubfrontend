import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Trophy, Users, Code, Rocket, Flame, LayoutDashboard } from 'lucide-react';
import avatarImg from '../assets/avatar/image.png';
import StudentImage from '../assets/studentcutout.png';

const HeroOS = ({ events = [], domains = [], rooms = [], leaderboard = [] }) => {
  // --- DYNAMIC DATA PROCESSING ---
  // Upcoming Event
  const futureEvents = events.filter(e => new Date(e.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcomingEvent = futureEvents.length > 0 ? futureEvents[0] : events[0];
  
  // Live Room
  const activeRoom = rooms.length > 0 ? rooms[0] : null;
  
  // Leaderboard Topper
  const topper = leaderboard.length > 0 ? leaderboard[0] : null;
  
  // Stats
  // Strictly using real data counts as requested
  const activeMembersCount = leaderboard?.length || 0;
  const eventsCount = events?.length || 0;
  const domainsCount = domains?.length || 0;
  const projectsCount = 0; // Placeholder until projects API is available

  return (
    <section className="relative w-full h-auto min-h-[100dvh] lg:h-[120vh] max-h-none lg:max-h-[130vh] overflow-x-hidden bg-[#fafafa] text-slate-900 flex flex-col font-sans">
      {/* Background Dotted Lines & Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dotted Grid */}
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ 
            backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        
        {/* Floating Blobs for Depth - Hidden on mobile to prevent scroll lag */}
        <div className="hidden lg:block absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-200/40 blur-[120px] mix-blend-multiply" />
        <div className="hidden lg:block absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200/40 blur-[120px] mix-blend-multiply" />
        
        {/* Soft radial glow - Hidden on mobile */}
        <div className="hidden lg:block absolute top-[10%] right-[10%] w-[35vw] h-[35vw] bg-green-400/5 blur-[10vw] rounded-full z-0" />
        <div className="hidden lg:block absolute bottom-[20%] left-[20%] w-[30vw] h-[30vw] bg-emerald-400/5 blur-[8vw] rounded-full z-0" />
        
        {/* Dotted Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full z-0 opacity-20" preserveAspectRatio="none" viewBox="0 0 1600 900" fill="none">
          <path d="M 400,200 Q 700,100 1100,250 T 1600,150" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 8" />
          <path d="M 300,700 Q 500,500 800,450 T 1100,600" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 8" />
          <path d="M 700,800 Q 900,900 1200,700 T 1500,800" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 8" />
          <path d="M 600,250 C 700,400 650,550 500,700" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 8" />
        </svg>

        {/* Floating Icons Nodes */}
        {/* Top Left Node */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute top-[22%] left-[38%] w-[3vw] h-[3vw] min-w-[32px] min-h-[32px] rounded-full bg-white shadow-md border border-slate-50 flex items-center justify-center z-10 text-green-500">
          <Code className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px]" />
        </motion.div>
        
        {/* Middle Left Node */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="absolute top-[40%] left-[48%] w-[3vw] h-[3vw] min-w-[32px] min-h-[32px] rounded-full bg-white shadow-md border border-slate-50 flex items-center justify-center z-10 text-blue-500">
          <Trophy className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px]" />
        </motion.div>

        {/* Bottom Left Node */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="absolute bottom-[35%] left-[33%] w-[3vw] h-[3vw] min-w-[32px] min-h-[32px] rounded-full bg-white shadow-md border border-slate-50 flex items-center justify-center z-10 text-blue-400">
          <Rocket className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px]" />
        </motion.div>

        {/* Inner Left Node */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="absolute bottom-[28%] left-[38%] w-[3vw] h-[3vw] min-w-[32px] min-h-[32px] rounded-full bg-white shadow-md border border-slate-50 flex items-center justify-center z-10 text-yellow-500">
          <Users className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px]" />
        </motion.div>

        <img 
          src={StudentImage} 
          alt="Student coding" 
          className="hidden lg:block absolute right-[-2%] bottom-[5vh] h-[85vh] w-auto object-contain opacity-100 pointer-events-none z-10" 
        />
      </div>

      {/* Desktop Main Container */}
      <div className="hidden lg:flex relative z-20 w-full max-w-[1700px] mx-auto px-[3vw] pt-[12vh] pb-[2vh] flex-1 flex-col justify-between h-full">
         
         {/* Top Content Layout */}
         <div className="flex flex-col lg:flex-row justify-between w-full h-full flex-1 mb-[1vh]">
            
            {/* Left Column - Text */}
            <div className="flex flex-col justify-center w-full lg:w-[45%] h-full">
               {/* Pill */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
                 className="inline-flex self-start items-center gap-[0.5vw] px-[1vw] py-[0.8vh] rounded-full bg-green-50 border border-green-200/50 mb-[3vh]"
               >
                 <Code className="w-[1.2vw] h-[1.2vw] min-w-[14px] min-h-[14px] text-green-600" strokeWidth={2.5} />
                 <span className="text-[clamp(10px,0.8vw,14px)] font-black tracking-widest uppercase text-green-700">Official Coding Club of GAT</span>
               </motion.div>
              
               {/* Heading */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                 className="flex flex-col text-[clamp(3.5rem,7vw,8rem)] leading-[1.05] font-black tracking-tighter"
               >
                 <span className="text-slate-900">Code.</span>
                 <span className="text-slate-900">Collaborate.</span>
                 <span className="text-[#1da039]">Create.</span>
               </motion.div>

               {/* Paragraph */}
               <motion.p 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                 className="text-slate-500 text-[clamp(0.9rem,1.2vw,1.5rem)] max-w-[38vw] leading-relaxed mt-[2vh] font-medium"
               >
                 Join a community of passionate developers, learn modern technologies, build real-world projects, and grow together.
               </motion.p>

               {/* Buttons */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                 className="flex flex-wrap items-center gap-[1.5vw] mt-[3vh]"
               >
                 <Link to="/register" className="flex items-center gap-[0.8vw] px-[2vw] py-[1.5vh] rounded-full bg-[#1da039] text-white text-[clamp(12px,1vw,16px)] font-bold tracking-wide hover:bg-[#168a30] hover:scale-105 transition-all shadow-[0_8px_20px_rgba(29,160,57,0.3)]">
                   Join GCC <ChevronRight className="w-[1.2vw] h-[1.2vw] min-w-[16px] min-h-[16px]" strokeWidth={2.5} />
                 </Link>
                 <Link to="/events" className="flex items-center gap-[0.8vw] px-[2vw] py-[1.5vh] rounded-full bg-white border border-slate-200 text-slate-800 text-[clamp(12px,1vw,16px)] font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                   Explore Events <Calendar className="w-[1.2vw] h-[1.2vw] min-w-[16px] min-h-[16px] text-slate-500" />
                 </Link>
               </motion.div>

               {/* Trust row */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                 className="flex flex-col mt-[4vh] gap-[1vh]"
               >
                 <span className="text-[clamp(9px,0.7vw,12px)] font-bold text-slate-400 uppercase tracking-widest">Trusted by students across GAT</span>
                 <div className="flex items-center gap-[1vw]">
                   <div className="flex -space-x-[0.8vw]">
                     {[1, 2, 3, 4, 5].map((i) => (
                       <div key={i} className="w-[2.5vw] h-[2.5vw] min-w-[28px] min-h-[28px] rounded-full border-2 border-white bg-slate-200 overflow-hidden relative shadow-sm">
                          {/* Image sprite separation logic */}
                          <img src={avatarImg} alt={`Avatar ${i}`} className="absolute top-0 h-full w-[500%] max-w-none object-cover" style={{ left: `-${(i-1)*100}%` }} />
                       </div>
                     ))}
                     <div className="w-[2.5vw] h-[2.5vw] min-w-[28px] min-h-[28px] rounded-full border-2 border-white bg-[#1da039] text-white flex items-center justify-center text-[clamp(8px,0.7vw,12px)] font-black shadow-sm z-10 relative">
                       +600
                     </div>
                   </div>
                   <span className="text-[clamp(10px,0.8vw,13px)] font-semibold text-slate-500">and counting...</span>
                 </div>
               </motion.div>
            </div>

            {/* Right Column - Widgets */}
            <div className="hidden lg:block relative w-[55%] h-full z-20">
                
                {/* Upcoming Event Widget */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4 }}
                  className="absolute top-[8%] left-[10%] bg-white/90 backdrop-blur-xl border border-white rounded-[1.5rem] p-[1.2vw] flex items-center gap-[1vw] shadow-[0_10px_40px_rgba(0,0,0,0.06)] w-[24vw] min-w-[280px] transition-all z-30"
                >
                  <div className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                    <Calendar className="w-[1.5vw] h-[1.5vw] min-w-[18px] min-h-[18px] text-[#1da039]" />
                  </div>
                  <div className="flex flex-col flex-1 truncate pr-2">
                    <span className="text-[clamp(9px,0.8vw,12px)] font-black text-slate-900 tracking-wider">Upcoming Event</span>
                    <span className="text-[clamp(11px,1vw,14px)] font-semibold text-slate-500 mt-[0.2vh] truncate">{upcomingEvent ? upcomingEvent.title : 'Loading...'}</span>
                    <div className="flex items-center gap-[0.5vw] text-[clamp(9px,0.7vw,12px)] font-semibold text-slate-400 mt-[0.5vh]">
                      <Calendar className="w-[1vw] h-[1vw] min-w-[12px] min-h-[12px]" /> {upcomingEvent ? new Date(upcomingEvent.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}
                    </div>
                  </div>
                  <Link to={upcomingEvent ? `/register/event/${upcomingEvent._id}` : '/events'} className="w-[2vw] h-[2vw] min-w-[28px] min-h-[28px] rounded-full bg-[#1da039] flex items-center justify-center shrink-0 cursor-pointer hover:scale-110 transition-transform shadow-md shadow-green-500/30">
                    <ChevronRight className="w-[1vw] h-[1vw] min-w-[14px] min-h-[14px] text-white" strokeWidth={3} />
                  </Link>
                </motion.div>

                {/* Live Code Room Widget */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5 }}
                  className="absolute top-[20%] right-[0%] bg-white/90 backdrop-blur-xl border border-white rounded-[1.5rem] p-[1.2vw] shadow-[0_10px_40px_rgba(0,0,0,0.06)] w-[18vw] min-w-[220px] transition-all z-20"
                >
                  <div className="flex items-center justify-between mb-[1vh]">
                    <div className="flex items-center gap-[0.5vw]">
                      <Code className="w-[1.2vw] h-[1.2vw] min-w-[14px] min-h-[14px] text-[#1da039]" />
                      <span className="text-[clamp(11px,1vw,14px)] font-black text-slate-900 truncate pr-1">{activeRoom ? activeRoom.title : 'No Active Rooms'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-[0.5vw] mb-[1.2vh]">
                     <div className={`w-[0.5vw] h-[0.5vw] min-w-[6px] min-h-[6px] rounded-full ${activeRoom ? 'bg-green-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-slate-300'}`} />
                     <span className={`text-[clamp(9px,0.8vw,12px)] font-bold ${activeRoom ? 'text-[#1da039]' : 'text-slate-500'}`}>{activeRoom ? 'Live Now' : 'Offline'}</span>
                  </div>
                  {activeRoom && (
                    <div className="flex items-center gap-[1vw]">
                      <div className="flex -space-x-[0.6vw]">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-[2vw] h-[2vw] min-w-[24px] min-h-[24px] rounded-full border-2 border-white bg-slate-200 overflow-hidden relative shadow-sm">
                             <img src={`https://i.pravatar.cc/150?u=${i}`} alt={`User ${i}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-[2vw] h-[2vw] min-w-[24px] min-h-[24px] rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[clamp(8px,0.7vw,11px)] font-black text-slate-600 shadow-sm z-10 relative">
                          +{activeRoom.participants?.length || 0}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Leaderboard Topper Widget */}
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.6 }}
                  className="absolute top-[48%] left-[2%] bg-white/90 backdrop-blur-xl border border-white rounded-[1.5rem] p-[1vw] shadow-[0_10px_40px_rgba(0,0,0,0.06)] w-[16vw] min-w-[200px] transition-all z-20"
                >
                  <div className="flex items-center gap-[0.5vw] mb-[1vh]">
                    <Trophy className="w-[1.2vw] h-[1.2vw] min-w-[14px] min-h-[14px] text-green-500" />
                    <span className="text-[clamp(10px,0.9vw,13px)] font-black text-slate-900">Top Rank</span>
                  </div>
                  <div className="flex items-center gap-[0.8vw]">
                    <div className="w-[2.5vw] h-[2.5vw] min-w-[28px] min-h-[28px] rounded-full overflow-hidden relative border border-slate-100 bg-slate-200 shrink-0 shadow-sm flex items-center justify-center">
                       {topper?.avatar ? (
                         <img src={topper.avatar} alt={topper?.name} className="w-full h-full object-cover" />
                       ) : (
                         <span className="font-bold text-slate-500 text-xs">{topper ? topper.name?.charAt(0) : '-'}</span>
                       )}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[clamp(11px,1vw,14px)] font-bold text-slate-900 mb-[0.2vh] truncate pr-2">{topper ? topper.name : 'No Leaderboard Data'}</span>
                      <span className="text-[clamp(9px,0.8vw,12px)] font-black text-green-500 tracking-wider">{topper ? topper.totalPoints || topper.points || topper.xp || 0 : '0'} XP</span>
                    </div>
                  </div>
                </motion.div>

                {/* Weekly Challenge Widget */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.7 }}
                  className="absolute bottom-[22%] right-[3%] bg-white/90 backdrop-blur-xl border border-white rounded-[1.5rem] p-[1.2vw] shadow-[0_10px_40px_rgba(0,0,0,0.06)] w-[18vw] min-w-[240px] transition-all z-30"
                >
                  <div className="flex items-center gap-[0.5vw] mb-[1vh]">
                    <Flame className="w-[1.2vw] h-[1.2vw] min-w-[16px] min-h-[16px] text-orange-500" />
                    <span className="text-[clamp(10px,0.9vw,13px)] font-black text-slate-900">Current Challenge</span>
                  </div>
                  <div className="text-[clamp(11px,1vw,14px)] font-semibold text-slate-600 mb-[1.2vh]">Solve 5 Algo Problems</div>
                  <div className="w-full h-[0.6vh] min-h-[4px] bg-slate-100 rounded-full overflow-hidden mb-[1vh]">
                    <div className="h-full bg-green-500 w-[0%] rounded-full" />
                  </div>
                  <div className="text-[clamp(9px,0.8vw,12px)] font-bold text-slate-500">
                    <span className="text-green-600 font-black">0</span> / 5 Completed
                  </div>
                </motion.div>

            </div>
         </div>
         
         {/* Bottom Stats Bar */}
         <motion.div 
           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
           className="w-full h-[12vh] min-h-[80px] max-h-[120px] z-20 shrink-0 mt-auto"
         >
           <div className="bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_15px_60px_rgba(0,0,0,0.04)] rounded-[1.5rem] w-full h-full px-[3vw] flex items-center">
             <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-[2vh] md:gap-y-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
               
               <div className="flex flex-col xl:flex-row items-center justify-center gap-[1vw]">
                 <div className="flex items-center justify-center mb-[0.5vh] xl:mb-0">
                   <Users className="w-[2vw] h-[2vw] min-w-[24px] min-h-[24px] text-[#1da039]" strokeWidth={1.5} />
                 </div>
                 <div className="flex flex-col text-center xl:text-left">
                   <span className="text-[clamp(1.5rem,2.2vw,2.5rem)] font-black text-slate-900 leading-none mb-[0.2vh]">{activeMembersCount}+</span>
                   <span className="text-[clamp(9px,0.7vw,12px)] font-semibold text-slate-500 uppercase tracking-wide">Active Members</span>
                 </div>
               </div>
               
               <div className="flex flex-col xl:flex-row items-center justify-center gap-[1vw]">
                 <div className="flex items-center justify-center mb-[0.5vh] xl:mb-0">
                   <Calendar className="w-[2vw] h-[2vw] min-w-[24px] min-h-[24px] text-[#1da039]" strokeWidth={1.5} />
                 </div>
                 <div className="flex flex-col text-center xl:text-left">
                   <span className="text-[clamp(1.5rem,2.2vw,2.5rem)] font-black text-slate-900 leading-none mb-[0.2vh]">{eventsCount}+</span>
                   <span className="text-[clamp(9px,0.7vw,12px)] font-semibold text-slate-500 uppercase tracking-wide">Events Organized</span>
                 </div>
               </div>
               
               <div className="flex flex-col xl:flex-row items-center justify-center gap-[1vw]">
                 <div className="flex items-center justify-center mb-[0.5vh] xl:mb-0">
                   <Code className="w-[2vw] h-[2vw] min-w-[24px] min-h-[24px] text-[#1da039]" strokeWidth={1.5} />
                 </div>
                 <div className="flex flex-col text-center xl:text-left">
                   <span className="text-[clamp(1.5rem,2.2vw,2.5rem)] font-black text-slate-900 leading-none mb-[0.2vh]">{domainsCount}+</span>
                   <span className="text-[clamp(9px,0.7vw,12px)] font-semibold text-slate-500 uppercase tracking-wide">Tech Domains</span>
                 </div>
               </div>
               
               <div className="flex flex-col xl:flex-row items-center justify-center gap-[1vw]">
                 <div className="flex items-center justify-center mb-[0.5vh] xl:mb-0">
                   <Rocket className="w-[2vw] h-[2vw] min-w-[24px] min-h-[24px] text-[#1da039]" strokeWidth={1.5} />
                 </div>
                 <div className="flex flex-col text-center xl:text-left">
                   <span className="text-[clamp(1.5rem,2.2vw,2.5rem)] font-black text-slate-900 leading-none mb-[0.2vh]">{projectsCount}+</span>
                   <span className="text-[clamp(9px,0.7vw,12px)] font-semibold text-slate-500 uppercase tracking-wide">Projects Built</span>
                 </div>
               </div>
               
             </div>
           </div>
         </motion.div>
      </div>
      
      {/* Mobile Main Container (Strictly for phones) */}
      <div className="flex lg:hidden relative z-20 w-full flex-col items-center px-4 pt-[12vh] pb-[2vh] flex-1">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200/50 mb-6 mt-2">
          <Code className="w-4 h-4 text-green-600" strokeWidth={2.5} />
          <span className="text-[11px] font-black tracking-widest uppercase text-green-700">Official Coding Club</span>
        </div>

        {/* Headline */}
        <div className="flex flex-col text-center text-[42px] leading-[1.1] font-black tracking-tighter mb-5">
          <span className="text-slate-900">Welcome to</span>
          <span className="text-[#1da039]">GAT Coding Club</span>
        </div>

        {/* Subhead */}
        <div className="flex items-center justify-center gap-3 text-[14px] font-bold text-slate-900 mb-6">
          <span>Learn.</span>
          <span className="text-[#1da039]">•</span>
          <span>Build.</span>
          <span className="text-[#1da039]">•</span>
          <span>Compete.</span>
        </div>

        {/* Paragraph */}
        <p className="text-slate-500 text-[15px] leading-relaxed text-center px-2 mb-8 font-medium">
          A community of passionate learners building skills, real projects and creating the future together.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 w-full px-2 mb-12">
          <Link to="/register" className="flex items-center justify-center gap-2 flex-1 py-3.5 rounded-[12px] bg-[#1da039] text-white text-[14px] font-bold tracking-wide shadow-[0_8px_20px_rgba(29,160,57,0.3)]">
            Join GCC <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
          <Link to="/events" className="flex items-center justify-center gap-2 flex-1 py-3.5 rounded-[12px] bg-white border border-[#1da039] text-[#1da039] text-[14px] font-bold shadow-sm">
            Explore Events <Calendar className="w-4 h-4" />
          </Link>
        </div>

        {/* Image & Floating Card */}
        <div className="relative w-full max-w-[400px] flex justify-center mb-12 mt-2">
          <img src={StudentImage} alt="Laptop" className="w-[90%] h-auto object-contain z-10 drop-shadow-2xl" />
          
          {/* Mobile Upcoming Event Card */}
          <div className="absolute top-[35%] right-[-5%] bg-white border border-slate-100 rounded-[16px] p-3 shadow-xl flex items-center gap-3 w-[230px] z-20">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
              <Calendar className="w-5 h-5 text-[#1da039]" />
            </div>
            <div className="flex flex-col flex-1 truncate">
              <span className="text-[10px] font-bold text-[#1da039] tracking-wider mb-0.5">Upcoming Event</span>
              <span className="text-[12px] font-bold text-slate-900 truncate mb-1">{upcomingEvent ? upcomingEvent.title : 'Loading...'}</span>
              <span className="text-[10px] font-medium text-slate-500 mb-1.5">{upcomingEvent ? new Date(upcomingEvent.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}</span>
              <Link to={upcomingEvent ? `/register/event/${upcomingEvent._id}` : '/events'} className="text-[10px] font-bold text-[#1da039] flex items-center gap-1 group">
                Register Now <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="w-[95%] bg-white rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-slate-50 p-4 mb-8 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <Users className="w-6 h-6 text-[#1da039] mb-1.5" strokeWidth={1.5} />
              <span className="text-[18px] font-black text-slate-900 leading-none mb-1">{activeMembersCount}+</span>
              <span className="text-[10px] font-semibold text-slate-500">Members</span>
            </div>
            <div className="w-px h-12 bg-slate-100" />
            <div className="flex flex-col items-center">
              <Trophy className="w-6 h-6 text-[#1da039] mb-1.5" strokeWidth={1.5} />
              <span className="text-[18px] font-black text-slate-900 leading-none mb-1">{eventsCount}+</span>
              <span className="text-[10px] font-semibold text-slate-500">Events</span>
            </div>
            <div className="w-px h-12 bg-slate-100" />
            <div className="flex flex-col items-center">
              <Code className="w-6 h-6 text-[#1da039] mb-1.5" strokeWidth={1.5} />
              <span className="text-[18px] font-black text-slate-900 leading-none mb-1">{domainsCount}+</span>
              <span className="text-[10px] font-semibold text-slate-500">Domains</span>
            </div>
            <div className="w-px h-12 bg-slate-100" />
            <div className="flex flex-col items-center">
              <Rocket className="w-6 h-6 text-[#1da039] mb-1.5" strokeWidth={1.5} />
              <span className="text-[18px] font-black text-slate-900 leading-none mb-1">{projectsCount}+</span>
              <span className="text-[10px] font-semibold text-slate-500">Projects</span>
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center mt-2 mb-4 animate-bounce">
          <ChevronRight className="w-6 h-6 text-[#1da039] rotate-90" strokeWidth={3} />
        </div>

      </div>

    </section>
  );
};

export default HeroOS;

