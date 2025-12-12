import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Music, ExternalLink, ChevronRight, Check, ArrowRight, Download, Mail, Globe, Instagram, Youtube, Menu } from 'lucide-react';

/**
 * PA$TY OFFICIAL WEBSITE & STORE
 * Instructions:
 * 1. Run "npm install react-router-dom" in terminal.
 * 2. Ensure images are in public folder.
 */

// --- DATA & ASSETS ---
const ARTIST_IMAGE_URL = "/background.jpg";
const LOGO_URL = "/logo.png";
const LINKTREE_URL = "https://linktr.ee/pastymusic";
const GOOGLE_DRIVE_PHOTOS_URL = "https://drive.google.com/drive/folders/1jcZVxoElLlwNotT__L13CGLOG3RqAWaR?usp=drive_link"; // <--- REPLACE THIS
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

// --- SHARED COMPONENTS ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-normal hidden md:block print:hidden" // Added print:hidden
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 20 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    >
      <div className={`relative flex items-center justify-center transition-all duration-300 ${isHovering ? 'scale-150 -rotate-12' : 'scale-100'}`}>
         <span className="text-green-500 text-5xl font-sans italic font-black tracking-tighter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">$</span>
      </div>
    </motion.div>
  );
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
    <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500 selection:text-black overflow-x-hidden md:cursor-none">
      <CustomCursor />

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference text-white">
        <div className="text-xl font-bold tracking-tighter uppercase">PA$TY</div>
        <div className="flex items-center gap-6">
          <GlitchLink text="Music" onClick={() => document.getElementById('music').scrollIntoView({ behavior: 'smooth' })} />
          <GlitchLink text="Shop" onClick={() => document.getElementById('store').scrollIntoView({ behavior: 'smooth' })} />
          <GlitchLink text="EPK" to="/epk" newTab={true} />
          
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
               <a href="https://www.instagram.com/pastymusic_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
               <a href="https://www.youtube.com/@pastymusic_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
               <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SoundCloud</a>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-crosshair" />
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

// 2. EPK PAGE COMPONENT (New Separate Page)
const EPKPage = () => {
  // Function to handle printing/downloading PDF
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    // 'md:cursor-none' ensures cursor is hidden on desktop but normal on mobile
    <div className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white md:cursor-none">
      <CustomCursor />
      
      {/* Styles to make the print version look clean (hides buttons, fixes colors) */}
      <style>{`
        @media print {
          @page { margin: 0.5cm; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; background-color: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:text-black { color: black !important; }
          button { display: none !important; }
        }
      `}</style>
      
      {/* Header */}
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
         {/* Bio Section */}
         <div className="grid md:grid-cols-2 gap-12 mb-24 print:gap-6 print:mb-12">
            <div className="aspect-[3/4] bg-gray-200">
               <img src={ARTIST_IMAGE_URL} alt="Press Shot" className="w-full h-full object-cover grayscale contrast-125" />
            </div>
            <div className="flex flex-col justify-center">
               <h2 className="text-4xl font-bold uppercase mb-6">The Artist</h2>
               <p className="text-lg leading-relaxed mb-6">
                 Pa$ty is an alternative rap artist who seamlessly blends rock, hip-hop, and emo influences into a unique sound that reflects his raw, emotional journey. Growing up surrounded by a wide range of music—from his mom's pop to his dad’s classic rock and his brother’s punk—Pa$ty developed a versatile style that mixes introspective lyrics with powerful instrumentals.
               </p>
               <p className="text-lg leading-relaxed mb-6">
                 Inspired by icons like 3 Doors Down, LUCKI, Billy Idol, and Juice WRLD, Pa$ty’s music explores themes of mental health, addiction, and self-discovery. He combines the emotional depth of rock with the lyrical flow of hip-hop, creating a sound that’s both edgy and deeply relatable.
               </p>
               <p className="text-lg leading-relaxed mb-6">
                 The sudden passing of his father had a profound impact on him, reshaping his perspective on life and music. Now dropping the "Yung" from his name and rebranding simply as “Pa$ty,” he’s focused on creating music that reflects his growth, resilience, and renewed sense of purpose.
               </p>
               <p className="text-lg leading-relaxed text-gray-600 mb-8 print:text-black font-bold">
                 "His 2026 release plan exceeds expectations with unparalleled depth, striking visuals, and a sonic evolution that redefines the genre."
               </p>
               <div className="flex gap-4 print:hidden">
                  <button 
                    onClick={handleDownloadPDF}
                    className="border-2 border-black px-6 py-3 font-bold uppercase flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
                  >
                     Download Bio <Download size={18} />
                  </button>
                  <a 
                    href={GOOGLE_DRIVE_PHOTOS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-white px-6 py-3 font-bold uppercase flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                     Download Photos <Download size={18} />
                  </a>
               </div>
            </div>
         </div>

         {/* Statistics */}
         <div className="border-y-2 border-black py-12 mb-24 print:py-6 print:mb-12">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                   <h3 className="text-5xl font-black mb-2">80k+</h3>
                   <p className="uppercase font-mono text-sm">Total Streams</p>
                </div>
                <div>
                   <h3 className="text-5xl font-black mb-2">5k+</h3>
                   <p className="uppercase font-mono text-sm">Followers</p>
                </div>
                <div>
                   <h3 className="text-5xl font-black mb-2">10+</h3>
                   <p className="uppercase font-mono text-sm">Shows</p>
                </div>
                <div>
                   <h3 className="text-5xl font-black mb-2">2026</h3>
                   <p className="uppercase font-mono text-sm">Next Drop</p>
                </div>
             </div>
         </div>

         {/* Music / Video Section (Hidden in print to save ink/space) */}
         <div className="grid md:grid-cols-2 gap-12 mb-24 print:hidden">
             <div>
                <h3 className="text-2xl font-bold uppercase mb-6 border-b border-black pb-2">Latest Release</h3>
                <div className="space-y-4">
                   {TRACKS.map((track, i) => (
                      <div key={i} className="flex justify-between items-center p-4 border border-gray-200 hover:border-black transition-colors cursor-pointer">
                         <span className="font-bold">{track.title}</span>
                         <Music size={18} />
                      </div>
                   ))}
                </div>
             </div>
             <div>
                <h3 className="text-2xl font-bold uppercase mb-6 border-b border-black pb-2">Visuals</h3>
                <div className="aspect-video bg-black">
                   <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} title="YouTube video" frameBorder="0" allowFullScreen></iframe>
                </div>
             </div>
         </div>

         {/* Footer Links */}
         <div className="flex justify-center gap-8 text-2xl print:hidden">
             <a href="#" className="hover:text-green-600"><Instagram /></a>
             <a href="#" className="hover:text-red-600"><Youtube /></a>
             <a href="#" className="hover:text-blue-600"><Globe /></a>
             <a href="#" className="hover:text-gray-600"><Mail /></a>
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
      </Routes>
    </HashRouter>
  );
}
