import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, X, Music, ExternalLink, ChevronRight, Check, ArrowRight, 
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

// --- ASSETS ---
const ARTIST_IMAGE_URL = "/background.jpg";
const YOUTUBE_VIDEO_ID = "581MvmIE9to";

const PRODUCTS = [
  { id: 1, name: "PA$TY SYSTEM TEE", price: 35, image: "first.jpg", desc: "100% Cotton. Distressed Print." },
  { id: 2, name: "DECAY HOODIE", price: 65, image: "second.jpg", desc: "Box fit. Acid wash black." },
  { id: 3, name: "TRAP BOLT CAP", price: 25, image: "third.jpg", desc: "Embroidered Snapback." }
];

const TRACKS = [
  { title: "Runaway (feat. Pa$ty)", url: "https://music.apple.com/us/album/runaway-feat-pa%24ty-single/1844412963" },
  { title: "Yale", url: "https://music.apple.com/us/album/yale-single/1826390402" },
  { title: "Everyday", url: "https://music.apple.com/us/song/everyday/1813493592" },
];

const TRACKER_TASKS = [
  { id: 'recorded', label: 'Recorded' }, { id: 'mixed', label: 'Mixed' },
  { id: 'mastered', label: 'Mastered' }, { id: 'dsp', label: 'Uploaded' },
  { id: 'visPlan', label: 'Visuals' }, { id: 'visFilm', label: 'Filmed' },
  { id: 'visComp', label: 'Edited' }, { id: 'promo', label: 'Promo' },
  { id: 'sched', label: 'Sched' }, { id: 'ads', label: 'Ads' }
];

// --- GLOBAL STYLES (Injected for stability) ---
const InjectStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Special+Elite&display=swap');
    :root { --pasty-red: #991b1b; }
    body { background-color: #050505; margin: 0; padding: 0; }
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
  const [cart, setCart] = useState([]);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <div className="bg-[#050505] text-[#d1d1d1] min-h-screen font-zine scanlines relative overflow-x-hidden">
      <InjectStyles />
      <div className="noise-overlay" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 border-b-4 border-red-900 bg-black/90">
        <div className="text-4xl font-metal italic text-white">PA$TY</div>
        <div className="flex gap-6">
          <button onClick={() => document.getElementById('music').scrollIntoView()} className="hidden md:block font-metal text-xl uppercase hover:text-red-600">Sound</button>
          <button onClick={() => document.getElementById('store').scrollIntoView()} className="hidden md:block font-metal text-xl uppercase hover:text-red-600">Gear</button>
          <button onClick={() => setIsCartOpen(true)} className="border-2 border-white p-1 hover:bg-red-800">
            <ShoppingBag size={20} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <img src={ARTIST_IMAGE_URL} className="w-full h-full object-cover grayscale contrast-150 brightness-50" />
        </motion.div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-[14vw] font-metal uppercase leading-none text-white tracking-tighter">SYSTEM DECAY</h1>
          <p className="font-zine text-lg text-red-600 tracking-[0.4em] mt-4 uppercase animate-pulse">2026 ROADMAP INITIATED</p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-red-800 text-white overflow-hidden py-3 border-y-4 border-black relative z-40">
        <motion.div className="flex whitespace-nowrap text-2xl font-metal uppercase italic" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 12 }}>
          {[...Array(10)].map((_, i) => <span key={i} className="mx-8">System Error // NO CONTROL // Decay Initiated //</span>)}
        </motion.div>
      </div>

      {/* MUSIC */}
      <section id="music" className="py-24 px-6 max-w-7xl mx-auto border-t-8 border-red-900 bg-[#050505]">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-7xl font-metal uppercase text-white underline decoration-red-700 decoration-8 underline-offset-8 mb-12">The Noise</h2>
            {TRACKS.map((track, i) => (
              <a key={i} href={track.url} target="_blank" className="flex justify-between items-center p-6 bg-zinc-900 border-l-8 border-red-700 hover:bg-red-700 group transition-none">
                <div className="flex gap-6 items-center">
                  <span className="text-3xl font-metal text-red-900 group-hover:text-white">0{i+1}</span>
                  <h4 className="text-2xl font-metal uppercase text-white">{track.title}</h4>
                </div>
                <ExternalLink size={24} className="text-red-900 group-hover:text-white"/>
              </a>
            ))}
          </div>
          <div className="border-8 border-zinc-800 p-2 bg-black grayscale">
             <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* STORE */}
      <section id="store" className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-8xl font-metal uppercase mb-12 tracking-tighter text-center">Physical Goods</h2>
          <div className="grid md:grid-cols-3 border-4 border-black">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="border-4 border-black p-8 group hover:bg-black hover:text-white">
                <img src={p.image} className="w-full aspect-square object-cover grayscale mb-6 border-2 border-black" />
                <h3 className="text-4xl font-metal uppercase leading-none">{p.name}</h3>
                <p className="text-sm font-zine my-4">{p.desc}</p>
                <div className="flex justify-between items-end border-t-4 border-black pt-4 group-hover:border-white">
                  <span className="text-5xl font-metal">${p.price}</span>
                  <button onClick={() => setCart([...cart, p])} className="bg-black text-white px-6 py-2 font-metal text-xl uppercase hover:bg-red-700">Acquire</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t-8 border-red-900 text-center bg-black">
        <h2 className="text-6xl font-metal text-red-900 italic">PA$TY</h2>
        <p className="mt-8 text-zinc-700 font-zine text-xs uppercase tracking-widest">© 2026 DECAY SYSTEM INC</p>
      </footer>

      {/* CART */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-red-900/30 backdrop-blur-md z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-black border-l-8 border-red-700 z-[70] p-8 flex flex-col">
               <div className="flex justify-between items-center mb-12 border-b-4 border-red-900 pb-4">
                  <h2 className="text-5xl font-metal uppercase text-white">Payload</h2>
                  <button onClick={() => setIsCartOpen(false)}><X size={40} className="text-red-600" /></button>
               </div>
               <div className="flex-1 space-y-4 overflow-y-auto">
                  {cart.length === 0 ? <p className="text-red-900 text-xl font-metal">NO ASSETS DETECTED</p> : cart.map((item, i) => (
                    <div key={i} className="bg-zinc-900 p-4 border-2 border-white flex gap-4 items-center">
                      <div className="flex-1">
                        <h4 className="font-metal text-xl uppercase">{item.name}</h4>
                        <p className="text-red-600 font-metal">${item.price}</p>
                      </div>
                      <button onClick={() => {const nc = [...cart]; nc.splice(i,1); setCart(nc);}}><X size={16}/></button>
                    </div>
                  ))}
               </div>
               <button className="w-full bg-red-700 text-white font-metal text-3xl py-6 mt-8">Finalize Acquisition</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ADMIN ---
const AdminDashboard = () => {
  const [auth, setAuth] = useState(sessionStorage.getItem('pasty_admin_user'));
  const [pass, setPass] = useState("");
  const [data, setData] = useState({ songs: [], progress: {}, logs: [] });

  useEffect(() => {
    if (!auth) return;
    return onSnapshot(doc(db, "admin_data", "project_tracker"), (s) => s.exists() && setData(s.data()));
  }, [auth]);

  if (!auth) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6 scanlines">
        <InjectStyles />
        <form onSubmit={(e) => { e.preventDefault(); if(["JOEY2026","ZAK2026","JG2026"].includes(pass)) { sessionStorage.setItem('pasty_admin_user', pass); setAuth(pass); } }} className="border-8 border-red-700 p-12 bg-red-900/10 w-full max-w-md">
          <h1 className="text-5xl font-metal text-white mb-8 uppercase">Access Denied</h1>
          <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="PASSWORD" className="w-full bg-black border-4 border-red-900 p-4 text-white font-metal text-2xl mb-6 outline-none" />
          <button className="w-full bg-red-700 text-white py-4 font-metal text-2xl uppercase">Initialize</button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-8 font-zine text-red-600 scanlines">
      <InjectStyles />
      <header className="border-8 border-red-700 p-8 flex justify-between items-center mb-12">
        <h1 className="text-7xl font-metal text-white italic">SYSTEM: ONLINE</h1>
        <button onClick={() => {sessionStorage.removeItem('pasty_admin_user'); setAuth(null);}} className="border-2 border-red-700 px-4 py-1 text-white uppercase">Abort</button>
      </header>
      <div className="space-y-6">
        {data.songs.map((s, i) => (
          <div key={i} className="bg-zinc-900 p-8 border-l-[16px] border-red-700 flex justify-between items-center">
             <h4 className="text-4xl font-metal text-white uppercase">{s}</h4>
             <div className="flex gap-2">
                {TRACKER_TASKS.map(t => (
                  <div key={t.id} className={`w-6 h-6 border border-red-900 ${data.progress[s]?.[t.id] ? 'bg-red-600' : ''}`} title={t.label} />
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  );
}
