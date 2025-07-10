import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

function Produk({ theme, toggleTheme, cartItems, addToCart }) {
  const [activeSection, setActiveSection] = useState('produk');

  const jakoraProducts = [
    { name: 'Jakora Original', image: '/assets/images/jakora-original.jpg', description: 'Rendang jamur rasa original, siap saji.', stock: 65, variants: ['350gr'] },
    { name: 'Jakora Spicy', image: '/assets/images/jakora-spicy.jpg', description: 'Rendang jamur pedas dengan cita rasa khas.', stock: 68, variants: ['350gr'] },
    { name: 'Jakora Blackpaper', image: '/assets/images/jakora-blackpaper.jpg', description: 'Rendang jamur rasa lada hitam.', stock: 62, variants: ['350gr'] }
  ];

  const jatastikProducts = [
    { name: 'Jatastik Original', image: '/assets/images/original.jpg', description: 'Snack jamur sawit rasa original.', stock: 69, variants: ['50gr', '100gr'] },
    { name: 'Jatastik Spicy', image: '/assets/images/spicy.jpg', description: 'Snack jamur pedas gurih.', stock: 66, variants: ['50gr', '100gr'] },
    { name: 'Jatastik Cheese', image: '/assets/images/cheese.jpg', description: 'Jatastik rasa keju yang creamy.', stock: 63, variants: ['50gr', '100gr'] }
  ];

  const addToCartHandler = (product) => {
    addToCart(product);
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <div className={`min-h-screen font-poppins text-[var(--text-color)] ${theme === 'dark' ? 'bg-[#1a1f2b]' : 'bg-white'} overflow-hidden relative`}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-[#4a704a] dark:text-[#a3e4b7] mb-8">Produk Jakora</h2>
        <p className="text-center text-gray-600 dark:text-white mb-6">Rendang jamur vegan dengan cita rasa autentik dan sehat.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jakoraProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onAddToCart={() => addToCartHandler(product)}
            />
          ))}
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-[#4a704a] dark:text-[#a3e4b7] mb-8">Varian Jatastik</h2>
        <p className="text-center text-gray-600 dark:text-white mb-6">Snack jamur renyah dengan varian rasa kekinian.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jatastikProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onAddToCart={() => addToCartHandler(product)}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Produk;