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
 * PA$TY OFFICIAL WEBSITE & STORE - MISSION CONTROL V3
 */

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyCDXFEqQdHob9ZtrHQci4re1frJgXs5rcg",
  authDomain: "pasty-b1836.firebaseapp.com",
  projectId: "pasty-b1836",
  storageBucket: "pasty-b1836.firebasestorage.app",
  messagingSenderId: "244681766091",
  appId: "1:244681766091:web:8da266818b9496105d174e",
  measurementId: "G-310DYQTZ9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- DATA & ASSETS ---
const ARTIST_IMAGE_URL = "/background.jpg";
const LOGO_URL = "/logo.png";
const LINKTREE_URL = "https://linktr.ee/pastymusic";
const GOOGLE_DRIVE_PHOTOS_URL = "https://drive.google.com/drive/folders/1jcZVxoElLlwNotT__L13CGLOG3RqAWaR?usp=drive_link"; 
const YOUTUBE_VIDEO_ID = "581MvmIE9to";

const PRODUCTS = [
  { id: 1, name: "Pa$ty Classic Tee", price: 35, image: "first.jpg", desc: "100% Cotton. Puff Print Logo." },
  { id: 2, name: "Work Hard Play Hard Tee", price: 35, image: "second.jpg", desc: "Oversized fit. Acid wash black." },
  { id: 3, name: "Runner Up Hat", price: 20, image: "third.jpg", desc: "Embroidered details. Snapback." }
];

const TRACKS = [
  { title: "Runaway (feat. Pa$ty)", length: "Single", url: "https://music.apple.com/us/album/runaway-feat-pa%24ty-single/1844412963" },
  { title: "Yale", length: "Single", url: "https://music.apple.com/us/album/yale-single/1826390402" },
  { title: "Everyday", length: "Single", url: "https://music.apple.com/us/song/everyday/1813493592" },
];

// --- ADMIN PLAN DATA ---
const ADMIN_PASSCODES = {
  "JOEY2026": "Joey",
  "ZAK2026": "Zak",
  "JG2026": "JG"
};

const INITIAL_PROJECT_SONGS = [
  "WHAT’S IT CALLED", "HARD TO SEE", "MY $IDE", "I AIN’T LIKE THAT", 
  "LET ME DOWN", "DAY IS OVER", "NOWADAYS", "ALRIGHT", 
  "HAVE IT ALL", "MY LIFE TODAY", "NO WAY"
];

const TRACKER_TASKS = [
  { id: 'recorded', label: 'Recorded' },
  { id: 'mixed', label: 'Mixed' },
  { id: 'mastered', label: 'Mastered' },
  { id: 'dsp', label: 'Uploaded to DSP' },
  { id: 'visPlan', label: 'Visuals Planned' },
  { id: 'visFilm', label: 'Visuals Filmed' },
  { id: 'visComp', label: 'Visuals Complete' },
  { id: 'promoFilm', label: 'Promo Filmed' },
  { id: 'promoSched', label: 'Content Scheduled' },
  { id: 'ads', label: 'Ads Configured' }
];

const BUDGET_CAPS = {
  "Zak": 1200,
  "Ads": 1800,
  "Instrumentals": 300,
  "Studio": 400,
  "Other": 300
};
const TOTAL_BUDGET = 4000;

const INITIAL_TRACKER_DATA = {
  songs: INITIAL_PROJECT_SONGS,
  progress: INITIAL_PROJECT_SONGS.reduce((acc, song) => {
    acc[song] = TRACKER_TASKS.reduce((tAcc, task) => { tAcc[task.id] = false; return tAcc; }, {});
    return acc;
  }, {}),
  logs: [`> [SYSTEM] Tracker Initialized.`],
  budget: { Zak: 0, Ads: 0, Instrumentals: 0, Studio: 0, Other: 0 },
  contributions: { Joey: 0, Zak: 0, JG: 0 },
  eraIdentity: ["Retro 80s", "High Quality", "Streetwear", "BFTB Branding"]
};

// --- PAGES ---

// 1. MAIN LANDING PAGE
const LandingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    let timeoutId;
    const triggerFlash = () => {
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 150);
      const nextDelay = Math.random() * (7000 - 3000) + 3000;
      timeoutId = setTimeout(triggerFlash, nextDelay);
    };
    timeoutId = setTimeout(triggerFlash, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.8]);
  const logoY = useTransform(scrollY, [0, 400], [0, -150]);
  const bgDarken = useTransform(scrollY, [0, 500], ["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    showNotification(`Added ${product.name} to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  const GlitchLink = ({ text, onClick, to, newTab }) => {
    const [displayText, setDisplayText] = useState(text);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=";
    const intervalRef = useRef(null);

    const handleMouseEnter = () => {
      let iteration = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplayText(prev => 
          text.split("").map((letter, index) => {
            if(index < iteration) return text[index];
            return letters[Math.floor(Math.random() * letters.length)]
          }).join("")
        );
        if(iteration >= text.length) clearInterval(intervalRef.current);
        iteration += 1 / 3;
      }, 30);
    };

    const handleMouseLeave = () => {
      clearInterval(intervalRef.current);
      setDisplayText(text);
    };

    if (to) {
      return (
        <Link 
          to={to} 
          target={newTab ? "_blank" : "_self"}
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          className="hidden md:block hover:text-green-400 transition-colors uppercase text-sm tracking-widest font-mono"
        >
          {displayText}
        </Link>
      );
    }

    return (
      <button 
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hidden md:block hover:text-green-400 transition-colors uppercase text-sm tracking-widest font-mono"
      >
        {displayText}
      </button>
    );
  };

  const Marquee = () => {
    return (
      <div className="bg-green-500 text-black overflow-hidden py-3 border-y border-black relative z-40 select-none">
        <div className="flex whitespace-nowrap">
          <motion.div className="flex items-center text-xl font-black uppercase tracking-widest" animate={{ x: [0, -1035] }} transition={{ repeat: Infinity, ease: "linear", duration: 5 }}>
            {[...Array(20)].map((_, i) => (
               <span key={i} className="mx-2 text-2xl italic font-black flex items-center gap-4">/////</span>
            ))}
          </motion.div>
          <motion.div className="flex items-center text-xl font-black uppercase tracking-widest" animate={{ x: [0, -1035] }} transition={{ repeat: Infinity, ease: "linear", duration: 5 }}>
            {[...Array(20)].map((_, i) => (
               <span key={i} className="mx-2 text-2xl italic font-black flex items-center gap-4">/////</span>
            ))}
          </motion.div>
        </div>
      </div>
    )
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference text-white">
        <div className="text-xl font-bold tracking-tighter uppercase">PA$TY</div>
        <div className="flex items-center gap-6">
          <GlitchLink text="Music" onClick={() => document.getElementById('music').scrollIntoView({ behavior: 'smooth' })} />
          <GlitchLink text="Shop" onClick={() => document.getElementById('store').scrollIntoView({ behavior: 'smooth' })} />
          <GlitchLink text="EPK" to="/epk" newTab={true} />
          <GlitchLink text="BFTB" to="/admin" />
          
          <button onClick={() => setIsCartOpen(true)} className="relative hover:text-green-400 transition-colors">
            <ShoppingBag size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden hover:text-green-400 transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <section className="relative h-[120vh] w-full overflow-hidden">
        <div className="fixed top-0 left-0 w-full h-full z-0 flex justify-center items-end pointer-events-none">
           <motion.img style={{ opacity: heroOpacity, scale: heroScale }} src={ARTIST_IMAGE_URL} alt="Pa$ty" className="w-full h-full object-cover object-center" />
           <div className={`absolute inset-0 bg-white z-[5] pointer-events-none mix-blend-overlay transition-opacity duration-100 ease-out ${showLightning ? 'opacity-60' : 'opacity-0'}`} />
           <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-[1] opacity-30 pointer-events-none mix-blend-overlay">
              <svg className="w-full h-full opacity-40">
                <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
           </motion.div>
        </div>
        <motion.div style={{ backgroundColor: bgDarken }} className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-screen z-20 flex flex-col justify-center items-center p-4">
          <motion.img src={LOGO_URL} alt="PA$TY Logo" style={{ y: logoY }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="w-full max-w-2xl" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 animate-bounce">
             <div className="h-16 w-[1px] bg-gradient-to-b from-green-500 to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-30 bg-black w-full border-t border-gray-900 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,1)] mt-[-20vh] overflow-hidden">
        <div className="pt-12 pb-6"><Marquee /></div>
        
        <section id="music" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 border-b border-gray-800 pb-8 flex justify-between items-end">
             <div><h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">The Sound</h2><p className="text-gray-400 mt-2">Latest visuals & releases.</p></div>
             <Music className="text-green-500 hidden md:block" size={48} />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-green-900/10">
              <iframe className="w-full h-full absolute inset-0" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center space-y-4">
              {TRACKS.map((track, i) => (
                <a key={i} href={track.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-green-500 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4"><span className="text-gray-500 text-sm font-mono">0{i+1}</span><div><h4 className="font-bold group-hover:text-green-400 transition-colors">{track.title}</h4><p className="text-xs text-gray-400">Apple Music</p></div></div>
                  <span className="text-sm text-gray-500 flex items-center gap-2">{track.length} <ExternalLink size={12} /></span>
                </a>
              ))}
              <a href={LINKTREE_URL} target="_blank" rel="noopener noreferrer" className="w-full py-4 mt-4 border border-green-500 text-green-500 uppercase font-bold tracking-widest hover:bg-green-500 hover:text-black transition-colors rounded flex items-center justify-center gap-2">
                Listen Now <ExternalLink size={16}/>
              </a>
            </motion.div>
          </div>
        </section>

        <section id="store" className="py-24 px-6 md:px-12 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
              <span className="text-green-500 uppercase tracking-widest text-sm font-bold">Shop The Drop</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mt-2">2026 Collection</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {PRODUCTS.map((product) => (
                <motion.div key={product.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="group">
                  <div className="relative aspect-[4/5] bg-gray-800 rounded-2xl overflow-hidden mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <button onClick={() => addToCart(product)} className="w-full bg-white text-black py-3 font-bold uppercase tracking-wide hover:bg-green-500 transition-colors">Add to Cart</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div><h3 className="text-lg font-bold uppercase leading-tight">{product.name}</h3><p className="text-gray-400 text-sm mt-1">{product.desc}</p></div>
                    <span className="text-lg font-mono text-green-400">${product.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-gray-900 bg-black relative overflow-hidden">
           <div className="absolute inset-0 bg-green-500/5 z-0"></div>
           <div className="max-w-xl mx-auto text-center relative z-10 px-6">
               <h3 className="text-3xl md:text-5xl font-black uppercase mb-2 tracking-tighter">STAY CONNECTED</h3>
               <p className="text-gray-400 mb-8">Sign up.</p>
               <div className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1 relative group">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-900 rounded opacity-50 group-hover:opacity-100 transition duration-500 blur"></div>
                   <input type="text" placeholder="ENTER YOUR NUMBER" className="relative w-full bg-black border border-gray-800 text-white p-4 uppercase font-mono tracking-widest placeholder:text-gray-600 focus:outline-none focus:border-green-500 transition-colors" />
                 </div>
                 <button className="bg-green-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-green-400 transition-colors flex items-center justify-center gap-2">Join <ArrowRight size={20} /></button>
               </div>
               <p className="text-xs text-gray-600 mt-4">By joining you agree to receive automated marketing texts. Rate may apply.</p>
           </div>
        </section>

        <footer className="py-12 bg-black border-t border-gray-900 text-center relative z-20">
            <h2 className="text-3xl font-black uppercase text-gray-800 tracking-tighter">PA$TY</h2>
            <div className="flex justify-center gap-6 mt-6 text-gray-500">
               <a href="https://www.instagram.com/pastymusic__/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
               <a href="https://www.youtube.com/@pastymusic_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
               <a href="https://soundcloud.com/pastymusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SoundCloud</a>
               <a href={LINKTREE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-gray-700 text-xs mt-8">© 2025 PA$TY. All Rights Reserved.</p>
        </footer>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-black z-[60] flex flex-col justify-center items-center p-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white hover:text-green-500"><X size={32} /></button>
            <div className="flex flex-col gap-8 text-center">
               <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('music').scrollIntoView({ behavior: 'smooth' }); }} className="text-3xl font-black uppercase tracking-tighter hover:text-green-500">Music</button>
               <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('store').scrollIntoView({ behavior: 'smooth' }); }} className="text-3xl font-black uppercase tracking-tighter hover:text-green-500">Shop</button>
               <Link to="/epk" target="_blank" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-green-500">EPK</Link>
               <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-tighter hover:text-green-500">BFTB</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-gray-900 border-l border-gray-800 z-50 flex flex-col">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center"><h2 className="text-xl font-bold uppercase">Your Cart ({cart.length})</h2><button onClick={() => setIsCartOpen(false)} className="hover:text-red-500"><X /></button></div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10"><ShoppingBag size={48} className="mx-auto mb-4 opacity-50" /><p>Your bag is empty.</p><button onClick={() => setIsCartOpen(false)} className="mt-4 text-green-500 underline">Start Shopping</button></div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-black/40 p-3 rounded-lg"><img src={item.image} className="w-16 h-16 object-cover rounded" alt="item" /><div className="flex-1"><h4 className="font-bold text-sm line-clamp-1">{item.name}</h4><p className="text-green-400 text-sm font-mono">${item.price}</p></div><button onClick={() => removeFromCart(idx)} className="text-gray-500 hover:text-red-500"><X size={16} /></button></div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-800 bg-black"><div className="flex justify-between mb-4 text-lg font-bold"><span>Total</span><span>${cartTotal}</span></div><button className="w-full bg-green-500 text-black font-bold uppercase py-4 rounded tracking-widest hover:bg-green-400 transition-colors flex justify-center items-center gap-2">Checkout <ChevronRight size={18} /></button></div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-6 z-50 bg-green-500 text-black px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"><Check size={18} /> {notification}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 2. EPK PAGE COMPONENT
const EPKPage = () => {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white">
      <style>{`
        @media print {
          @page { margin: 0.5cm; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; background-color: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:text-black { color: black !important; }
          button { display: none !important; }
        }
      `}</style>
      <div className="p-12 border-b border-black flex justify-between items-end">
        <div>
           <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-4">PA$TY</h1>
           <span className="bg-black text-white px-3 py-1 font-mono uppercase text-sm">Electronic Press Kit</span>
        </div>
        <div className="text-right hidden md:block print:block">
           <p className="font-bold">MANAGEMENT</p>
           <a href="mailto:jonathangleasonmgmt@gmail.com" className="hover:underline">jonathangleasonmgmt@gmail.com</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
         <div className="grid md:grid-cols-2 gap-12 mb-24 print:gap-6 print:mb-12">
            <div className="aspect-[3/4] bg-gray-200">
               <img src={ARTIST_IMAGE_URL} alt="Press Shot" className="w-full h-full object-cover grayscale contrast-125" />
            </div>
            <div className="flex flex-col justify-center">
               <h2 className="text-4xl font-bold uppercase mb-6">The Artist</h2>
               <p className="text-lg leading-relaxed mb-6">
                 Pa$ty is an alternative rap artist who seamlessly blends rock, hip-hop, and emo influences into a unique sound that reflects his raw, emotional journey.
               </p>
               <p className="text-lg leading-relaxed text-gray-600 mb-8 print:text-black font-bold">
                 "His 2026 release plan exceeds expectations with unparalleled depth, striking visuals, and a sonic evolution that redefines the genre."
               </p>
               <div className="flex gap-4 print:hidden">
                  <button onClick={handleDownloadPDF} className="border-2 border-black px-6 py-3 font-bold uppercase flex items-center gap-2 hover:bg-black hover:text-white transition-colors">
                     Download Bio <Download size={18} />
                  </button>
                  <a href={GOOGLE_DRIVE_PHOTOS_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-3 font-bold uppercase flex items-center gap-2 hover:bg-gray-800 transition-colors">
                     Download Photos <Download size={18} />
                  </a>
               </div>
            </div>
         </div>
         <div className="border-y-2 border-black py-12 mb-24 print:py-6 print:mb-12">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div><h3 className="text-5xl font-black mb-2">80k+</h3><p className="uppercase font-mono text-sm">Total Streams</p></div>
                <div><h3 className="text-5xl font-black mb-2">5k+</h3><p className="uppercase font-mono text-sm">Followers</p></div>
                <div><h3 className="text-5xl font-black mb-2">10+</h3><p className="uppercase font-mono text-sm">Shows</p></div>
                <div><h3 className="text-5xl font-black mb-2">2026</h3><p className="uppercase font-mono text-sm">Next Drop</p></div>
             </div>
         </div>
      </div>
    </div>
  );
};

// 3. ADMIN PORTAL (V3 - POWER LEADERBOARD & ERAMood BOARD)
const AdminDashboard = () => {
  const [authName, setAuthName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [trackerData, setTrackerData] = useState(INITIAL_TRACKER_DATA);
  const [daysLeft, setDaysLeft] = useState(0);
  
  const [newSongName, setNewSongName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Zak");
  const [newEraTag, setNewEraTag] = useState("");

  const getTimestamp = () => {
    const now = new Date();
    return `[${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} - ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]`;
  };

  // Move calculatePercentage helper above components use to ensure it's available
  const calculatePercentage = (song) => {
    if (!trackerData || !trackerData.progress || !trackerData.progress[song]) return 0;
    const tasks = Object.values(trackerData.progress[song]);
    const completed = tasks.filter(Boolean).length;
    return Math.round((completed / TRACKER_TASKS.length) * 100) || 0;
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem('pasty_admin_user');
    if (savedUser) setAuthName(savedUser);

    const endDate = new Date('2026-05-17T00:00:00');
    const today = new Date();
    setDaysLeft(Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));

    const progressDocRef = doc(db, "admin_data", "project_tracker");
    const unsubscribe = onSnapshot(progressDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (!data.songs) {
           setDoc(progressDocRef, INITIAL_TRACKER_DATA);
           setTrackerData(INITIAL_TRACKER_DATA);
        } else {
           setTrackerData(data);
        }
      } else {
        setDoc(progressDocRef, INITIAL_TRACKER_DATA);
        setTrackerData(INITIAL_TRACKER_DATA);
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
    } else {
      alert("Invalid Access Code.");
    }
  };

  const handleLogout = () => {
    setAuthName("");
    setPasscode("");
    sessionStorage.removeItem('pasty_admin_user');
  };

  const updateFirebase = async (newData) => {
    try {
      const progressDocRef = doc(db, "admin_data", "project_tracker");
      await setDoc(progressDocRef, newData, { merge: true });
    } catch (error) { console.error("Firestore Error:", error); }
  };

  const toggleTask = (song, taskId, taskLabel) => {
    const currentState = trackerData.progress[song]?.[taskId] || false;
    const newEntry = `> ${getTimestamp()} ${authName}: ${song} -> ${taskLabel} (${!currentState ? 'DONE' : 'PENDING'})`;
    const newLogs = [newEntry, ...(trackerData.logs || [])].slice(0, 50);
    
    // Add contribution point
    const newContributions = { ...trackerData.contributions };
    if (!currentState) newContributions[authName] = (newContributions[authName] || 0) + 1;

    const newData = {
      ...trackerData,
      contributions: newContributions,
      progress: { ...trackerData.progress, [song]: { ...(trackerData.progress[song] || {}), [taskId]: !currentState } },
      logs: newLogs
    };
    setTrackerData(newData);
    updateFirebase(newData);
  };

  const handleAddSong = (e) => {
    e.preventDefault();
    if(!newSongName.trim() || trackerData.songs.includes(newSongName.toUpperCase())) return;
    const songKey = newSongName.toUpperCase();
    const newData = {
      ...trackerData,
      songs: [...trackerData.songs, songKey],
      progress: { ...trackerData.progress, [songKey]: TRACKER_TASKS.reduce((a, t) => { a[t.id] = false; return a; }, {}) },
      logs: [`> ${getTimestamp()} ${authName} ADDED TRACK: ${songKey}`, ...(trackerData.logs || [])].slice(0, 50)
    };
    setTrackerData(newData);
    updateFirebase(newData);
    setNewSongName("");
  };

  const handleAddEraTag = (e) => {
    e.preventDefault();
    if(!newEraTag.trim()) return;
    const newData = { ...trackerData, eraIdentity: [...(trackerData.eraIdentity || []), newEraTag.trim()] };
    setTrackerData(newData);
    updateFirebase(newData);
    setNewEraTag("");
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if(isNaN(amount) || amount <= 0) return;
    const newData = {
      ...trackerData,
      budget: { ...(trackerData.budget || {}), [expenseCategory]: (trackerData.budget[expenseCategory] || 0) + amount },
      logs: [`> ${getTimestamp()} ${authName} LOGGED: $${amount} -> ${expenseCategory}`, ...(trackerData.logs || [])].slice(0, 50)
    };
    setTrackerData(newData);
    updateFirebase(newData);
    setExpenseAmount("");
  };

  // Calculations
  const calculateTotalProgress = () => {
    const totalTasks = trackerData.songs.length * TRACKER_TASKS.length;
    const completedTasks = trackerData.songs.reduce((acc, song) => {
       return acc + Object.values(trackerData.progress[song] || {}).filter(Boolean).length;
    }, 0);
    return Math.round((completedTasks / totalTasks) * 100) || 0;
  };

  const getBottleneck = () => {
    let maxStuck = -1;
    let bottleneckTask = null;
    let stuckCount = 0;
    TRACKER_TASKS.forEach((task, i) => {
       let currentStuck = 0;
       trackerData.songs.forEach(song => {
          if (!trackerData.progress[song]?.[task.id]) {
             if (i === 0 || trackerData.progress[song]?.[TRACKER_TASKS[i-1].id]) currentStuck++;
          }
       });
       if (currentStuck > maxStuck) { maxStuck = currentStuck; bottleneckTask = task; stuckCount = currentStuck; }
    });
    return stuckCount === 0 ? { label: "ALL CLEAR", count: 0 } : { label: bottleneckTask.label, count: stuckCount };
  };

  const bottleneck = getBottleneck();
  const masterProgress = calculateTotalProgress();
  const totalSpent = Object.values(trackerData.budget || {}).reduce((a,b)=>a+b, 0);

  if (!authName) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center font-sans text-white p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl z-50">
           <div className="text-center mb-8">
              <h1 className="text-3xl font-black uppercase tracking-tighter text-white">PA$TY INTERNAL</h1>
              <p className="text-green-500 font-mono text-sm mt-2">SECURE PROJECT PORTAL</p>
           </div>
           <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest">Access Code</label>
                <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="w-full bg-black border border-gray-700 text-white p-4 focus:outline-none focus:border-green-500 uppercase tracking-widest font-mono text-center" placeholder="ENTER CODE" />
              </div>
              <button type="submit" className="w-full bg-green-500 text-black font-bold uppercase py-4 tracking-widest hover:bg-green-400 transition-colors">Initialize Session</button>
           </form>
           <Link to="/" className="block text-center mt-6 text-gray-500 text-xs hover:text-white uppercase tracking-widest underline">Return to public site</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-sans text-white pb-24 max-w-full overflow-x-hidden">
      
      <header className="bg-gray-900 border-b border-gray-800 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50 shadow-2xl">
         <div className="flex items-center gap-4">
           <Link to="/" className="text-2xl font-black uppercase tracking-tighter hover:text-green-500 transition-colors">PA$TY</Link>
           <span className="bg-green-500/20 text-green-500 px-3 py-1 font-mono text-[10px] uppercase font-bold rounded">Mission Control</span>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
               <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Operator</p>
               <p className="font-bold text-green-400">{authName}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold"><LogOut size={16} /> Exit</button>
         </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
         
         {/* OVERALL PULSE GAUGE (FEATURE 3) */}
         <div className="flex flex-col items-center justify-center mb-16 text-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" className="stroke-gray-800 fill-none" strokeWidth="12" />
                  <circle 
                    cx="50%" cy="50%" r="45%" 
                    className="stroke-green-500 fill-none transition-all duration-1000 ease-out" 
                    strokeWidth="12" 
                    strokeDasharray={`${masterProgress * 2.83}, 283`}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 10px #22c55e)" }}
                  />
               </svg>
               <div className="absolute flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-black tracking-tighter">{masterProgress}%</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-green-500">Master Pulse</span>
               </div>
            </div>
         </div>

         <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {/* Team Contributions (FEATURE 1) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
                <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Team Power Levels</h3>
                <div className="space-y-6">
                   {["Joey", "Zak", "JG"].map(user => (
                      <div key={user}>
                         <div className="flex justify-between text-xs font-bold uppercase mb-2">
                            <span>{user}</span>
                            <span className="text-green-500">{trackerData.contributions?.[user] || 0} Tasks</span>
                         </div>
                         <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-gray-800">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-green-900 to-green-500" 
                              initial={{ width: 0 }} 
                              animate={{ width: `${Math.min((trackerData.contributions?.[user] || 0) * 2, 100)}%` }} 
                            />
                         </div>
                      </div>
                   ))}
                </div>
            </motion.div>

            {/* Mood Board / Era Identity (FEATURE 2) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8">
                <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest flex items-center gap-2 mb-6"><Target size={14} className="text-red-500"/> Era Style Directives</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                   {trackerData.eraIdentity?.map((tag, i) => (
                      <span key={i} className="bg-black border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter"># {typeof tag === 'string' ? tag : JSON.stringify(tag)}</span>
                   ))}
                </div>
                <form onSubmit={handleAddEraTag} className="flex gap-2">
                   <input type="text" value={newEraTag} onChange={(e)=>setNewEraTag(e.target.value)} placeholder="ADD DIRECTIVE (E.G. 'ACID WASH')" className="flex-1 bg-black border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-green-500 text-xs font-mono" />
                   <button type="submit" className="bg-gray-800 hover:bg-white hover:text-black transition-colors px-4 py-2 rounded text-[10px] font-bold uppercase"><Plus size={14}/></button>
                </form>
            </motion.div>
         </div>

         {/* Standard Widgets Redux */}
         <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-yellow-500/10 border border-yellow-500/50 rounded-3xl p-6 flex items-center gap-6 h-fit w-full">
               <div className="bg-yellow-500 text-black p-3 md:p-4 rounded-xl animate-pulse shrink-0"><AlertTriangle size={24} /></div>
               <div>
                  <h3 className="text-yellow-500 font-black uppercase tracking-tighter text-xl">Bottleneck</h3>
                  <p className="text-yellow-200/70 text-[10px] md:text-xs mt-1 uppercase font-mono tracking-widest truncate">{bottleneck.count > 0 ? `${bottleneck.count} PENDING: ${bottleneck.label}` : "ALL CLEAR"}</p>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-6 w-full">
               <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                  <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest flex items-center gap-2"><DollarSign size={14}/> Funds Deployed</h3>
                  <p className="font-mono text-lg font-bold"><span className="text-green-500">${totalSpent}</span> / ${TOTAL_BUDGET}</p>
               </div>
               <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-6">
                  <div className={`h-full transition-all duration-500 ${totalSpent > TOTAL_BUDGET * 0.9 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min((totalSpent/TOTAL_BUDGET)*100, 100)}%` }} />
               </div>
               <form onSubmit={handleAddExpense} className="flex gap-2">
                  <select value={expenseCategory} onChange={(e)=>setExpenseCategory(e.target.value)} className="bg-black border border-gray-700 text-white p-2 rounded text-[10px] font-bold tracking-widest flex-1">
                     {Object.keys(BUDGET_CAPS).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input type="number" value={expenseAmount} onChange={(e)=>setExpenseAmount(e.target.value)} placeholder="AMT" className="w-16 md:w-24 bg-black border border-gray-700 text-white p-2 rounded font-mono text-xs" />
                  <button type="submit" className="bg-gray-800 hover:bg-green-500 hover:text-black transition-colors px-4 py-2 rounded text-[10px] font-bold uppercase">Log</button>
               </form>
            </motion.div>
         </div>

         {/* TIMELINE & LOGS */}
         <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-6 overflow-hidden">
               <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest flex items-center gap-2 mb-8"><Calendar size={14}/> Release Roadmap</h3>
               <div className="overflow-x-auto pb-4">
                  <div className="relative flex justify-between items-center px-4 min-w-[500px]">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 z-0"></div>
                    {['May 21', 'Jun 04', 'Jun 18', 'Jul 02', 'Jul 16', 'Jul 30'].map((date, i) => (
                       <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                          <div className="w-4 h-4 bg-black border-2 border-green-500 rounded-full"></div>
                          <span className="text-[10px] font-mono font-bold text-gray-400 absolute top-6">{date}</span>
                       </div>
                    ))}
                  </div>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col">
               <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest flex items-center gap-2 mb-4"><Terminal size={14}/> Audit Log</h3>
               <div className="bg-black border border-gray-800 p-4 rounded-xl h-[90px] overflow-y-auto font-mono text-[9px] md:text-[10px] text-green-500 flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-green-900">
                  {trackerData.logs?.map((log, i) => (
                    <div key={i} className="opacity-80 hover:opacity-100 whitespace-nowrap overflow-hidden text-ellipsis border-l border-green-900/50 pl-2">{typeof log === 'string' ? log : JSON.stringify(log)}</div>
                  ))}
               </div>
            </motion.div>
         </div>

         {/* TRACKLIST */}
         <div className="space-y-6 relative z-10">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-6 border-b border-gray-800 pb-4">The Tracks</h3>
            {trackerData.songs.map((song, index) => {
               const percentage = calculatePercentage(song);
               return (
                 <motion.div key={song} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="p-4 md:p-6 bg-black/40 border-b border-gray-800 flex flex-col md:flex-row justify-between md:items-center gap-4">
                       <div className="flex items-center gap-4"><span className="text-gray-600 font-mono font-bold text-sm">{String(index + 1).padStart(2, '0')}</span><h4 className="text-lg md:text-xl font-bold uppercase tracking-tight">{song}</h4></div>
                       <div className="flex items-center gap-4 w-full md:w-1/3">
                          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden"><motion.div className="bg-green-500 h-full" animate={{ width: `${percentage}%` }} /></div>
                          <span className="font-mono text-green-500 font-bold w-10 text-right text-xs">{percentage}%</span>
                       </div>
                    </div>
                    <div className="p-4 md:p-6">
                       <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-6 gap-x-4">
                          {TRACKER_TASKS.map(task => {
                            const isChecked = trackerData.progress?.[song]?.[task.id];
                            return (
                              <button key={task.id} onClick={() => toggleTask(song, task.id, task.label)} className={`flex items-start gap-2 md:gap-3 text-left group transition-opacity ${isChecked ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                                <div className={`mt-0.5 transition-colors shrink-0 ${isChecked ? 'text-green-500' : 'text-gray-500'}`}>{isChecked ? <CheckSquare size={16} /> : <Square size={16} />}</div>
                                <span className={`text-[10px] md:text-xs uppercase tracking-wide font-bold transition-colors leading-tight ${isChecked ? 'text-white' : 'text-gray-400'}`}>{task.label}</span>
                              </button>
                            );
                          })}
                       </div>
                    </div>
                 </motion.div>
               );
            })}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 border border-dashed border-gray-700 bg-gray-900/50 rounded-xl p-6 flex flex-col items-center gap-4">
               <form onSubmit={handleAddSong} className="flex flex-col md:flex-row gap-3 w-full">
                  <input type="text" value={newSongName} onChange={(e)=>setNewSongName(e.target.value)} placeholder="SONG TITLE..." className="flex-1 bg-black border border-gray-700 text-white p-3 rounded text-xs uppercase font-mono" />
                  <button type="submit" className="bg-green-500 text-black px-6 py-3 rounded font-bold uppercase text-xs flex items-center justify-center gap-2"><Plus size={16} /> Add Song</button>
               </form>
            </motion.div>
         </div>
      </div>
    </div>
  );
};

// --- ROUTER CONFIGURATION ---
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
