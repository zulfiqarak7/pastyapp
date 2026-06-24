import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  X, Music, ExternalLink, ChevronRight, ChevronLeft, Check, ArrowRight, 
  Download, Mail, Globe, Instagram, Youtube, Menu, Clock, LogOut, 
  CheckSquare, Square, Terminal, AlertTriangle, DollarSign, Calendar, Plus, Activity, Zap, Target, TrendingUp
} from 'lucide-react';

// --- FIREBASE ---
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDXFEqQdHob9ZtrHQci4re1frJgXs5rcg",
  authDomain: "pasty-b1836.firebaseapp.com",
  projectId: "pasty-b1836",
  storageBucket: "pasty-b1836.firebasestorage.app",
  messagingSenderId: "244681766091",
  appId: "1:244681766091:web:8da266818b9496105d174e",
  measurementId: "G-310DYQTZ9S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- ASSETS & DATA ---
const ARTIST_IMAGE_URL = "/background.jpg";
const LOGO_URL = "/logo.png";
const GOOGLE_DRIVE_PHOTOS_URL = "https://drive.google.com/drive/folders/1jcZVxoElLlwNotT__L13CGLOG3RqAWaR?usp=drive_link"; 
const STORE_URL = "https://officialbuiltfromthebasements-shop.bigcartel.com/";
const MORE_MUSIC_URL = "https://linktr.ee/pastymusic"; 

// Note: To automatically pull videos live from YouTube, you would need a YouTube Data V3 API key 
// to bypass browser security. This array acts as the drop-in replacement for those feed results.
const YOUTUBE_VIDEOS = [
  "vQ62nfjGMB4?list=PLBD39rB9p7pxvV82ESw_Ar_zQPcCjxwts", 
  "581MvmIE9to", 
  "jfKfPfyJRdk"  
];

const PRODUCTS = [
  { id: 1, price: 45, image: "first.jpg" },
  { id: 2, price: 45, image: "second.jpg" },
  { id: 3, price: 45, image: "third.jpg" }
];

const TRACKS = [
  { title: "Runaway (feat. Joey Killjoy)", url: "https://music.apple.com/us/album/runaway-feat-pa%24ty-single/1844412963" },
  { title: "Yale", url: "https://music.apple.com/us/album/yale-single/1826390402" },
  { title: "Everyday", url: "https://music.apple.com/us/song/everyday/1813493592" }
];

const ADMIN_PASSCODES = { "JOEY2026": "Joey", "ZAK2026": "Zak", "JG2026": "JG" };
const TRACKER_TASKS = [
  { id: 'recorded', label: 'Rec' }, { id: 'mixed', label: 'Mix' },
  { id: 'mastered', label: 'Mast' }, { id: 'dsp', label: 'DSP' },
  { id: 'visPlan', label: 'Plan' }, { id: 'visFilm', label: 'Film' },
  { id: 'visComp', label: 'Edit' }, { id: 'promoFilm', label: 'Promo' },
  { id: 'promoSched', label: 'Sched' }, { id: 'ads', label: 'Ads' }
];

const TOTAL_BUDGET = 4000;
const INITIAL_PROJECT_SONGS = [ "WHAT’S IT CALLED", "HARD TO SEE", "MY $IDE", "I AIN’T LIKE THAT", "LET ME DOWN", "DAY IS OVER", "NOWADAYS", "ALRIGHT", "HAVE IT ALL", "MY LIFE TODAY", "NO WAY" ];

// --- STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Special+Elite&display=swap');
    :root { --killjoy-lime: #bef264; }
    body { background-color: #050505; color: #d1d1d1; margin: 0; padding: 0; overflow-x: hidden; width: 100%; }
    .font-metal { font-family: 'Anton', sans-serif; letter-spacing: -0.02em; }
    .font-zine { font-family: 'Special Elite', cursive; }
    
    .scanlines::after {
      content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%);
      z-index: 10; background-size: 100% 3px; pointer-events: none;
    }

    @media print {
      body { zoom: 65%; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .no-print { display: none !important; }
      .print-break-inside-avoid { page-break-inside: avoid; }
      @page { margin: 0.5cm; }
    }
  `}</style>
);

// --- LANDING PAGE ---
const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentVidIndex, setCurrentVidIndex] = useState(0);
  const [isLoadingMedia, setIsLoadingMedia] = useState(true);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.1]);

  // Simulating an API fetch for latest YouTube and Spotify data.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingMedia(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const nextVid = () => setCurrentVidIndex((p) => (p + 1) % YOUTUBE_VIDEOS.length);
  const prevVid = () => setCurrentVidIndex((p) => (p - 1 + YOUTUBE_VIDEOS.length) % YOUTUBE_VIDEOS.length);

  return (
    <div className="bg-[#050505] text-[#d1d1d1] min-h-screen font-zine scanlines relative w-full overflow-x-hidden">
      <GlobalStyles />
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 border-b-2 border-lime-900/30 bg-black/95">
        <div className="text-2xl sm:text-3xl font-metal italic text-white uppercase tracking-tighter">JOEY KILLJOY</div>
        
        <div className="hidden md:flex gap-6 items-center">
          <button onClick={() => document.getElementById('music').scrollIntoView({ behavior: 'smooth' })} className="font-metal text-lg uppercase hover:text-lime-400">Music</button>
          <button onClick={() => document.getElementById('merch').scrollIntoView({ behavior: 'smooth' })} className="font-metal text-lg uppercase hover:text-lime-400">Merch</button>
          <Link to="/epk" className="font-metal text-lg uppercase hover:text-lime-400">EPK</Link>
          <Link to="/admin" className="font-metal text-lg uppercase hover:text-lime-400">Admin</Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center w-full">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <img src={ARTIST_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-[0.4]" alt="bg" />
        </motion.div>
        <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={LOGO_URL} className="relative z-20 w-full max-w-[90%] sm:max-w-[450px] h-auto drop-shadow-[0_0_20px_rgba(190,242,100,0.2)]" />
      </section>

      {/* MUSIC */}
      <section id="music" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t-2 border-lime-900/20">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-6">
            <h2 className="text-6xl sm:text-7xl font-metal uppercase text-white italic tracking-tighter">Music</h2>
            
            {/* PLATFORM BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <a href="https://open.spotify.com/" target="_blank" rel="noreferrer" className="bg-zinc-900/40 border border-lime-600/30 p-4 flex items-center justify-center gap-2 hover:bg-lime-400 hover:text-black transition-all group">
                <span className="font-metal text-xl uppercase tracking-wider">Spotify</span>
              </a>
              <a href="https://music.apple.com/" target="_blank" rel="noreferrer" className="bg-zinc-900/40 border border-lime-600/30 p-4 flex items-center justify-center gap-2 hover:bg-lime-400 hover:text-black transition-all group">
                <span className="font-metal text-xl uppercase tracking-wider">Apple Music</span>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="bg-zinc-900/40 border border-lime-600/30 p-4 flex items-center justify-center gap-2 hover:bg-lime-400 hover:text-black transition-all group">
                <Music size={18} className="text-lime-400 group-hover:text-black" />
                <span className="font-metal text-xl uppercase tracking-wider">More</span>
              </a>
            </div>

            <div className="space-y-3 relative">
              {isLoadingMedia && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm border border-lime-900/30">
                  <span className="font-metal text-lime-400 uppercase tracking-widest animate-pulse">Syncing Feeds...</span>
                </div>
              )}
              {TRACKS.map((t, i) => (
                <a key={i} href={t.url} target="_blank" rel="noreferrer" className="flex justify-between items-center p-4 sm:p-5 bg-zinc-900/30 border-l-4 border-lime-600 hover:bg-lime-400 hover:text-black group transition-all">
                  <div className="flex gap-4 sm:gap-6 items-center text-sm sm:text-xl font-metal uppercase">
                    <span className="text-lime-900 group-hover:text-black">0{i+1}</span>
                    <h4 className="truncate max-w-[150px] sm:max-w-none">{t.title}</h4>
                  </div>
                  <ExternalLink size={18}/>
                </a>
              ))}
              
              <a href={MORE_MUSIC_URL} target="_blank" rel="noreferrer" className="flex justify-center items-center gap-3 w-full mt-4 p-4 bg-zinc-900/50 border border-lime-600/30 hover:bg-lime-400 hover:text-black transition-all group cursor-pointer">
                <span className="font-metal text-xl uppercase tracking-wider">More to listen to</span>
                <ArrowRight size={20} className="text-lime-400 group-hover:text-black" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 sm:gap-4 h-full relative group">
              {isLoadingMedia && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm border border-lime-900/30">
                  <span className="font-metal text-lime-400 uppercase tracking-widest animate-pulse">Syncing Feeds...</span>
                </div>
              )}
              <button onClick={prevVid} className="hidden sm:flex absolute left-[-20px] z-20 p-3 bg-black text-lime-400 hover:bg-lime-400 hover:text-black border border-lime-600/50 transition-all opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.8)]"><ChevronLeft size={24}/></button>
              
              <div className="flex-1 border border-zinc-800 p-1 bg-black grayscale w-full">
                <iframe key={currentVidIndex} className="w-full aspect-video" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEOS[currentVidIndex]}`} frameBorder="0" allowFullScreen></iframe>
              </div>
              
              <button onClick={nextVid} className="hidden sm:flex absolute right-[-20px] z-20 p-3 bg-black text-lime-400 hover:bg-lime-400 hover:text-black border border-lime-600/50 transition-all opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.8)]"><ChevronRight size={24}/></button>
            </div>
            
            {/* Mobile Video Controls */}
            <div className="flex sm:hidden justify-between w-full gap-2">
              <button onClick={prevVid} className="p-3 bg-zinc-900/50 text-lime-400 hover:bg-lime-400 hover:text-black border border-lime-600/30 flex-1 flex justify-center"><ChevronLeft size={24}/></button>
              <button onClick={nextVid} className="p-3 bg-zinc-900/50 text-lime-400 hover:bg-lime-400 hover:text-black border border-lime-600/30 flex-1 flex justify-center"><ChevronRight size={24}/></button>
            </div>
            <div className="text-center font-metal text-lime-900 text-sm uppercase tracking-widest">
              Video {currentVidIndex + 1} of {YOUTUBE_VIDEOS.length}
            </div>
          </div>
        </div>
      </section>

      {/* MERCH */}
      <section id="merch" className="py-20 bg-white text-black px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-7xl sm:text-8xl font-metal uppercase mb-12 tracking-tighter italic">Merch</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-2 border-black">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="border border-black p-6 sm:p-8 group hover:bg-black hover:text-white transition-all flex flex-col text-left">
                <div className="overflow-hidden border border-black mb-4 sm:mb-6 flex-1">
                  <img src={p.image} className="w-full aspect-square object-cover grayscale transition-transform group-hover:grayscale-0 group-hover:scale-105" alt="Merch Item" />
                </div>
                <div className="flex justify-between items-end border-t border-black pt-4 group-hover:border-white">
                  <span className="text-4xl sm:text-5xl font-metal">${p.price}</span>
                  {/* Changed from Add to Buy and redirected to Big Cartel */}
                  <a href={STORE_URL} target="_blank" rel="noreferrer" className="bg-black text-white px-8 py-2 sm:py-3 font-metal text-xl hover:bg-lime-400 hover:text-black uppercase transition-colors inline-block text-center">Buy</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE MENU: CENTERED */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 text-center">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6"><X size={40} className="text-lime-400" /></button>
            <div className="flex flex-col gap-8 text-5xl sm:text-6xl font-metal uppercase italic">
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('music').scrollIntoView(); }} className="hover:text-lime-400">Music</button>
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('merch').scrollIntoView(); }} className="hover:text-lime-400">Merch</button>
              <Link to="/epk" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-lime-400">EPK</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-lime-400">Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- EPK PAGE: FULL RESPONSIVE + PRINT FIX ---
const EPKPage = () => (
  <div className="bg-[#f5f5f5] text-black min-h-screen p-4 sm:p-10 lg:p-16 font-zine selection:bg-black selection:text-white flex justify-center w-full overflow-x-hidden">
    <GlobalStyles />
    <Link to="/" className="no-print fixed top-4 sm:top-8 left-4 sm:left-8 bg-black text-white px-4 py-2 font-metal uppercase text-xs hover:bg-lime-400 hover:text-black z-50">Back</Link>
    
    <div className="max-w-6xl w-full border-[6px] sm:border-[10px] border-black p-6 sm:p-12 bg-white shadow-[15px_15px_0px_#bef264] sm:shadow-[30px_30px_0px_#bef264] relative mx-auto my-auto h-fit">
      <header className="border-b-[4px] sm:border-b-8 border-black pb-6 sm:pb-8 mb-10 sm:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8">
        <div><h1 className="text-7xl sm:text-9xl lg:text-[10rem] font-metal leading-[0.8] uppercase tracking-tighter">JOEY KILLJOY</h1><p className="bg-black text-lime-400 px-3 py-1 text-lg sm:text-2xl font-metal uppercase mt-4 inline-block italic">Official Press Kit // 2026</p></div>
        <div className="text-left md:text-right uppercase font-bold text-[10px] sm:text-xs tracking-widest"><p className="mb-1 italic">BUILT FROM THE BASEMENT MGMT</p><p className="underline">builtfromthebasement@gmail.com</p></div>
      </header>
      
      <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 mb-16 sm:mb-24">
        <div className="border-4 border-black p-1 sm:p-2 grayscale contrast-125 lg:rotate-[-1deg]"><img src={ARTIST_IMAGE_URL} className="w-full h-auto" alt="Joey Killjoy" /></div>
        <div className="flex flex-col justify-center gap-6 sm:gap-8">
          <h2 className="text-5xl sm:text-7xl font-metal uppercase underline decoration-black decoration-4 sm:decoration-8 underline-offset-4 sm:underline-offset-8">The Artist</h2>
          <p className="text-sm sm:text-xl leading-relaxed">Joey Killjoy is an alternative rap artist blending rock, hip-hop, and noise influences into a visceral emotional system that reflects a raw journey.</p>
          <p className="text-lg sm:text-2xl font-bold bg-black text-white p-6 sm:p-8 lg:rotate-[1deg] border-l-[10px] sm:border-l-[12px] border-lime-400">"His 2026 release cycle exceeds expectations with striking visuals and a sonic evolution that redefines the genre."</p>
          <div className="flex flex-col sm:flex-row gap-4 no-print">
             <button onClick={() => window.print()} className="border-4 border-black px-6 py-3 font-metal text-xl sm:text-2xl uppercase hover:bg-black hover:text-white transition-none">Print EPK</button>
             <a href={GOOGLE_DRIVE_PHOTOS_URL} target="_blank" rel="noreferrer" className="bg-black text-white px-6 py-3 font-metal text-xl sm:text-2xl uppercase hover:bg-lime-400 hover:text-black text-center">Press Photos</a>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center border-t-[4px] sm:border-t-8 border-black pt-10 sm:pt-16">
          <div className="print-break-inside-avoid"><h3 className="text-5xl sm:text-7xl lg:text-8xl font-metal tracking-tighter italic leading-none">80k+</h3><p className="uppercase font-bold text-[10px] sm:text-xs tracking-widest mt-2">Total Streams</p></div>
          <div className="print-break-inside-avoid"><h3 className="text-5xl sm:text-7xl lg:text-8xl font-metal tracking-tighter italic leading-none">5k+</h3><p className="uppercase font-bold text-[10px] sm:text-xs tracking-widest mt-2">Followers</p></div>
          <div className="print-break-inside-avoid"><h3 className="text-5xl sm:text-7xl lg:text-8xl font-metal tracking-tighter italic leading-none">10+</h3><p className="uppercase font-bold text-[10px] sm:text-xs tracking-widest mt-2">Shows</p></div>
          <div className="print-break-inside-avoid"><h3 className="text-5xl sm:text-7xl lg:text-8xl font-metal tracking-tighter italic leading-none">2026</h3><p className="uppercase font-bold text-[10px] sm:text-xs tracking-widest mt-2">Phase One</p></div>
      </div>
    </div>
  </div>
);

// --- ADMIN DASHBOARD: FULL MOBILE CENTERED ---
const AdminDashboard = () => {
  const [auth, setAuth] = useState(sessionStorage.getItem('killjoy_admin_user'));
  const [pass, setPass] = useState("");
  const [data, setData] = useState({ songs: INITIAL_PROJECT_SONGS, progress: {}, logs: [], contributions: {}, budget: {} });
  const [masterProgress, setMasterProgress] = useState(0);

  useEffect(() => {
    if (!auth) return;
    return onSnapshot(doc(db, "admin_data", "project_tracker"), (s) => {
      if (s.exists()) {
        const d = s.data(); setData(d);
        const totalPossible = (d.songs?.length || 0) * TRACKER_TASKS.length;
        const totalDone = d.songs.reduce((acc, song) => acc + Object.values(d.progress?.[song] || {}).filter(Boolean).length, 0);
        setMasterProgress(Math.round((totalDone / totalPossible) * 100) || 0);
      }
    });
  }, [auth]);

  const toggleTask = async (song, taskId, label) => {
    const currentState = data.progress?.[song]?.[taskId] || false;
    const newContribs = { ...data.contributions };
    if (!currentState) newContribs[auth] = (newContribs[auth] || 0) + 1;
    const newData = {
      ...data, contributions: newContribs,
      progress: { ...data.progress, [song]: { ...data.progress[song], [taskId]: !currentState } },
      logs: [`> [${new Date().toLocaleTimeString()}] ${auth}: ${song}/${label}`, ...(data.logs || [])].slice(0, 20)
    };
    await setDoc(doc(db, "admin_data", "project_tracker"), newData, { merge: true });
  };

  if (!auth) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6 scanlines text-center">
        <GlobalStyles />
        <div className="border-4 border-lime-900/50 p-8 sm:p-12 bg-zinc-900/10 w-full max-w-md mx-auto">
          <h1 className="text-4xl sm:text-5xl font-metal text-white mb-8 uppercase italic tracking-tighter">Mission Control</h1>
          <form onSubmit={(e) => { e.preventDefault(); if(ADMIN_PASSCODES[pass]) { sessionStorage.setItem('killjoy_admin_user', ADMIN_PASSCODES[pass]); setAuth(ADMIN_PASSCODES[pass]); } }} className="space-y-6">
            <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="ACCESS CODE" className="w-full bg-black border-2 border-lime-900 p-4 text-white font-metal text-2xl text-center outline-none focus:border-lime-400" />
            <button className="w-full bg-lime-400 text-black py-4 font-metal text-2xl uppercase hover:bg-white transition-all">Authorize</button>
          </form>
          <Link to="/" className="block mt-10 text-[10px] uppercase text-zinc-700 hover:text-white">Exit System</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen p-4 sm:p-10 lg:p-12 font-zine text-lime-600 scanlines relative flex flex-col items-center w-full overflow-x-hidden">
      <GlobalStyles />
      <header className="border-2 border-lime-900/30 p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center mb-10 sm:mb-16 bg-zinc-900/10 w-full max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-5xl sm:text-7xl font-metal text-white uppercase italic tracking-tighter leading-none">Status: Online</h1>
          <p className="font-metal text-lime-900 uppercase mt-2 text-xs sm:text-lg">Operator: {auth} // Terminal 4.2</p>
        </div>
        <div className="flex gap-4"><Link to="/" className="border border-lime-900/50 px-6 py-2 font-metal uppercase text-sm hover:bg-lime-400 hover:text-black">Site</Link><button onClick={() => {sessionStorage.removeItem('killjoy_admin_user'); setAuth(null);}} className="bg-red-900/10 text-red-500 border border-red-900/30 px-6 py-2 font-metal uppercase text-sm hover:bg-red-600 hover:text-white">Abort</button></div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 w-full max-w-7xl mx-auto">
        <div className="border-2 border-lime-900/50 p-8 sm:p-10 bg-zinc-900/10 flex flex-col items-center justify-center">
          <h3 className="text-white font-metal text-xl sm:text-2xl uppercase mb-4 opacity-50">Master Pulse</h3>
          <div className="text-8xl sm:text-[10rem] lg:text-[12rem] font-metal leading-none text-lime-400 italic tracking-tighter">{masterProgress}%</div>
          <div className="w-full bg-lime-900/10 h-4 sm:h-6 border border-lime-900/30 mt-6 overflow-hidden"><div className="h-full bg-lime-400 transition-all duration-1000" style={{ width: `${masterProgress}%` }} /></div>
        </div>
        <div className="lg:col-span-2 border-2 border-lime-900/50 p-8 sm:p-10 bg-zinc-900/10">
          <h3 className="text-white font-metal text-xl sm:text-2xl uppercase mb-6 border-b border-lime-900/30 pb-4">Team Contributions</h3>
          <div className="space-y-6 sm:space-y-8">
            {["Joey", "Zak", "JG"].map(user => (
              <div key={user} className="flex items-center gap-4 sm:gap-6">
                <span className="font-metal text-lg sm:text-2xl w-12 sm:w-20 uppercase">{user}</span>
                <div className="flex-1 bg-zinc-900 h-3 sm:h-4 border border-zinc-800"><motion.div className="h-full bg-lime-400 shadow-[0_0_10px_#bef264]" animate={{ width: `${Math.min((data.contributions?.[user] || 0) * 3, 100)}%` }} /></div>
                <span className="font-metal text-lime-900 text-lg sm:text-xl">{data.contributions?.[user] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 w-full max-w-7xl mx-auto">
        <h3 className="text-4xl sm:text-6xl font-metal text-white uppercase italic mb-8 underline decoration-lime-900 decoration-4">Operational Tracklist</h3>
        {data.songs?.map((song, i) => {
          const tasks = Object.values(data.progress?.[song] || {});
          const perc = Math.round((tasks.filter(Boolean).length / TRACKER_TASKS.length) * 100) || 0;
          return (
            <div key={song} className="border-l-[10px] sm:border-l-[16px] border-lime-600 bg-zinc-900/20 p-6 sm:p-10 mb-6">
              <div className="flex justify-between items-center mb-8 border-b-2 border-zinc-900 pb-4"><div><span className="text-lime-900 font-metal text-xl sm:text-2xl italic tracking-widest">A-0{i+1}</span><h4 className="text-2xl sm:text-5xl font-metal text-white uppercase leading-none mt-1 truncate max-w-[150px] sm:max-w-none">{song}</h4></div><div className="text-3xl sm:text-5xl font-metal text-lime-400 italic tracking-tighter">{perc}%</div></div>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {TRACKER_TASKS.map(t => (
                  <button key={t.id} onClick={() => toggleTask(song, t.id, t.label)} className={`p-3 sm:p-4 border border-lime-900/10 flex flex-col items-center gap-2 transition-all ${data.progress?.[song]?.[t.id] ? 'bg-lime-400 text-black border-lime-400' : 'hover:border-lime-400/50 hover:bg-lime-400/5'}`}>
                    <div className={data.progress?.[song]?.[t.id] ? 'text-black' : 'text-lime-900'}>
                       {data.progress?.[song]?.[t.id] ? <CheckSquare size={18} /> : <Square size={18} />}
                    </div>
                    <span className="text-[8px] uppercase font-bold text-center leading-none">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

// --- ROUTER ---
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/epk" element={<EPKPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  );
}
