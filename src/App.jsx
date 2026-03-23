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
  const [cart, setCart] = useState([]);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <div className="bg-[#050505] text-[#d1d1d1] min-h-screen font-zine scanlines relative overflow-x-hidden">
      <InjectStyles />

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 border-b-2 border-lime-900/30 bg-black/95">
        <div className="text-3xl font-metal italic text-white">PA$TY</div>
        <div className="flex gap-8 items-center">
          <button onClick={() => document.getElementById('music').scrollIntoView()} className="hidden md:block font-metal text-lg uppercase hover:text-lime-400">Music</button>
          <button onClick={() => document.getElementById('merch').scrollIntoView()} className="hidden md:block font-metal text-lg uppercase hover:text-lime-400">Merch</button>
          <button onClick={() => setIsCartOpen(true)} className="relative border border-lime-400/30 p-1 hover:bg-lime-400 hover:text-black">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -top-3 -right-3 bg-lime-400 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center border border-black">{cart.length}</span>}
          </button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <img src={ARTIST_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
        </motion.div>
        <div className="relative z-20 flex flex-col items-center">
           <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={LOGO_URL} className="w-full max-w-[500px] h-auto px-6 drop-shadow-[0_0_20px_rgba(190,242,100,0.1)]" alt="PA$TY" />
        </div>
      </section>

      <section id="music" className="py-24 px-6 max-w-7xl mx-auto border-t-2 border-lime-900/30">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-7xl font-metal uppercase text-white mb-8">Music</h2>
            {TRACKS.map((track, i) => (
              <a key={i} href={track.url} target="_blank" rel="noreferrer" className="flex justify-between items-center p-6 bg-zinc-900/50 border-l-4 border-lime-600 hover:bg-lime-400 hover:text-black group">
                <div className="flex gap-6 items-center">
                  <span className="text-2xl font-metal text-lime-900 group-hover:text-black">0{i+1}</span>
                  <h4 className="text-xl font-metal uppercase">{track.title}</h4>
                </div>
                <ExternalLink size={20}/>
              </a>
            ))}
          </div>
          <div className="border border-zinc-800 p-1 bg-black grayscale">
             <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <section id="merch" className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-8xl font-metal uppercase mb-12 tracking-tighter text-center">Merch</h2>
          <div className="grid md:grid-cols-3 border-2 border-black">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="border border-black p-8 group hover:bg-black hover:text-white">
                <img src={p.image} className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 mb-6 border border-black" />
                <h3 className="text-4xl font-metal uppercase leading-none">{p.name}</h3>
                <p className="text-sm font-zine my-4">{p.desc}</p>
                <div className="flex justify-between items-end border-t border-black pt-4 group-hover:border-white">
                  <span className="text-4xl font-metal">${p.price}</span>
                  <button onClick={() => setCart([...cart, p])} className="bg-black text-white px-6 py-2 font-metal text-lg uppercase hover:bg-lime-400 hover:text-black">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t-2 border-lime-900/30 text-center bg-black">
        <h2 className="text-5xl font-metal text-lime-900 italic">PA$TY</h2>
        <p className="mt-8 text-zinc-800 font-zine text-[10px] uppercase tracking-widest">© 2026 DECAY SYSTEM INC</p>
      </footer>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-lime-900/20 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-black border-l-2 border-lime-600 z-[70] p-8 flex flex-col">
               <div className="flex justify-between items-center mb-12 border-b border-lime-900 pb-4">
                  <h2 className="text-4xl font-metal uppercase text-white">Cart</h2>
                  <button onClick={() => setIsCartOpen(false)}><X size={32} className="text-lime-400" /></button>
               </div>
               <div className="flex-1 space-y-4 overflow-y-auto">
                  {cart.length === 0 ? <p className="text-lime-900 font-metal uppercase">Zero Items</p> : cart.map((item, i) => (
                    <div key={i} className="bg-zinc-900/50 p-4 border border-zinc-800 flex justify-between items-center">
                      <h4 className="font-metal text-lg uppercase">{item.name}</h4>
                      <button onClick={() => {const nc = [...cart]; nc.splice(i,1); setCart(nc);}}><X size={16}/></button>
                    </div>
                  ))}
               </div>
               <button className="w-full bg-lime-400 text-black font-metal text-2xl py-5 mt-8 hover:bg-white transition-colors">Checkout</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- EPK PAGE ---
const EPKPage = () => (
  <div className="bg-[#f0f0f0] text-black min-h-screen p-6 md:p-16 font-zine selection:bg-black selection:text-white">
    <InjectStyles />
    <div className="max-w-5xl mx-auto border-[10px] border-black p-8 bg-white shadow-[20px_20px_0px_#bef264]">
      <header className="border-b-8 border-black pb-8 mb-12 flex justify-between items-end">
        <h1 className="text-[10rem] font-metal leading-[0.7] uppercase">PA$TY</h1>
        <div className="text-right uppercase font-bold text-xs"><p>EPK // 2026</p><p>jonathangleasonmgmt@gmail.com</p></div>
      </header>
      <div className="grid md:grid-cols-2 gap-12">
        <img src={ARTIST_IMAGE_URL} className="border-4 border-black grayscale contrast-150 p-1" />
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-6xl font-metal uppercase underline decoration-black decoration-4 underline-offset-4">Subject</h2>
          <p className="text-lg">Alternative rap artist blending rock, hip-hop, and noise influences into a visceral emotional system.</p>
          <div className="bg-black text-lime-400 p-6 font-bold rotate-[1deg]">"Sonic evolution that redefines the genre."</div>
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
      logs: [`> ${auth} toggled ${song}/${taskId}`, ...(data.logs || [])].slice(0, 20)
    };
    await setDoc(doc(db, "admin_data", "project_tracker"), newData, { merge: true });
  };

  if (!auth) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6 scanlines">
        <InjectStyles />
        <form onSubmit={(e) => { e.preventDefault(); if(ADMIN_PASSCODES[pass]) { sessionStorage.setItem('pasty_admin_user', ADMIN_PASSCODES[pass]); setAuth(ADMIN_PASSCODES[pass]); } }} className="border-4 border-lime-900 p-12 bg-zinc-900/20 w-full max-w-md text-center">
          <h1 className="text-4xl font-metal text-white mb-8 uppercase">Authorization</h1>
          <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="CLEARANCE CODE" className="w-full bg-black border-2 border-lime-900 p-4 text-white font-metal text-2xl mb-6 outline-none focus:border-lime-400" />
          <button className="w-full bg-lime-400 text-black py-4 font-metal text-2xl uppercase">Initialize</button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-8 font-zine text-lime-600 scanlines">
      <InjectStyles />
      <header className="border-2 border-lime-900/50 p-8 flex justify-between items-center mb-12 bg-zinc-900/20">
        <h1 className="text-5xl font-metal text-white italic">ADMIN_PORTAL</h1>
        <button onClick={() => {sessionStorage.removeItem('pasty_admin_user'); setAuth(null);}} className="text-xs uppercase hover:text-white transition-colors">Logout</button>
      </header>
      <div className="space-y-4">
        {data.songs?.map((s, i) => (
          <div key={i} className="bg-zinc-900/50 p-6 border-l-8 border-lime-600 flex flex-col md:flex-row justify-between items-center gap-6">
             <h4 className="text-2xl font-metal text-white uppercase">{s}</h4>
             <div className="grid grid-cols-5 md:grid-cols-10 gap-1">
                {TRACKER_TASKS.map(t => (
                  <button key={t.id} onClick={() => toggleTask(s, t.id)} className={`w-8 h-8 border border-lime-900/30 flex items-center justify-center ${data.progress?.[s]?.[t.id] ? 'bg-lime-400 text-black' : 'text-lime-900 hover:text-white'}`}>
                    {data.progress?.[s]?.[t.id] ? <CheckSquare size={14} /> : <Square size={14} />}
                  </button>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN ROUTER ---
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
