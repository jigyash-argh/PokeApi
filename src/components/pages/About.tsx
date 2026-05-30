import React from 'react';
import prof_oak from '../../assets/prof_oka.png';

export const About = () => {
  return (
    // Vibrant full-screen background with top padding to prevent the fixed Navbar from hiding content
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-green-300 to-yellow-200 pt-32 pb-12 px-4 md:px-8 selection:bg-yellow-400 selection:text-slate-900">
      
      {/* Expanded max-width to utilize the whole page */}
      <div className="max-w-[95vw] 2xl:max-w-[1600px] mx-auto h-full flex flex-col gap-8">
        
        {/* ========================================================= */}
        {/* POKÉDEX HEADER */}
        {/* ========================================================= */}
        <header className="bg-red-600 border-4 border-slate-900 rounded-2xl p-4 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] flex justify-between items-center z-10">
           <div className="flex gap-3">
             <div className="w-8 h-8 bg-sky-300 border-4 border-slate-900 rounded-full pokedex-glow shadow-inner"></div>
             <div className="w-4 h-4 bg-yellow-400 border-2 border-slate-900 rounded-full mt-1"></div>
             <div className="w-4 h-4 bg-green-400 border-2 border-slate-900 rounded-full mt-1"></div>
           </div>
           <h1 className="text-white text-4xl md:text-5xl tracking-widest drop-shadow-md">
             TRAINER DATA
           </h1>
        </header>

        {/* ========================================================= */}
        {/* PROFESSOR OAK FULL-WIDTH BANNER */}
        {/* ========================================================= */}
        <section className="bg-white border-4 border-slate-900 rounded-2xl p-6 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row gap-10 items-center relative overflow-hidden crt-screen">
            
            {/* Oak Image - Increased size and fixed object-contain so legs aren't cut off */}
            <div className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 bg-sky-200 rounded-full border-4 border-slate-900 overflow-hidden flex items-center justify-center shadow-inner z-10 animate-float p-4">
                <img src={prof_oak} alt="Professor Oak" className="w-full h-full object-contain drop-shadow-xl" />
            </div>
            
            {/* Dialogue Text */}
            <div className="flex-grow z-10 w-full">
                <h2 className="text-3xl text-slate-500 mb-2 tracking-widest border-b-4 border-slate-200 pb-2 inline-block">PROF. OAK</h2>
                <p className="text-3xl md:text-5xl text-slate-800 leading-snug tracking-wide mt-4">
                    "Ah, welcome! This trainer is a formidable full-stack developer! They specialize in evolving raw logic into powerful applications. Let's check their stats!"
                </p>
                <div className="mt-4 text-right animate-bounce">
                    <span className="text-red-500 text-5xl drop-shadow-md">▼</span>
                </div>
            </div>
        </section>

        {/* ========================================================= */}
        {/* MAIN LAYOUT GRID (Split perfectly to use the screen) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-grow">
            
            {/* LEFT SIDE: ABOUT & BADGES (Spans 2 columns on large screens) */}
            <section className="xl:col-span-2 flex flex-col gap-8">
                
                {/* About Box */}
                <div className="bg-white border-4 border-slate-900 rounded-2xl p-8 lg:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] flex-grow flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl text-slate-800 mb-6 border-b-4 border-dashed border-slate-300 pb-4 tracking-wide">ABOUT THE TRAINER</h2>
                    
                    <p className="text-2xl md:text-3xl text-slate-700 leading-relaxed mb-10 tracking-wide">
                        Currently exploring the vast regions of software engineering, I focus heavily on crafting robust backend services and dynamic frontends. When I'm not architecting APIs or managing component states, you'll likely find me leveling up my physical stats with calisthenics or mentoring others as a Teaching Assistant.
                    </p>
                    
                    <h3 className="text-3xl md:text-4xl text-slate-800 mb-6 tracking-wide">OBTAINED GYM BADGES</h3>
                    <div className="flex flex-wrap gap-4 md:gap-6">
                        <Badge color="bg-blue-400" name="REACT" icon="⚛️" />
                        <Badge color="bg-teal-400" name="FASTAPI" icon="⚡" />
                        <Badge color="bg-green-500" name="NODE.JS" icon="🟢" />
                        <Badge color="bg-indigo-500" name="C++" icon="⚙️" />
                    </div>
                </div>
            </section>

            {/* RIGHT SIDE: INFO & LINKS */}
            <section className="flex flex-col gap-8">
                
                {/* Trainer Info Card */}
                <div className="bg-yellow-300 border-4 border-slate-900 rounded-2xl p-8 lg:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.8)]">
                    <h2 className="text-4xl md:text-5xl text-slate-800 mb-6 tracking-wide">ID CARD</h2>
                    <ul className="space-y-6 text-2xl md:text-3xl text-slate-800 tracking-wide">
                        <li className="flex justify-between border-b-4 border-dotted border-yellow-500 pb-3">
                            <span className="text-slate-600">CLASS:</span> 
                            <span>DEVELOPER</span>
                        </li>
                        <li className="flex justify-between border-b-4 border-dotted border-yellow-500 pb-3">
                            <span className="text-slate-600">LEVEL:</span> 
                            <span>CHALLANGER</span>
                        </li>
                        <li className="flex justify-between border-b-4 border-dotted border-yellow-500 pb-3">
                            <span className="text-slate-600">REGION:</span> 
                            <span>INDIA</span>
                        </li>
                    </ul>
                </div>

                {/* Link Cable (Socials) */}
                <div className="bg-white border-4 border-slate-900 rounded-2xl p-8 lg:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] flex-grow flex flex-col justify-center gap-6">
                    <h2 className="text-3xl md:text-4xl text-slate-800 mb-4 text-center tracking-wide">CONNECT CABLE</h2>
                    
                    {/* GitHub */}
                    <a href="https://github.com/jigyash-argh" target="_blank" rel="noreferrer" className="block w-full bg-slate-800 text-white border-4 border-slate-900 rounded-xl p-5 text-center text-3xl md:text-4xl tracking-widest hover:bg-slate-700 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                        🎮 GITHUB
                    </a>
                    
                    {/* LinkedIn */}
                    <a href="https://linkedin.com/in/jigyash-shukla" target="_blank" rel="noreferrer" className="block w-full bg-blue-500 text-white border-4 border-slate-900 rounded-xl p-5 text-center text-3xl md:text-4xl tracking-widest hover:bg-blue-400 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                        💼 LINKEDIN
                    </a>
                    
                    {/* Email */}
                    <a href="mailto:realjigyash19@gmail.com" className="block w-full bg-red-500 text-white border-4 border-slate-900 rounded-xl p-5 text-center text-3xl md:text-4xl tracking-widest hover:bg-red-400 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                        ✉️ EMAIL
                    </a>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};

// Reusable Tech Badge Component
const Badge = ({ color, name, icon }: { color: string, name: string, icon: string }) => (
    <div className={`${color} border-4 border-slate-900 rounded-full px-6 py-3 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.9)] transition-all cursor-pointer`}>
        <span className="text-3xl md:text-4xl">{icon}</span>
        <span className="text-white text-3xl md:text-4xl tracking-widest mt-1">{name}</span>
    </div>
);