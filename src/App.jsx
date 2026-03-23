import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, X, Music, ExternalLink, ChevronRight, Check, ArrowRight, 
  Download, Mail, Globe, Instagram, Youtube, Menu, Clock, LogOut, 
  CheckSquare, Square, Terminal, AlertTriangle, DollarSign, Calendar, Plus, Activity, Zap, Target, TrendingUp
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
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

// --- ASSETS & CONSTANTS ---
const ARTIST_IMAGE_URL = "/background.jpg";
const LOGO_URL = "/logo.png";
const LINKTREE_URL = "https://linktr.ee/pastymusic";
const GOOGLE_DRIVE_PHOTOS_URL = "https://drive.google.com/drive/folders/1jcZVxoElLlwNotT__L13CGLOG3RqAWaR?usp=drive_link"; 
const YOUTUBE_VIDEO_ID = "581MvmIE9to";

const PRODUCTS = [
  { id: 1, name: "PA$TY SYSTEM TEE", price: 35, image: "first.jpg", desc: "100% Cotton. Boxy Fit." },
  { id: 2, name: "DECAY HOODIE", price: 65, image: "second.jpg", desc: "Heavyweight. Acid wash black." },
  { id: 3, name: "TRAP BOLT CAP", price: 25, image: "third.jpg", desc: "Embroidered Snapback." }
];

const TRACKS = [
  { title: "Runaway (feat. Pa$ty)", url: "https://music.apple.com/us/album/runaway-feat-pa%24ty-single/1844412963" },
  { title: "Yale", url: "https://music.apple.com/us/album/yale-single/1826390402" },
  { title: "Everyday", url: "https://music.apple.com/us/song/everyday/1813493592" },
];

const ADMIN_PASSCODES = { "JOEY2026": "Joey", "ZAK2026": "Zak", "JG2026": "JG" };

const TRACKER_TASKS = [
  { id: 'recorded', label: 'Recorded' }, { id: 'mixed', label: 'Mixed' },
  { id: 'mastered', label: 'Mastered' }, { id: 'dsp', label: 'Uploaded' },
  { id: 'visPlan', label: 'Visuals Plan' }, { id: 'visFilm', label: 'Filmed' },
  { id: 'visComp', label: 'Edit Done' }, { id: 'promoFilm', label: 'Promo' },
  { id: 'promoSched', label: 'Scheduled' }, { id: 'ads', label: 'Ads' }
];

const BUDGET_CAPS = { "Zak": 1200, "Ads": 1800, "Instrumentals": 300, "Studio": 400, "Other": 300 };
const TOTAL_BUDGET = 4000;

const INITIAL_PROJECT_SONGS = [
  "WHAT’S IT CALLED", "HARD TO SEE", "MY $IDE", "I AIN’T LIKE THAT", 
  "LET ME DOWN", "DAY IS OVER", "NOWADAYS", "ALRIGHT", 
  "HAVE IT ALL", "MY LIFE TODAY", "NO WAY"
];

// --- STYLES ---
const InjectStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Special+Elite&display=swap');
    :root { --pasty-lime: #bef264; }
    body { background-color: #050505; color: #d1d1d1; margin: 0; }
    .font-metal { font-family: 'Anton', sans-serif; letter-spacing: -0.02em; }
    .font-zine { font-family: 'Special Elite', cursive; }
    .scanlines::after {
      content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%), linear-gradient(90deg, rgba(190, 242, 100, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      z-index: 10; background-size: 100% 3px, 3px 100%; pointer-events: none;
    }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
  `}</style>
);

// --- LANDING PAGE ---
const LandingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.1]);

  return (
    <div className="bg-[#050505] text-[#d1d1d1] min-h-screen font-zine scanlines relative overflow-x-hidden">
      <InjectStyles />
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 border-b-2 border-lime-900/30 bg-black/95">
        <div className="text-3xl font-metal italic text-white tracking-tighter uppercase">PA$TY</div>
        <div className="hidden md:flex gap-8 items-center">
          <button onClick={() => document.getElementById('music').scrollIntoView({ behavior: 'smooth' })} className="font-metal text-lg uppercase hover:text-lime-400">Music</button>
          <button onClick={() => document.getElementById('merch').scrollIntoView({ behavior: 'smooth' })} className="font-metal text-lg uppercase hover:text-lime-400">Merch</button>
          <Link to="/epk" className="font-metal text-lg uppercase hover:text-lime-400">EPK</Link>
          <Link to="/admin" className="font-metal text-lg uppercase hover:text-lime-400">Admin</Link>
          <button onClick={() => setIsCartOpen(true)} className="relative border border-lime-400/30 p-1 hover:bg-lime-400 hover:text-black">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -top-3 -right-3 bg-lime-400 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center border border-black">{cart.length}</span>}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative"><ShoppingBag size={24} /></button>
          <button onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <img src={ARTIST_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-50" alt="background" />
        </motion.div>
        <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={LOGO_URL} className="relative z-20 w-full max-w-[500px] h-auto px-6 drop-shadow-[0_0_20px_rgba(190,242,100,0.2)]" />
      </section>

      <section id="music" className="py-24 px-6 max-w-7xl mx-auto border-t-2 border-lime-900/20">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-7xl font-metal uppercase text-white mb-8 italic tracking-tighter">Music</h2>
            {TRACKS.map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noreferrer" className="flex justify-between items-center p-6 bg-zinc-900/30 border-l-4 border-lime-600 hover:bg-lime-400 hover:text-black group">
                <div className="flex gap-6 items-center"><span className="text-2xl font-metal text-lime-900 group-hover:text-black">0{i+1}</span><h4 className="text-xl font-metal uppercase">{t.title}</h4></div>
                <ExternalLink size={20}/>
              </a>
            ))}
          </div>
          <div className="border border-zinc-800 p-1 bg-black grayscale"><iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} frameBorder="0" allowFullScreen></iframe></div>
        </div>
      </section>

      <section id="merch" className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-8xl font-metal uppercase mb-12 tracking-tighter italic">Merch</h2>
          <div className="grid md:grid-cols-3 border-2 border-black">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="border border-black p-8 group hover:bg-black hover:text-white">
                <div className="overflow-hidden border border-black mb-6"><img src={p.image} className="w-full aspect-square object-cover grayscale transition-transform group-hover:grayscale-0 group-hover:scale-105" /></div>
                <h3 className="text-4xl font-metal uppercase mb-2">{p.name}</h3>
                <p className="text-sm font-zine mb-6 h-12">{p.desc}</p>
                <div className="flex justify-between items-end border-t border-black pt-4 group-hover:border-white">
                  <span className="text-5xl font-metal">${p.price}</span>
                  <button onClick={() => setCart([...cart, p])} className="bg-black text-white px-8 py-3 font-metal text-xl hover:bg-lime-400 hover:text-black">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-24 border-t-2 border-lime-900/10 text-center bg-black">
        <h2 className="text-6xl font-metal text-lime-900 italic">PA$TY</h2>
        <div className="mt-8 flex justify-center gap-12 font-metal text-xl uppercase opacity-40">
           <a href="#">Instagram</a><a href="#">YouTube</a><a href="#">Soundcloud</a>
        </div>
      </footer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-black z-[100] flex flex-col p-8">
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end mb-16"><X size={48} className="text-lime-400" /></button>
            <div className="flex flex-col gap-12 text-6xl font-metal uppercase italic">
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('music').scrollIntoView(); }}>Music</button>
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('merch').scrollIntoView(); }}>Merch</button>
              <Link to="/epk" onClick={() => setIsMobileMenuOpen(false)}>EPK</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-lime-900/10 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-black border-l-2 border-lime-600 z-[70] p-8 flex flex-col">
               <div className="flex justify-between items-center mb-12 border-b border-lime-900/30 pb-4"><h2 className="text-5xl font-metal uppercase text-white">Cart</h2><button onClick={() => setIsCartOpen(false)}><X size={40} className="text-lime-400" /></button></div>
               <div className="flex-1 space-y-4 overflow-y-auto">
                  {cart.length === 0 ? <p className="text-lime-900 font-metal uppercase">Zero Items</p> : cart.map((item, i) => (
                    <div key={i} className="bg-zinc-900/20 p-4 border border-zinc-800 flex justify-between items-center"><h4 className="font-metal text-lg uppercase">{item.name}</h4><button onClick={() => {const nc = [...cart]; nc.splice(i,1); setCart(nc);}}><X size={16}/></button></div>
                  ))}
               </div>
               <button className="w-full bg-lime-400 text-black font-metal text-3xl py-6 mt-8">Checkout</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- EPK PAGE (INFO RESTORED) ---
const EPKPage = () => (
  <div className="bg-[#f2f2f2] text-black min-h-screen p-6 md:p-16 font-zine selection:bg-black selection:text-white">
    <InjectStyles />
    <Link to="/" className="fixed top-8 left-8 bg-black text-white px-4 py-2 font-metal uppercase text-sm hover:bg-lime-400 hover:text-black z-50">Back</Link>
    <div className="max-w-6xl mx-auto border-[10px] border-black p-12 bg-white shadow-[30px_30px_0px_#bef264]">
      <header className="border-b-8 border-black pb-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div><h1 className="text-[12rem] font-metal leading-[0.7] uppercase tracking-tighter">PA$TY</h1><p className="bg-black text-lime-400 px-4 py-1 text-2xl font-metal uppercase mt-4 inline-block italic">Official Press Kit // 2026</p></div>
        <div className="text-right uppercase font-bold text-xs"><p className="mb-1">Management: Jonathan Gleason</p><p className="underline">jonathangleasonmgmt@gmail.com</p></div>
      </header>
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div className="border-4 border-black p-2 grayscale contrast-150 rotate-[-1deg]"><img src={ARTIST_IMAGE_URL} className="w-full h-full object-cover" /></div>
        <div className="flex flex-col justify-center gap-8">
          <h2 className="text-7xl font-metal uppercase underline decoration-black decoration-8 underline-offset-8">The Artist</h2>
          <p className="text-xl leading-relaxed">Pa$ty is an alternative rap artist who seamlessly blends rock, hip-hop, and emo influences into a unique sound that reflects his raw, emotional journey.</p>
          <p className="text-2xl font-bold bg-black text-white p-8 rotate-[1deg] border-l-[12px] border-lime-400">"His 2026 release plan exceeds expectations with unparalleled depth, striking visuals, and a sonic evolution that redefines the genre."</p>
          <div className="flex gap-4">
             <button onClick={() => window.print()} className="border-4 border-black px-8 py-4 font-metal text-2xl uppercase hover:bg-black hover:text-white transition-none">Download Bio</button>
             <a href={GOOGLE_DRIVE_PHOTOS_URL} target="_blank" className="bg-black text-white px-8 py-4 font-metal text-2xl uppercase hover:bg-lime-400 hover:text-black transition-none">Download Photos</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t-8 border-black pt-16">
          <div><h3 className="text-8xl font-metal tracking-tighter italic">80k+</h3><p className="uppercase font-bold text-sm tracking-widest mt-2">Total Streams</p></div>
          <div><h3 className="text-8xl font-metal tracking-tighter italic">5k+</h3><p className="uppercase font-bold text-sm tracking-widest mt-2">Followers</p></div>
          <div><h3 className="text-8xl font-metal tracking-tighter italic">10+</h3><p className="uppercase font-bold text-sm tracking-widest mt-2">Shows</p></div>
          <div><h3 className="text-8xl font-metal tracking-tighter italic">2026</h3><p className="uppercase font-bold text-sm tracking-widest mt-2">Next Phase</p></div>
      </div>
    </div>
  </div>
);

// --- ADMIN DASHBOARD (FULL LOGIC RESTORED) ---
const AdminDashboard = () => {
  const [auth, setAuth] = useState(sessionStorage.getItem('pasty_admin_user'));
  const [pass, setPass] = useState("");
  const [data, setData] = useState({ songs: INITIAL_PROJECT_SONGS, progress: {}, logs: [], contributions: {}, budget: {}, eraIdentity: [] });
  const [masterProgress, setMasterProgress] = useState(0);

  useEffect(() => {
    if (!auth) return;
    const progressDocRef = doc(db, "admin_data", "project_tracker");
    return onSnapshot(progressDocRef, (s) => {
      if (s.exists()) {
        const d = s.data();
        setData(d);
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
      ...data,
      contributions: newContribs,
      progress: { ...data.progress, [song]: { ...data.progress[song], [taskId]: !currentState } },
      logs: [`> [${new Date().toLocaleTimeString()}] ${auth}: ${song}/${label}`, ...(data.logs || [])].slice(0, 30)
    };
    await setDoc(doc(db, "admin_data", "project_tracker"), newData, { merge: true });
  };

  const getBottleneck = () => {
    let maxStuck = -1; let bottleneckTask = null; let count = 0;
    TRACKER_TASKS.forEach((task, i) => {
      let currentStuck = 0;
      data.songs.forEach(song => {
        if (!data.progress[song]?.[task.id]) {
          if (i === 0 || data.progress[song]?.[TRACKER_TASKS[i-1].id]) currentStuck++;
        }
      });
      if (currentStuck > maxStuck) { maxStuck = currentStuck; bottleneckTask = task; count = currentStuck; }
    });
    return count === 0 ? { label: "CLEAR", count: 0 } : { label: bottleneckTask.label, count };
  };

  const totalSpent = Object.values(data.budget || {}).reduce((a, b) => a + b, 0);
  const bottleneck = getBottleneck();

  if (!auth) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6 scanlines">
        <InjectStyles />
        <div className="border-4 border-lime-900/50 p-12 bg-zinc-900/10 w-full max-w-md text-center">
          <h1 className="text-5xl font-metal text-white mb-8 uppercase italic tracking-tighter">Mission Control</h1>
          <form onSubmit={(e) => { e.preventDefault(); if(ADMIN_PASSCODES[pass]) { sessionStorage.setItem('pasty_admin_user', ADMIN_PASSCODES[pass]); setAuth(ADMIN_PASSCODES[pass]); } }} className="space-y-6">
            <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="CLEARANCE CODE" className="w-full bg-black border-2 border-lime-900 p-5 text-white font-metal text-3xl text-center outline-none focus:border-lime-400" />
            <button className="w-full bg-lime-400 text-black py-5 font-metal text-2xl uppercase hover:bg-white transition-all">Authorize</button>
          </form>
          <Link to="/" className="block mt-10 text-xs uppercase text-zinc-700 hover:text-white">Exit System</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen p-4 md:p-12 font-zine text-lime-600 scanlines relative">
      <InjectStyles />
      <header className="border-2 border-lime-900/30 p-10 flex flex-col md:flex-row justify-between items-center mb-16 bg-zinc-900/10">
        <div><h1 className="text-7xl font-metal text-white uppercase italic tracking-tighter leading-none">Status: Online</h1><p className="font-metal text-lime-900 uppercase mt-2 tracking-widest">Operator: {auth} // Decryption Level 4</p></div>
        <div className="flex gap-6 mt-8 md:mt-0"><Link to="/" className="border border-lime-900/50 px-8 py-3 font-metal uppercase hover:bg-lime-400 hover:text-black">Site</Link><button onClick={() => {sessionStorage.removeItem('pasty_admin_user'); setAuth(null);}} className="bg-red-900/10 text-red-500 border border-red-900/30 px-8 py-3 font-metal uppercase hover:bg-red-600 hover:text-white">Abort</button></div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="border-2 border-lime-900/50 p-10 bg-zinc-900/10 flex flex-col items-center justify-center">
          <h3 className="text-white font-metal text-2xl uppercase mb-4 opacity-50">Master Pulse</h3>
          <div className="text-[12rem] font-metal leading-none text-lime-400 italic tracking-tighter">{masterProgress}%</div>
          <div className="w-full bg-lime-900/10 h-6 border border-lime-900/30 mt-8 overflow-hidden"><div className="h-full bg-lime-400 transition-all duration-1000" style={{ width: `${masterProgress}%` }} /></div>
        </div>
        <div className="lg:col-span-2 border-2 border-lime-900/50 p-10 bg-zinc-900/10">
          <h3 className="text-white font-metal text-2xl uppercase mb-8 border-b border-lime-900/30 pb-4">Team Power Levels</h3>
          <div className="space-y-8">
            {["Joey", "Zak", "JG"].map(user => (
              <div key={user} className="flex items-center gap-6">
                <span className="font-metal text-2xl w-20">{user}</span>
                <div className="flex-1 bg-zinc-900 h-4 border border-zinc-800"><motion.div className="h-full bg-lime-400" animate={{ width: `${Math.min((data.contributions?.[user] || 0) * 3, 100)}%` }} /></div>
                <span className="font-metal text-lime-900 text-xl">{data.contributions?.[user] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className={`border-4 p-8 flex gap-6 items-center ${bottleneck.count > 0 ? 'border-red-900 bg-red-900/10' : 'border-lime-900/30 bg-zinc-900/10'}`}>
           <AlertTriangle size={48} className={bottleneck.count > 0 ? 'text-red-500 animate-pulse' : 'text-lime-900'} />
           <div><h4 className="font-metal text-2xl uppercase">Bottleneck</h4><p className="text-white font-metal text-xl">{bottleneck.count > 0 ? `${bottleneck.count} STUCK: ${bottleneck.label}` : "ALL CLEAR"}</p></div>
        </div>
        <div className="lg:col-span-2 border-2 border-lime-900/50 p-8 bg-zinc-900/10">
           <div className="flex justify-between items-end mb-4"><h4 className="text-white font-metal text-2xl uppercase">Deployed Funds</h4><span className="font-metal text-xl text-white">${totalSpent} / <span className="text-lime-900">${TOTAL_BUDGET}</span></span></div>
           <div className="w-full bg-zinc-900 h-6 border border-zinc-800"><div className={`h-full transition-all duration-500 ${totalSpent > TOTAL_BUDGET * 0.9 ? 'bg-red-600' : 'bg-lime-400'}`} style={{ width: `${(totalSpent/TOTAL_BUDGET)*100}%` }} /></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 border-2 border-lime-900/50 p-8 bg-zinc-900/10">
           <h4 className="text-white font-metal text-2xl uppercase mb-8 border-b border-lime-900/30 pb-4 italic">Release Roadmap</h4>
           <div className="w-full overflow-x-auto pb-6 scrollbar-hide"><div className="relative flex justify-between items-center px-8 min-w-[700px] py-12"><div className="absolute top-1/2 left-0 w-full h-[2px] bg-lime-900/30 -translate-y-1/2"></div>
              {['May 21', 'Jun 04', 'Jun 18', 'Jul 02', 'Jul 16', 'Jul 30'].map((date, i) => (
                 <div key={i} className="relative z-10 flex flex-col items-center"><div className="w-4 h-4 bg-black border-2 border-lime-400 rounded-none rotate-45"></div><span className="text-[12px] font-metal text-white absolute top-8 whitespace-nowrap">{date}</span></div>
              ))}
           </div></div>
        </div>
        <div className="border-2 border-lime-900/50 p-8 bg-black">
           <h4 className="text-white font-metal text-2xl uppercase mb-4 italic">Audit Log</h4>
           <div className="h-40 overflow-y-auto font-mono text-[10px] text-lime-900 bg-black p-4 border border-lime-900/20">{data.logs?.map((l, i) => <div key={i}>{l}</div>)}</div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-6xl font-metal text-white uppercase italic mb-10 underline decoration-lime-900 decoration-4">Operational Tracklist</h3>
        {data.songs?.map((song, i) => {
          const tasks = Object.values(data.progress?.[song] || {});
          const perc = Math.round((tasks.filter(Boolean).length / TRACKER_TASKS.length) * 100) || 0;
          return (
            <div key={song} className="border-l-[16px] border-lime-600 bg-zinc-900/20 p-10">
              <div className="flex justify-between items-center mb-10 border-b-2 border-zinc-900 pb-4"><div><span className="text-lime-900 font-metal text-2xl">0{i+1}</span><h4 className="text-5xl font-metal text-white uppercase leading-none mt-1">{song}</h4></div><div className="text-5xl font-metal text-lime-400 italic">{perc}%</div></div>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {TRACKER_TASKS.map(t => (
                  <button key={t.id} onClick={() => toggleTask(song, t.id, t.label)} className={`p-4 border border-lime-900/10 flex flex-col items-center gap-4 transition-all ${data.progress?.[song]?.[t.id] ? 'bg-lime-400 text-black border-lime-400' : 'hover:border-lime-400/50 hover:bg-lime-400/5'}`}>
                    {data.progress?.[song]?.[t.id] ? <CheckSquare size={20} /> : <Square size={20} className="text-lime-900" />}
                    <span className="text-[9px] uppercase font-bold text-center leading-none">{t.label}</span>
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
