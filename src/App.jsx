import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Pages
import Home from './pages/Beranda';
import Produk from './pages/Produk';
import Testimoni from './pages/Testimoni';
import Kontak from './pages/Kontak';
import Donasi from './pages/Donasi';

// Components
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

// 🔹 Scroll otomatis + trigger progress bar
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    NProgress.start();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // loading simulasi singkat

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

// 🔹 Animasi transisi page
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// 🔹 Routing dengan animasi
function AnimatedRoutes({ theme, toggleTheme }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home theme={theme} /></PageTransition>} />
        <Route path="/produk" element={<PageTransition><Produk theme={theme} toggleTheme={toggleTheme} /></PageTransition>} />
        <Route path="/testimoni" element={<PageTransition><Testimoni theme={theme} toggleTheme={toggleTheme} /></PageTransition>} />
        <Route path="/kontak" element={<PageTransition><Kontak theme={theme} /></PageTransition>} />
        <Route path="/donasi" element={<PageTransition><Donasi theme={theme} /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Sinkronkan tema dengan html root
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Custom style untuk progress bar
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #nprogress .bar {
        background: #4a704a !important; /* hijau daun */
        height: 3px;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #4a704a, 0 0 5px #4a704a;
      }
      #nprogress .spinner {
        display: none !important; /* biar ga ada spinner */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-poppins text-[var(--text-color)] bg-[var(--bg-color)] transition-colors duration-500">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <AnimatedRoutes theme={theme} toggleTheme={toggleTheme} />
        <Footer />
        <ChatBot theme={theme} />
      </div>
    </Router>
  );
}

export default App;
