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

/**
 * PA$TY OFFICIAL WEBSITE & STORE - VERSION 4.0: INDUSTRIAL DECAY
 * FULL LOGIC INTEGRATION + ALT-ROCK AESTHETIC
 */

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

// --- DATA & ASSETS ---
const ARTIST_IMAGE_URL = "/background.jpg";
const LOGO_URL = "/logo.png";
const LINKTREE_URL = "https://linktr.ee/pastymusic";
const GOOGLE_DRIVE_PHOTOS_URL = "https://drive.google.com/drive/folders/1jcZVxoElLlwNotT__L13CGLOG3RqAWaR?usp=drive_link"; 
const YOUTUBE_VIDEO_ID = "581MvmIE9to";

const PRODUCTS = [
  { id: 1, name: "PA$TY SYSTEM TEE", price: 35, image: "first.jpg", desc: "100% Cotton. Distressed Print." },
  { id: 2, name: "DECAY HOODIE", price: 65, image: "second.jpg", desc: "Box fit. Acid wash black." },
  { id: 3, name: "TRAP BOLT CAP", price: 25, image: "third.jpg", desc: "Embroidered. Snapback." }
];

const TRACKS = [
  { title: "Runaway (feat. Pa$ty)", length: "Single", url: "https://music.apple.com/us/album/runaway-feat-pa%24ty-single/1844412963" },
  { title: "Yale", length: "Single", url: "https://music.apple.com/us/album/yale-single/1826390402" },
  { title: "Everyday", length: "Single", url: "https://music.apple.com/us/song/everyday/1813493592" },
];

const ADMIN_PASSCODES = { "JOEY2026": "Joey", "ZAK2026": "Zak", "JG2026": "JG" };

const TRACKER_TASKS = [
  { id: 'recorded', label: 'Recorded' }, { id: 'mixed', label: 'Mixed' },
  { id: 'mastered', label: 'Mastered' }, { id: 'dsp', label: 'Uploaded' },
  { id: 'visPlan', label: 'Visuals Planned' }, { id: 'visFilm', label: 'Filmed' },
  { id: 'visComp', label: 'Edit Complete' }, { id: 'promoFilm', label: 'Promo Filmed' },
  { id: 'promoSched', label: 'Scheduled' }, { id: 'ads', label: 'Ads Configured' }
];

const BUDGET_CAPS = { "Zak": 1200, "Ads": 1800, "Instrumentals": 300, "Studio": 400, "Other": 300 };
const TOTAL_BUDGET = 4000;

const INITIAL_PROJECT_SONGS = [
  "WHAT’S IT CALLED", "HARD TO SEE", "MY $IDE", "I AIN’T LIKE THAT", 
  "LET ME DOWN", "DAY IS OVER", "NOWADAYS", "ALRIGHT", 
  "HAVE IT ALL", "MY LIFE TODAY", "NO WAY"
];

const INITIAL_TRACKER_DATA = {
  songs: INITIAL_PROJECT_SONGS,
  progress: INITIAL_PROJECT_SONGS.reduce((acc, song) => {
    acc[song] = TRACKER_TASKS.reduce((tAcc, task) => { tAcc[task.id] = false; return tAcc; }, {});
    return acc;
  }, {}),
  logs: [`> [SYSTEM] Tracker Initialized.`],
  budget: { Zak: 0, Ads: 0, Instrumentals: 0, Studio: 0, Other: 0 },
  contributions: { Joey: 0, Zak: 0, JG: 0 },
  eraIdentity: ["INDUSTRIAL", "BRUTALISM", "ALT-ROCK", "NOISE"]
};

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Special+Elite&display=swap');
    .font-metal { font-family: 'Anton', sans-serif; letter-spacing: -0.02em; }
    .font-zine { font-family: 'Special Elite', cursive; }
    .scanlines::after {
      content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      z-index: 10; background-size: 100% 3px, 3px 100%; pointer-events: none;
    }
    .noise-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: url('https://grainy-gradients.vercel.app/noise.svg');
      opacity: 0.06; pointer-events: none; z-index: 100;
    }
  `}</style>
);

// --- LANDING PAGE ---
const LandingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setNotification(`Added ${product.name}`);
    setTimeout(() => setNotification(null), 3000);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-[#050505] text-[#d1d1d1] min-h-screen font-zine selection:bg-red-700 selection:text-white scanlines relative overflow-x-hidden">
      <div className="noise-overlay" />
      <GlobalStyles />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 border-b-4 border-red-900 bg-black/90">
        <div className="text-4xl font-metal italic uppercase tracking-tighter text-white">PA$TY</div>
        <div className="flex items-center gap-8">
          <button onClick={() => document.getElementById('music').scrollIntoView({ behavior: 'smooth' })} className="hidden md:block font-metal text-xl uppercase hover:text-red-600 transition-none">Sound</button>
          <button onClick={() => document.getElementById('store').scrollIntoView({ behavior: 'smooth' })} className="hidden md:block font-metal text-xl uppercase hover:text-red-600 transition-none">Gear</button>
          <Link to="/admin" className="hidden md:block font-metal text-xl uppercase hover:text-red-600 transition-none">Admin</Link>
          <button onClick={() => setIsCartOpen(true)} className="relative border-2 border-white p-1 hover:bg-red-700 transition-none">
            <ShoppingBag size={24} />
            {cart.length > 0 && <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center border-2 border-black">{cart.length}</span>}
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden hover:text-red-600"><Menu size={24} /></button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <img src={ARTIST_IMAGE_URL} alt="Pa$ty" className="w-full h-full object-cover grayscale contrast-[1.4] brightness-50" />
        </motion.div>
        <div className="relative z-20 text-center">
          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[15vw] md:text-[12vw] font-metal uppercase leading-[0.8] text-white">SYSTEM DECAY</motion.h1>
          <p className="mt-4 font-zine text-xl text-red-600 uppercase tracking-[0.3em] animate-pulse">2026 ROADMAP INITIATED</p>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="bg-[#050505] relative z-30 border-t-8 border-red-900">
        <section id="music" className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-7xl font-metal uppercase text-white underline decoration-red-700 decoration-8 underline-offset-8">The Noise</h2>
            <div className="space-y-4">
              {TRACKS.map((track, i) => (
                <a key={i} href={track.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-zinc-900 border-l-8 border-red-700 hover:bg-red-700 hover:text-white transition-none group">
                  <div className="flex gap-6 items-center">
                    <span className="text-3xl font-metal text-red-900 group-hover:text-white">0{i+1}</span>
                    <h4 className="text-2xl font-metal uppercase">{track.title}</h4>
                  </div>
                  <ExternalLink size={24} />
                </a>
              ))}
            </div>
          </div>
          <div className="border-8 border-zinc-800 p-2 grayscale contrast-125 bg-black">
             <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} title="YouTube" frameBorder="0" allowFullScreen></iframe>
          </div>
        </section>

        <section id="store" className="py-32 bg-white text-black">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-8xl font-metal uppercase mb-16 tracking-tighter text-center">Physical Goods</h2>
            <div className="grid md:grid-cols-3 border-4 border-black">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="border-4 border-black p-8 group hover:bg-black hover:text-white transition-none">
                  <div className="relative mb-6 border-2 border-black overflow-hidden">
                    <img src={product.image} className="w-full aspect-square object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105" alt={product.name} />
                  </div>
                  <h3 className="text-4xl font-metal uppercase leading-none mb-2">{product.name}</h3>
                  <p className="text-sm font-zine mb-6">{product.desc}</p>
                  <div className="flex justify-between items-end border-t-4 border-black pt-4 group-hover:border-white">
                    <span className="text-5xl font-metal">${product.price}</span>
                    <button onClick={() => addToCart(product)} className="bg-black text-white px-8 py-3 font-metal text-xl uppercase hover:bg-red-700 transition-none">Acquire</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-20 border-t-8 border-red-900 text-center bg-black">
          <h2 className="text-6xl font-metal text-red-900 mb-8 italic">PA$TY</h2>
          <div className="flex justify-center gap-12 font-metal text-2xl uppercase">
            <a href="https://www.instagram.com/pastymusic__/" className="hover:text-red-600 transition-none">Instagram</a>
            <a href="https://www.youtube.com/@pastymusic_" className="hover:text-red-600 transition-none">YouTube</a>
            <a href={LINKTREE_URL} className="hover:text-red-600 transition-none">Links</a>
          </div>
          <p className="mt-12 opacity-30 text-xs uppercase tracking-widest">© 2026 PA$TY / DECAY SYSTEM INC</p>
        </footer>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-black z-[100] flex flex-col p-8">
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end mb-12"><X size={48} className="text-red-600" /></button>
            <div className="flex flex-col gap-12 text-6xl font-metal uppercase">
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('music').scrollIntoView(); }}>Sound</button>
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('store').scrollIntoView(); }}>Gear</button>
              <Link to="/epk" onClick={() => setIsMobileMenuOpen(false)}>EPK</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-red-900/40 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-black border-l-8 border-red-700 z-[70] p-8 flex flex-col">
              <div className="flex justify-between items-center mb-12 border-b-4 border-red-900 pb-4">
                <h2 className="text-5xl font-metal uppercase text-white">Payload</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={40} className="text-red-600" /></button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {cart.length === 0 ? <p className="text-red-900 text-2xl font-metal">EMPTY</p> : cart.map((item, i) => (
                  <div key={i} className="bg-zinc-900 p-4 border-2 border-white flex gap-4 items-center">
                    <img src={item.image} className="w-16 h-16 grayscale border border-white" alt="item" />
                    <div className="flex-1">
                      <h4 className="font-metal text-xl uppercase leading-none">{item.name}</h4>
                      <p className="text-red-600 font-metal">${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(i)} className="text-red-900 hover:text-white"><X size={20}/></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="mt-8 border-t-4 border-red-900 pt-6">
                  <div className="flex justify-between text-4xl font-metal mb-6"><span>Total</span><span>${cartTotal}</span></div>
                  <button className="w-full bg-red-700 text-white font-metal text-3xl py-6 uppercase hover:bg-white hover:text-black transition-none">Acquire Assets</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {notification && (
        <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="fixed bottom-8 left-8 z-[200] bg-red-700 text-white px-8 py-4 font-metal text-2xl uppercase border-4 border-black shadow-[8px_8px_0px_#000]">
          {notification}
        </motion.div>
      )}
    </div>
  );
};

// --- ADMIN DASHBOARD ---
const AdminDashboard = () => {
  const [authName, setAuthName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [trackerData, setTrackerData] = useState(INITIAL_TRACKER_DATA);
  const [masterProgress, setMasterProgress] = useState(0);
  
  const [newSongName, setNewSongName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Zak");
  const [newEraTag, setNewEraTag] = useState("");

  const getTimestamp = () => {
    const now = new Date();
    return `[${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} - ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]`;
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem('pasty_admin_user');
    if (savedUser) setAuthName(savedUser);

    const progressDocRef = doc(db, "admin_data", "project_tracker");
    const unsubscribe = onSnapshot(progressDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTrackerData(data);
        // Master Progress Logic
        const totalPossible = (data.songs?.length || 0) * TRACKER_TASKS.length;
        const totalDone = data.songs.reduce((acc, song) => {
          return acc + Object.values(data.progress?.[song] || {}).filter(Boolean).length;
        }, 0);
        setMasterProgress(Math.round((totalDone / totalPossible) * 100) || 0);
      } else {
        setDoc(progressDocRef, INITIAL_TRACKER_DATA);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (ADMIN_PASSCODES[passcode]) {
      const user = ADMIN_PASSCODES[passcode];
      setAuthName(user);
      sessionStorage.setItem('pasty_admin_user', user);
    } else { alert("ACCESS DENIED."); }
  };

  const updateFirebase = async (newData) => {
    await setDoc(doc(db, "admin_data", "project_tracker"), newData, { merge: true });
  };

  const toggleTask = (song, taskId, label) => {
    const currentState = trackerData.progress[song]?.[taskId] || false;
    const newLog = `> ${getTimestamp()} ${authName}: ${song} -> ${label} (${!currentState ? 'DONE' : 'PENDING'})`;
    const newContributions = { ...trackerData.contributions };
    if (!currentState) newContributions[authName] = (newContributions[authName] || 0) + 1;

    const newData = {
      ...trackerData,
      contributions: newContributions,
      progress: { ...trackerData.progress, [song]: { ...trackerData.progress[song], [taskId]: !currentState } },
      logs: [newLog, ...(trackerData.logs || [])].slice(0, 50)
    };
    updateFirebase(newData);
  };

  const handleAddSong = (e) => {
    e.preventDefault();
    if(!newSongName.trim()) return;
    const songKey = newSongName.toUpperCase();
    const newData = {
      ...trackerData,
      songs: [...trackerData.songs, songKey],
      progress: { ...trackerData.progress, [songKey]: TRACKER_TASKS.reduce((a, t) => { a[t.id] = false; return a; }, {}) },
      logs: [`> ${getTimestamp()} ${authName} ADDED: ${songKey}`, ...(trackerData.logs || [])].slice(0, 50)
    };
    updateFirebase(newData);
    setNewSongName("");
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amt = parseFloat(expenseAmount);
    if(isNaN(amt)) return;
    const newData = {
      ...trackerData,
      budget: { ...trackerData.budget, [expenseCategory]: (trackerData.budget[expenseCategory] || 0) + amt },
      logs: [`> ${getTimestamp()} ${authName} LOGGED: $${amt} -> ${expenseCategory}`, ...(trackerData.logs || [])].slice(0, 50)
    };
    updateFirebase(newData);
    setExpenseAmount("");
  };

  const getBottleneck = () => {
    let maxStuck = -1; let bottleneckTask = null; let stuckCount = 0;
    TRACKER_TASKS.forEach((task, i) => {
      let currentStuck = 0;
      trackerData.songs.forEach(song => {
        if (!trackerData.progress[song]?.[task.id]) {
          if (i === 0 || trackerData.progress[song]?.[TRACKER_TASKS[i-1].id]) currentStuck++;
        }
      });
      if (currentStuck > maxStuck) { maxStuck = currentStuck; bottleneckTask = task; stuckCount = currentStuck; }
    });
    return stuckCount === 0 ? { label: "CLEAR", count: 0 } : { label: bottleneckTask.label, count: stuckCount };
  };

  const bottleneck = getBottleneck();
  const totalSpent = Object.values(trackerData.budget || {}).reduce((a,b)=>a+b, 0);

  if (!authName) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6 font-zine text-red-600 scanlines">
        <GlobalStyles />
        <div className="border-8 border-red-700 p-12 max-w-md w-full bg-red-900/10">
          <h1 className="text-6xl font-metal text-white uppercase mb-8 tracking-tighter">DECAY ACCESS</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={passcode} onChange={(e)=>setPasscode(e.target.value)} placeholder="PASSWORD" className="w-full bg-black border-4 border-red-900 p-4 text-center font-metal text-3xl text-white outline-none focus:border-red-600" />
            <button className="w-full bg-red-700 text-white py-6 font-metal text-2xl uppercase hover:bg-white hover:text-black">INITIALIZE</button>
          </form>
          <Link to="/" className="block text-center mt-8 text-red-900 underline uppercase">Abort</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-4 md:p-12 font-zine text-red-600 scanlines relative overflow-x-hidden">
      <GlobalStyles />
      <header className="border-8 border-red-700 p-8 flex flex-col md:flex-row justify-between items-center mb-12 bg-zinc-900/50">
        <div>
          <h1 className="text-7xl font-metal text-white uppercase italic">SYSTEM: ONLINE</h1>
          <p className="text-xl font-metal uppercase text-red-800">Operator: {authName} // Version 4.0 // Decay Module</p>
        </div>
        <button onClick={()=>{sessionStorage.removeItem('pasty_admin_user'); setAuthName("");}} className="border-4 border-red-700 px-8 py-2 font-metal text-2xl text-white hover:bg-red-700 transition-none">ABORT SESSION</button>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="border-4 border-red-700 p-8 flex flex-col items-center justify-center bg-red-900/5">
           <h3 className="text-white font-metal text-2xl uppercase mb-4 border-b-2 border-red-900 w-full text-center">Master Pulse</h3>
           <div className="text-[12rem] font-metal leading-none text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">{masterProgress}%</div>
        </div>

        <div className="lg:col-span-2 border-4 border-red-700 p-8">
           <div className="flex justify-between items-end mb-8 border-b-2 border-red-900 pb-2">
              <h3 className="text-white font-metal text-2xl uppercase">Operational Funds</h3>
              <p className="font-metal text-3xl text-white">${totalSpent} / <span className="text-red-900">${TOTAL_BUDGET}</span></p>
           </div>
           <div className="w-full bg-red-900/20 h-12 border-2 border-red-700 mb-8 overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${(totalSpent/TOTAL_BUDGET)*100}%` }} />
           </div>
           <form onSubmit={handleAddExpense} className="flex gap-4">
              <select value={expenseCategory} onChange={(e)=>setExpenseCategory(e.target.value)} className="bg-black border-2 border-red-900 text-white font-metal p-2 flex-1 outline-none">
                {Object.keys(BUDGET_CAPS).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="number" value={expenseAmount} onChange={(e)=>setExpenseAmount(e.target.value)} placeholder="AMT" className="bg-black border-2 border-red-900 text-white font-metal p-2 w-32 outline-none" />
              <button className="bg-red-700 text-white px-6 font-metal uppercase hover:bg-white hover:text-black">LOG</button>
           </form>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="border-4 border-yellow-700 bg-yellow-900/10 p-6 flex gap-6 items-center">
           <AlertTriangle size={48} className="text-yellow-600 animate-pulse" />
           <div>
              <h4 className="text-yellow-600 font-metal text-2xl uppercase">Bottleneck</h4>
              <p className="text-white font-metal text-xl">{bottleneck.count} STUCK: {bottleneck.label}</p>
           </div>
        </div>
        <div className="lg:col-span-2 border-4 border-red-700 p-6">
           <h4 className="text-white font-metal text-xl uppercase mb-4 border-b border-red-900">Audit Log</h4>
           <div className="h-24 overflow-y-auto font-mono text-[10px] text-red-500 bg-black/50 p-4">
              {trackerData.logs?.map((l, i) => <div key={i}>{l}</div>)}
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-6xl font-metal text-white uppercase italic mb-8 underline decoration-red-700 decoration-4">The Tracklist</h3>
        {trackerData.songs?.map((song, i) => {
          const tasks = Object.values(trackerData.progress?.[song] || {});
          const done = tasks.filter(Boolean).length;
          const perc = Math.round((done / TRACKER_TASKS.length) * 100) || 0;
          return (
            <div key={song} className="border-l-[20px] border-red-700 bg-zinc-900/80 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b-2 border-zinc-800 pb-4">
                <div>
                   <span className="text-red-900 font-metal text-2xl">0{i+1} / 11</span>
                   <h4 className="text-5xl font-metal text-white uppercase leading-none">{song}</h4>
                </div>
                <div className="text-5xl font-metal text-red-600">{perc}%</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {TRACKER_TASKS.map(task => {
                  const isDone = trackerData.progress?.[song]?.[task.id];
                  return (
                    <button key={task.id} onClick={()=>toggleTask(song, task.id, task.label)} className={`p-4 border border-zinc-700 flex flex-col items-center gap-3 group ${isDone ? 'bg-red-700 border-red-600' : 'hover:border-white'}`}>
                      <div className={isDone ? 'text-white' : 'text-zinc-600 group-hover:text-white'}>
                        {isDone ? <CheckSquare size={20} /> : <Square size={20} />}
                      </div>
                      <span className={`text-[8px] uppercase font-bold text-center leading-tight ${isDone ? 'text-white' : 'text-zinc-500'}`}>{task.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
        <form onSubmit={handleAddSong} className="mt-12 flex gap-4 border-8 border-dashed border-zinc-800 p-8">
          <input type="text" value={newSongName} onChange={(e)=>setNewSongName(e.target.value)} placeholder="NEW ASSET TITLE..." className="bg-black border-4 border-red-900 p-4 flex-1 font-metal text-2xl text-white outline-none" />
          <button className="bg-red-700 text-white px-12 font-metal text-2xl uppercase hover:bg-white hover:text-black">DEPLOY</button>
        </form>
      </div>
    </div>
  );
};

// --- EPK PAGE ---
const EPKPage = () => {
  const handlePrint = () => window.print();
  return (
    <div className="bg-[#f0f0f0] text-black min-h-screen p-4 md:p-16 font-zine selection:bg-black selection:text-white print:p-0">
      <GlobalStyles />
      <div className="max-w-5xl mx-auto border-[12px] border-black p-8 md:p-16 bg-white shadow-[25px_25px_0px_#991b1b] relative print:shadow-none print:border-4">
        <header className="border-b-[10px] border-black pb-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h1 className="text-[14vw] md:text-[10rem] font-metal leading-[0.7] uppercase -ml-4">PA$TY</h1>
            <p className="bg-red-700 text-white px-4 py-1 text-2xl font-metal uppercase mt-4 inline-block">Electronic Press Kit // v2026</p>
          </div>
          <div className="text-right uppercase font-bold text-xs">
            <p>Management: Jonathan Gleason</p>
            <p className="underline">jonathangleasonmgmt@gmail.com</p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div className="border-[6px] border-black p-2 grayscale contrast-150 rotate-[-1deg] shadow-[15px_15px_0px_#000]">
            <img src={ARTIST_IMAGE_URL} className="w-full aspect-[3/4] object-cover" alt="PA$TY" />
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <h2 className="text-7xl font-metal uppercase underline decoration-8 decoration-black underline-offset-4">The Subject</h2>
            <p className="text-xl leading-snug font-bold">
              Alternative rap artist blending rock, hip-hop, and noise influences into a visceral emotional system.
            </p>
            <p className="text-2xl font-bold bg-black text-white p-6 rotate-[1deg] border-l-[12px] border-red-700">
              "His 2026 release cycle exceeds expectations with striking visuals and a sonic evolution that redefines the genre."
            </p>
            <div className="flex gap-4 print:hidden">
              <button onClick={handlePrint} className="border-4 border-black px-8 py-4 font-metal text-2xl uppercase hover:bg-black hover:text-white transition-none">Print Bio</button>
              <a href={GOOGLE_DRIVE_PHOTOS_URL} target="_blank" className="bg-red-700 text-white px-8 py-4 font-metal text-2xl uppercase hover:bg-black transition-none">Digital Assets</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t-8 border-black pt-16">
          <div><h3 className="text-7xl font-metal">80k+</h3><p className="uppercase text-sm font-bold">Streams</p></div>
          <div><h3 className="text-7xl font-metal">5k+</h3><p className="uppercase text-sm font-bold">Followers</p></div>
          <div><h3 className="text-7xl font-metal">10+</h3><p className="uppercase text-sm font-bold">Shows</p></div>
          <div><h3 className="text-7xl font-metal">2026</h3><p className="uppercase text-sm font-bold">Cycle</p></div>
        </div>
      </div>
    </div>
  );
};

// --- APP ROUTER ---
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
