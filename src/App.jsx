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

// --- ASSETS & DATA ---
const ARTIST_IMAGE_URL = "/background.jpg";
const LOGO_URL = "/logo.png";
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
  { id: 'visPlan', label: 'Visuals' }, { id: 'visFilm', label: 'Filmed' },
  { id: 'visComp', label: 'Edited' }, { id: 'promo', label: 'Promo' },
  { id: 'sched', label: 'Sched' }, { id: 'ads', label: 'Ads' }
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
  `}</style>
);

// --- LANDING PAGE ---
const LandingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <div className="bg-[#050505] text-[#d1d1d1] min-h-screen font-zine scanlines relative overflow-x-hidden">
      <InjectStyles />

      {/* RE-ESTABLISHED NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 border-b-2 border-lime-900/30 bg-black/95">
        <div className="text-3xl font-metal italic text-white tracking-tighter">PA$TY</div>
        
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 items-center">
          <button onClick={() => document.getElementById('music').scrollIntoView({ behavior: 'smooth' })} className="font-metal text-lg uppercase hover:text-lime-400 transition-colors">Music</button>
          <button onClick={() => document.getElementById('merch').scrollIntoView({ behavior: 'smooth' })} className="font-metal text-lg uppercase hover:text-lime-400 transition-colors">Merch</button>
          <Link to="/epk" className="font-metal text-lg uppercase hover:text-lime-400 transition-colors">EPK</Link>
          <Link to="/admin" className="font-metal text-lg uppercase hover:text-lime-400 transition-colors">Admin</Link>
          
          <button onClick={() => setIsCartOpen(true)} className="relative border border-lime-400/30 p-1 hover:bg-lime-400 hover:text-black transition-all">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -top-3 -right-3 bg-lime-400 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center border border-black">{cart.length}</span>}
          </button>
        </div>

        {/* MOBILE TRIGGER */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative p-1"><ShoppingBag size={24} /></button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-1"><Menu size={24} /></button>
        </div>
      </nav>

      {/* HERO: LOGO ONLY */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <img src={ARTIST_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-50" alt="background" />
        </motion.div>
        <div className="relative z-20 flex flex-col items-center">
           <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={LOGO_URL} className="w-full max-w-[500px] h-auto px-6 drop-shadow-[0_0_30px_rgba(190,242,100,0.15)]" alt="PA$TY LOGO" />
        </div>
      </section>

      {/* MUSIC SECTION */}
      <section id="music" className="py-32 px-6 max-w-7xl mx-auto bg-[#050505] border-t-2 border-lime-900/20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-7xl font-metal uppercase text-white">Music</h2>
            <div className="space-y-4">
              {TRACKS.map((track, i) => (
                <a key={i} href={track.url} target="_blank" rel="noreferrer" className="flex justify-between items-center p-6 bg-zinc-900/40 border-l-4 border-lime-500 hover:bg-lime-400 hover:text-black group transition-all">
                  <div className="flex gap-6 items-center">
                    <span className="text-2xl font-metal text-lime-800 group-hover:text-black">0{i+1}</span>
                    <h4 className="text-xl font-metal uppercase">{track.title}</h4>
                  </div>
                  <ExternalLink size={20}/>
                </a>
              ))}
            </div>
          </div>
          <div className="border border-zinc-800 p-1 bg-black grayscale hover:grayscale-0 transition-all duration-700">
             <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* MERCH SECTION */}
      <section id="merch" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-8xl font-metal uppercase mb-16 tracking-tighter text-center">Merch</h2>
          <div className="grid md:grid-cols-3 border-2 border-black">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="border border-black p-8 group hover:bg-black hover:text-white transition-all">
                <div className="overflow-hidden border border-black mb-6">
                  <img src={p.image} className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all group-hover:scale-105" alt={p.name} />
                </div>
                <h3 className="text-4xl font-metal uppercase leading-none">{p.name}</h3>
                <p className="text-sm font-zine my-4 h-12 overflow-hidden">{p.desc}</p>
                <div className="flex justify-between items-end border-t border-black pt-4 group-hover:border-white">
                  <span className="text-5xl font-metal">${p.price}</span>
                  <button onClick={() => setCart([...cart, p])} className="bg-black text-white px-8 py-3 font-metal text-xl uppercase hover:bg-lime-400 hover:text-black transition-colors">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-24 border-t-2 border-lime-900/20 text-center bg-black">
        <h2 className="text-6xl font-metal text-lime-900 italic tracking-tighter">PA$TY</h2>
        <div className="mt-12 flex justify-center gap-12 font-metal text-xl uppercase opacity-40">
          <a href="#" className="hover:text-lime-400 transition-colors">Instagram</a>
          <a href="#" className="hover:text-lime-400 transition-colors">YouTube</a>
          <a href="#" className="hover:text-lime-400 transition-colors">Soundcloud</a>
        </div>
      </footer>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-black z-[100] flex flex-col p-8">
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end mb-16"><X size={48} className="text-lime-400" /></button>
            <div className="flex flex-col gap-12 text-6xl font-metal uppercase">
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('music').scrollIntoView(); }}>Music</button>
              <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('merch').scrollIntoView(); }}>Merch</button>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-lime-900/10 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-black border-l-2 border-lime-500 z-[70] p-8 flex flex-col">
               <div className="flex justify-between items-center mb-12 border-b border-lime-900/50 pb-6">
                  <h2 className="text-5xl font-metal uppercase text-white">Cart</h2>
                  <button onClick={() => setIsCartOpen(false)}><X size={40} className="text-lime-400" /></button>
               </div>
               <div className="flex-1 space-y-6 overflow-y-auto">
                  {cart.length === 0 ? <p className="text-lime-900 font-metal text-2xl uppercase">Payload Empty</p> : cart.map((item, i) => (
                    <div key={i} className="bg-zinc-900/30 p-6 border border-zinc-800 flex justify-between items-center group">
                      <div>
                        <h4 className="font-metal text-2xl uppercase text-white">{item.name}</h4>
                        <p className="text-lime-400 font-metal">${item.price}</p>
                      </div>
                      <button onClick={() => {const nc = [...cart]; nc.splice(i,1); setCart(nc);}} className="text-zinc-600 hover:text-red-500"><X size={20}/></button>
                    </div>
                  ))}
               </div>
               <button className="w-full bg-lime-400 text-black font-metal text-3xl py-6 mt-12 hover:bg-white transition-all uppercase">Checkout</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- EPK PAGE: LIME ACCENTED ---
const EPKPage = () => (
  <div className="bg-[#f2f2f2] text-black min-h-screen p-6 md:p-16 font-zine selection:bg-black selection:text-white">
    <InjectStyles />
    <Link to="/" className="fixed top-8 left-8 bg-black text-white p-2 font-metal uppercase text-sm hover:bg-lime-400 hover:text-black z-50">Back</Link>
    <div className="max-w-5xl mx-auto border-[10px] border-black p-12 bg-white shadow-[25px_25px_0px_#bef264] relative">
      <header className="border-b-8 border-black pb-10 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h1 className="text-[12rem] font-metal leading-[0.7] uppercase -ml-4">PA$TY</h1>
          <p className="bg-black text-lime-400 px-4 py-1 text-2xl font-metal uppercase mt-6 inline-block">EPK // 2026 CYCLE</p>
        </div>
        <div className="text-right uppercase font-bold text-xs tracking-widest"><p>Management</p><p>jonathangleasonmgmt@gmail.com</p></div>
      </header>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="border-4 border-black p-2 grayscale contrast-125 rotate-[-1deg]">
          <img src={ARTIST_IMAGE_URL} alt="Artist" className="w-full h-auto" />
        </div>
        <div className="flex flex-col justify-center gap-10">
          <h2 className="text-7xl font-metal uppercase underline decoration-black decoration-8 underline-offset-8">Subject</h2>
          <p className="text-xl leading-relaxed">Alternative rap artist blending noise, hip-hop, and industrial textures into a visceral sonic system.</p>
          <div className="bg-black text-white p-8 font-bold rotate-[1deg] border-l-[12px] border-lime-400">
            "A technical evolution that pushes the boundaries of independent production."
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- ADMIN DASHBOARD ---
const AdminDashboard = () => {
  const [auth, setAuth] = useState(sessionStorage.getItem('pasty_admin_user'));
  const [pass, setPass] = useState("");
  const [data, setData] = useState({ songs: [], progress: {}, logs: [] });

  useEffect(() => {
    if (!auth) return;
    return onSnapshot(doc(db, "admin_data", "project_tracker"), (s) => {
      if (s.exists()) setData(s.data());
    });
  }, [auth]);

  const toggleTask = async (song, taskId) => {
    const currentState = data.progress?.[song]?.[taskId] || false;
    const newData = {
      ...data,
      progress: {
        ...data.progress,
        [song]: { ...data.progress[song], [taskId]: !currentState }
      },
      logs: [`> ${auth} updated ${song}/${taskId}`, ...(data.logs || [])].slice(0, 20)
    };
    await setDoc(doc(db, "admin_data", "project_tracker"), newData, { merge: true });
  };

  if (!auth) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6 scanlines">
        <InjectStyles />
        <div className="border-4 border-lime-900/50 p-12 bg-zinc-900/10 w-full max-w-md text-center">
          <h1 className="text-5xl font-metal text-white mb-10 uppercase tracking-tighter">Mission Control</h1>
          <form onSubmit={(e) => { e.preventDefault(); if(ADMIN_PASSCODES[pass]) { sessionStorage.setItem('pasty_admin_user', ADMIN_PASSCODES[pass]); setAuth(ADMIN_PASSCODES[pass]); } }} className="space-y-6">
            <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="CLEARANCE CODE" className="w-full bg-black border-2 border-lime-900 p-5 text-white font-metal text-3xl text-center outline-none focus:border-lime-400" />
            <button className="w-full bg-lime-400 text-black py-5 font-metal text-2xl uppercase hover:bg-white transition-colors">Authorize</button>
          </form>
          <Link to="/" className="block mt-10 text-xs uppercase text-zinc-600 hover:text-white">Abort</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-4 md:p-12 font-zine text-lime-600 scanlines relative">
      <InjectStyles />
      <header className="border-2 border-lime-900/30 p-10 flex flex-col md:flex-row justify-between items-center mb-16 bg-zinc-900/10">
        <div>
          <h1 className="text-6xl font-metal text-white italic tracking-tighter uppercase">Admin Portal</h1>
          <p className="font-metal text-lime-900 uppercase">Operator: {auth} // System 4.2</p>
        </div>
        <div className="flex gap-6 mt-6 md:mt-0">
          <Link to="/" className="border border-lime-900 px-6 py-2 hover:bg-lime-400 hover:text-black transition-all font-metal uppercase">Site</Link>
          <button onClick={() => {sessionStorage.removeItem('pasty_admin_user'); setAuth(null);}} className="bg-red-900/20 text-red-500 border border-red-900 px-6 py-2 hover:bg-red-500 hover:text-white transition-all font-metal uppercase">Exit</button>
        </div>
      </header>
      
      <div className="space-y-6">
        {data.songs?.map((s, i) => (
          <div key={i} className="bg-zinc-900/20 p-8 border-l-[12px] border-lime-600 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
             <div>
                <span className="text-xs text-lime-900 font-bold uppercase">Asset 0{i+1}</span>
                <h4 className="text-4xl font-metal text-white uppercase leading-none mt-1">{s}</h4>
             </div>
             <div className="grid grid-cols-5 md:grid-cols-10 gap-2 w-full lg:w-auto">
                {TRACKER_TASKS.map(t => {
                  const done = data.progress?.[s]?.[t.id];
                  return (
                    <button key={t.id} onClick={() => toggleTask(s, t.id)} className={`p-3 border border-lime-900/20 flex flex-col items-center gap-2 group ${done ? 'bg-lime-400 text-black border-lime-400' : 'hover:border-lime-400'}`}>
                      {done ? <CheckSquare size={16} /> : <Square size={16} className="text-lime-900" />}
                      <span className={`text-[8px] uppercase font-bold text-center leading-none ${done ? 'text-black' : 'text-zinc-600'}`}>{t.label}</span>
                    </button>
                  )
                })}
             </div>
          </div>
        ))}
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
