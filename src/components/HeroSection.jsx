import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function HeroSection() {
  const [typingText, setTypingText] = useState('DAPATKAN');
  const texts = ['DAPATKAN', 'EKSPERIENSI', 'NIKMATI'];
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/assets/images/jakora-premium1.png',
    '/assets/images/jakora-premium2.png',
    '/assets/images/jakora-premium3.png',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      let i = 0;
      const timer = setInterval(() => {
        setTypingText(texts[index].slice(0, i + 1));
        i++;
        if (i > texts[index].length) clearInterval(timer);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(imageInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-[80vh] flex items-start justify-center pt-32 bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/50 dark:bg-black/60" />
        <motion.div
            className="container mx-auto max-w-screen-xl px-6 z-10 flex flex-col md:flex-row items-center justify-center md:justify-between"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
      >
      {/* Kiri */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 flex flex-col justify-center">
        <motion.h2
          className="text-lg font-semibold text-[#4a704a] uppercase typing-effect"
          variants={itemVariants}
        >
          {typingText}
        </motion.h2>
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-[#4a704a] my-4 leading-tight"
          variants={itemVariants}
        >
          Produk Inovatif dan Sehat
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-gray-600 dark:text-white mb-8"
          variants={itemVariants}
        >
          Kewirausahaan sosial berbasis jamur guna mewujudkan Green Economy dan Ecological Sustainability di Indonesia.
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.a
            href="/produk"
            className="inline-flex items-center gap-2 bg-[#4a704a] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#355e3b] transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Produknya <FaArrowRight />
          </motion.a>
        </motion.div>
      </div>

      {/* Kanan */}
      <motion.div
        className="md:w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
      >
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Produk Jakora"
          className="w-full max-w-md drop-shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>

    </section>
  );
}

export default HeroSection;