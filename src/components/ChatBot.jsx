import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('chatbotUsername') || '');
  const [showNameForm, setShowNameForm] = useState(!username);
  const chatContainerRef = useRef(null);
  const [quickOptions, setQuickOptions] = useState(['Apa itu Jakora?', 'Harga produk', 'Hubungi kami']);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (messages.length === 0 && !isOpen) {
      setMessages([{ text: showNameForm ? 'Halo! Silakan masukkan nama panggilanmu.' : `Halo ${username}! Selamat datang di Jakora Chat! Apa yang bisa aku bantu? 😊`, sender: 'bot' }]);
    }
    // Update quick options berdasarkan konteks terakhir
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1].text.toLowerCase();
      if (lastMessage.includes('produk')) {
        setQuickOptions(['Harga Jakora', 'Varian Jatastik', 'Cara pesan']);
      } else if (lastMessage.includes('kontak') || lastMessage.includes('hubungi')) {
        setQuickOptions(['WhatsApp', 'Email', 'Alamat']);
      } else {
        setQuickOptions(['Apa itu Jakora?', 'Harga produk', 'Hubungi kami']);
      }
    }
  }, [isOpen, messages.length, username, showNameForm]);

  const handleSetUsername = (e) => {
    e.preventDefault();
    const newUsername = e.target.elements.name.value.trim();
    if (newUsername) {
      setUsername(newUsername);
      localStorage.setItem('chatbotUsername', newUsername);
      setShowNameForm(false);
      setMessages((prev) => [...prev, { text: `${newUsername}! Terima kasih, sekarang apa yang bisa aku bantu tentang Jakora? 🌱`, sender: 'bot' }]);
    }
  };

  const handleQuickOption = (option) => {
    setInput(option);
    setTimeout(() => {
      sendMessage({ preventDefault: () => {} });
    }, 100);
  };

  const generateResponse = (inputText) => {
    const lowerInput = inputText.toLowerCase().trim();
    const userName = username || 'Teman Jakora';
    const isGenZ = lowerInput.includes('bro') || lowerInput.includes('sis') || lowerInput.includes('gaskeun') || lowerInput.includes('sip');
    const isNonBaku = lowerInput.includes('makasih') || lowerInput.includes('bgt') || lowerInput.includes('yaudah');

    // Konteks lebih dari 55
    if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hi')) {
      return isGenZ
        ? `${userName} bro/sis! Hai gaskeun, selamat datang di Jakora Chat! Mau info produk apa? 🔥`
        : isNonBaku
        ? `${userName}! Hai, makasih udah dateng! Apa yang bisa aku bantu? 😄`
        : `${userName}! Halo, selamat datang di Jakora Chat! Apa yang bisa aku bantu? 😊`;
    } else if (lowerInput.includes('terima kasih') || lowerInput.includes('makasih') || lowerInput.includes('thx')) {
      return isGenZ
        ? `${userName}! Sip bro, seneng bantu! Ada lagi? 🔥`
        : isNonBaku
        ? `${userName}! Sama-sama, makasih balik! Ada lagi? 😄`
        : `${userName}! Sama-sama! 😊 Ada lagi tentang Jakora?`;
    } else if (lowerInput.includes('produk') || lowerInput.includes('jakora') || lowerInput.includes('jatastik')) {
      if (lowerInput.includes('harga')) {
        return isGenZ
          ? `${userName} bro! Jakora Rp 38.000, Jatastik Rp 12.000. Murah gaskeun, cek di Produk ya! 🔥`
          : isNonBaku
          ? `${userName}! Jakora Rp 38.000, Jatastik Rp 12.000. Cek di halaman Produk bgt! 😄`
          : `${userName}! 😊 Jakora mulai dari Rp 38.000, Jatastik Rp 12.000. Cek detail di halaman Produk ya!`;
      } else if (lowerInput.includes('varian')) {
        return isGenZ
          ? `${userName} sis! Jakora: Original, Spicy, Blackpaper. Jatastik: Original, Spicy, Cheese. Keren kan? 🔥`
          : isNonBaku
          ? `${userName}! Jakora: Original, Spicy, Blackpaper. Jatastik: Original, Spicy, Cheese. Lengkap bgt! 😄`
          : `${userName}! 🌱 Jakora: Original, Spicy, Blackpaper. Jatastik: Original, Spicy, Cheese. Lihat di Produk!`;
      } else {
        return isGenZ
          ? `${userName} bro! Jakora rendang jamur, Jatastik snack jamur. Sehat gaskeun! 🔥`
          : isNonBaku
          ? `${userName}! Jakora rendang jamur, Jatastik snack jamur. Enak bgt! 😄`
          : `${userName}! 🌱 Kami punya Jakora (rendang jamur) dan Jatastik (snack jamur). Lihat variasinya di halaman Produk!`;
      }
    } else if (lowerInput.includes('kontak') || lowerInput.includes('hubungi') || lowerInput.includes('cara order')) {
      return isGenZ
        ? `${userName} sis! WA +62 813-9154-6240, email info@jakora.id. Pesan gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! WA +62 813-9154-6240, email info@jakora.id. Hubungi ya! 😄`
        : `${userName}! 📞 Hubungi kami via WhatsApp (+62 813-9154-6240) atau email info@jakora.id. Aku siap bantu! 😄`;
    } else if (lowerInput.includes('pengiriman') || lowerInput.includes('kirim')) {
      return isGenZ
        ? `${userName} bro! Kirim 2-5 hari, tergantung lokasi. Cepet gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Pengiriman 2-5 hari, tergantung lokasi. Oke bgt! 😄`
        : `${userName}! Pengiriman biasanya 2-5 hari tergantung lokasi. 😊`;
    } else if (lowerInput.includes('halal') || lowerInput.includes('sertifikat')) {
      return isGenZ
        ? `${userName} sis! Semua produk Jakora halal, gaskeun aman! 🔥`
        : isNonBaku
        ? `${userName}! Produk Jakora halal, tenang aja! 😄`
        : `${userName}! Ya, semua produk Jakora telah tersertifikasi halal. 😊`;
    } else if (lowerInput.includes('bahan') || lowerInput.includes('komposisi')) {
      return isGenZ
        ? `${userName} bro! Bahan dari jamur tangkos sawit, alami gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Bahan dari jamur tangkos sawit, sehat bgt! 😄`
        : `${userName}! Bahan utama dari jamur tangkos sawit yang kaya nutrisi. 🌱`;
    } else if (lowerInput.includes('diskon') || lowerInput.includes('promo')) {
      return isGenZ
        ? `${userName} sis! Cek promo di IG atau WA kami, gaskeun murah! 🔥`
        : isNonBaku
        ? `${userName}! Ada promo, cek di IG atau WA ya! 😄`
        : `${userName}! Ya, cek promo terbaru di Instagram atau WhatsApp kami. 😊`;
    } else if (lowerInput.includes('simpan') || lowerInput.includes('penyimpanan')) {
      return isGenZ
        ? `${userName} bro! Simpan di tempat kering, hindari panas gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Simpan di tempat kering, jauhin sinar matahari ya! 😄`
        : `${userName}! Simpan di tempat kering dan sejuk, hindari paparan sinar matahari langsung. 😊`;
    } else if (lowerInput.includes('grosir') || lowerInput.includes('banyak')) {
      return isGenZ
        ? `${userName} sis! Bisa grosir, hubungi WA untuk deal gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Bisa pesen banyak, hubungi WA ya! 😄`
        : `${userName}! Ya, hubungi kami via WhatsApp untuk pemesanan grosir. 😊`;
    } else if (lowerInput.includes('keunggulan') || lowerInput.includes('mengapa')) {
      return isGenZ
        ? `${userName} bro! Jakora ramah lingkungan, sehat gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Jakora sehat dan ramah lingkungan bgt! 😄`
        : `${userName}! Jakora ramah lingkungan dan kaya nutrisi dari jamur segar. 🌱`;
    } else if (lowerInput.includes('pembayaran') || lowerInput.includes('bayar')) {
      return isGenZ
        ? `${userName} sis! Bisa transfer bank atau e-wallet, gampang gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Bayar via bank atau e-wallet, oke bgt! 😄`
        : `${userName}! Kami menerima transfer bank dan pembayaran via e-wallet. 😊`;
    } else if (lowerInput.includes('garansi') || lowerInput.includes('jaminan')) {
      return isGenZ
        ? `${userName} bro! Ada garansi, kontak kami kalau ada masalah gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Ada garansi, hubungi kami ya! 😄`
        : `${userName}! Ya, kami menjamin kualitas, hubungi kami jika ada masalah. 😊`;
    } else if (lowerInput.includes('apa') || lowerInput.includes('gimana')) {
      return isGenZ
        ? `${userName} sis! Apa yang mau ditanya bro? Aku bantu gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Apa yang mau ditanya? Aku bantu ya! 😄`
        : `${userName}! Apa yang ingin kamu ketahui? Aku siap membantu! 😊`;
    } else if (lowerInput.includes('bye') || lowerInput.includes('dadah') || lowerInput.includes('sampai jumpa')) {
      return isGenZ
        ? `${userName} bro! Dadah, balik lagi ya gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Dadah, jumpa lagi ya! 😄`
        : `${userName}! Sampai jumpa, semoga membantu! 😊`;
    } else if (lowerInput.includes('bantu') || lowerInput.includes('tolong')) {
      return isGenZ
        ? `${userName} sis! Aku bantu bro, tanya apa aja gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Aku bantu, tanya apa aja ya! 😄`
        : `${userName}! Tentu, aku siap membantu. Apa yang kamu butuhkan? 😊`;
    } else if (lowerInput.includes('sehat') || lowerInput.includes('kesehatan')) {
      return isGenZ
        ? `${userName} bro! Jakora sehat banget, cocok buat gaya hidup gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Jakora sehat bgt, cocok buat hidup sehat! 😄`
        : `${userName}! Jakora dibuat dari jamur alami, sangat baik untuk kesehatan. 🌱`;
    } else if (lowerInput.includes('lingkungan') || lowerInput.includes('ramah')) {
      return isGenZ
        ? `${userName} sis! Jakora ramah lingkungan gaskeun, keren kan? 🔥`
        : isNonBaku
        ? `${userName}! Jakora ramah lingkungan bgt! 😄`
        : `${userName}! Jakora mendukung keberlanjutan lingkungan. 🌱`;
    } else if (lowerInput.includes('cara') || lowerInput.includes('gimana')) {
      return isGenZ
        ? `${userName} bro! Cara pesen? WA aja gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Cara pesen? Hubungi WA ya! 😄`
        : `${userName}! Cara pesan? Hubungi kami via WhatsApp. 😊`;
    } else if (lowerInput.includes('tes') || lowerInput.includes('coba')) {
      return isGenZ
        ? `${userName} sis! Coba tanya apa aja bro, aku jawab gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Coba tanya ya, aku bales bgt! 😄`
        : `${userName}! Silakan coba tanya apa saja, aku akan jawab! 😊`;
    } else if (lowerInput.includes('cepat') || lowerInput.includes('lama')) {
      return isGenZ
        ? `${userName} bro! Kirim cepet, 2-5 hari gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Pengiriman cepet, 2-5 hari ya! 😄`
        : `${userName}! Pengiriman biasanya 2-5 hari tergantung lokasi. 😊`;
    } else if (lowerInput.includes('murah') || lowerInput.includes('terjangkau')) {
      return isGenZ
        ? `${userName} sis! Harga Jakora Rp 38.000, Jatastik Rp 12.000, murah gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Harga oke, Jakora Rp 38.000, Jatastik Rp 12.000! 😄`
        : `${userName}! Harga terjangkau, Jakora Rp 38.000, Jatastik Rp 12.000. 😊`;
    } else if (lowerInput.includes('alamat') || lowerInput.includes('lokasi')) {
      return isGenZ
        ? `${userName} bro! Alamat di Limau Manis, Padang. Cek maps gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Lokasinya Limau Manis, Padang ya! 😄`
        : `${userName}! Lokasi kami di Limau Manis, Kec. Pauh, Kota Padang. 😊`;
    } else if (lowerInput.includes('jamur') || lowerInput.includes('bahan alami')) {
      return isGenZ
        ? `${userName} sis! Bahan dari jamur tangkos sawit, alami gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Bahan jamur tangkos sawit, sehat bgt! 😄`
        : `${userName}! Dibuat dari jamur tangkos sawit yang alami dan sehat. 🌱`;
    } else if (lowerInput.includes('rasa') || lowerInput.includes('enak')) {
      return isGenZ
        ? `${userName} bro! Rasa autentik Minang, enak gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Rasa enak bgt, autentik Minang! 😄`
        : `${userName}! Rasa autentik Minangkabau, sangat lezat! 😊`;
    } else if (lowerInput.includes('kualitas') || lowerInput.includes('bagus')) {
      return isGenZ
        ? `${userName} sis! Kualitas top, garansi gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Kualitas oke, ada garansi ya! 😄`
        : `${userName}! Kualitas terjamin dengan garansi. 😊`;
    } else if (lowerInput.includes('order') || lowerInput.includes('beli')) {
      return isGenZ
        ? `${userName} bro! Beli via WA, gaskeun cepet! 🔥`
        : isNonBaku
        ? `${userName}! Beli lewat WA ya, cepet bgt! 😄`
        : `${userName}! Pesan via WhatsApp (+62 813-9154-6240). 😊`;
    } else if (lowerInput.includes('review') || lowerInput.includes('testimoni')) {
      return isGenZ
        ? `${userName} sis! Banyak yang suka, cek testimoni gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Testimoni oke bgt, cek ya! 😄`
        : `${userName}! Banyak testimoni positif, cek di halaman Testimoni! 😊`;
    } else if (lowerInput.includes('baru') || lowerInput.includes('update')) {
      return isGenZ
        ? `${userName} bro! Ada varian baru, cek Produk gaskeun! 🔥`
        : isNonBaku
        ? `${userName}! Ada yang baru, cek Produk ya! 😄`
        : `${userName}! Kami punya varian baru, lihat di halaman Produk! 😊`;
    } else if (lowerInput.includes('vegan') || lowerInput.includes('vegetarian')) {
      return isGenZ
        ? `${userName} sis! Jakora vegan gaskeun, sehat banget! 🔥`
        : isNonBaku
        ? `${userName}! Jakora vegan, cocok bgt! 😄`
        : `${userName}! Ya, Jakora cocok untuk diet vegan dan vegetarian. 🌱`;
    } else if (lowerInput.includes('resep') || lowerInput.includes('cara masak')) {
      return isGenZ
        ? `${userName} bro! Jakora siap makan, gaskeun praktis! 🔥`
        : isNonBaku
        ? `${userName}! Jakora tinggal makan, praktis bgt! 😄`
        : `${userName}! Jakora sudah siap makan dengan kemasan self-heating. 😊`;
    } else if (lowerInput.includes('kesehatan') || lowerInput.includes('nutrisi')) {
      return isGenZ
        ? `${userName} sis! Nutrisi jamur gaskeun, sehat banget! 🔥`
        : isNonBaku
        ? `${userName}! Nutrisi oke bgt, sehat ya! 😄`
        : `${userName}! Kaya nutrisi dari jamur, baik untuk kesehatan. 🌱`;
    } else {
      return isGenZ
        ? `${userName} bro! Aku bingung nih 😅 Tanya soal Jakora gaskeun ya! 🔥`
        : isNonBaku
        ? `${userName}! Aku bingung 😅 Tanya soal Jakora ya! 😄`
        : `${userName}! Hmm, aku agak bingung nih 😅 Coba tanyakan tentang Jakora ya!`;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const botResponse = { text: generateResponse(input), sender: 'bot' };
    setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showWelcomeMessage && !isOpen && (
        <div
          id="welcomeMessages"
          dir="auto"
          style={{
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 'rgba(111, 111, 111, 0.2) 0px 10px 30px 0px, rgba(96, 96, 96, 0.2) 0px 0px 0px 1px',
            borderRadius: '10px',
            padding: '20px',
            margin: '8px',
            fontSize: '14px',
            opacity: 1,
            transform: 'scale(1)',
            transition: 'opacity 0.5s, transform 0.5s',
            position: 'fixed',
            bottom: '90px',
            cursor: 'pointer',
            zIndex: 2147483647,
            maxWidth: '400px',
            right: '20px',
            fontFamily: '"Segoe UI", "Segoe UI Emoji", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
          }}
          onClick={() => setIsOpen(true)}
        >
          Hai, Jakora Friend! Ada yang bisa kami bantu?
          <div
            id="welcomeMessagesCross"
            style={{
              backgroundColor: 'rgb(225, 225, 225)',
              width: '10px',
              height: '10px',
              color: 'black',
              boxShadow: 'rgba(111, 111, 111, 0.2) 0px 10px 30px 0px, rgba(96, 96, 96, 0.2) 0px 0px 0px 1px',
              borderRadius: '9999px',
              padding: '6px',
              margin: '8px',
              fontSize: '12px',
              transform: 'scale(1)',
              transition: 'opacity 0.5s, transform 0.5s',
              position: 'absolute',
              top: '-15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 500,
              border: '1px solid rgb(215, 215, 215)',
              cursor: 'pointer',
              zIndex: 2147483647,
              right: '-13px',
              opacity: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowWelcomeMessage(false);
            }}
          >
            X
          </div>
        </div>
      )}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="bg-white rounded-lg shadow-xl w-[90%] max-w-md"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="flex justify-between items-center p-4 bg-[#4a704a] text-white rounded-t-lg">
              <span className="flex items-center gap-2"><img src="/assets/images/logo-chatbot.png" alt="Jakora Chat" className="w-8 h-8" /> Jakora Chat</span>
              <motion.button onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaTimes />
              </motion.button>
            </div>
            <div ref={chatContainerRef} className="p-4 h-80 overflow-y-auto space-y-2">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-[#4a704a] text-white self-end ml-auto' : 'bg-gray-100 text-gray-800 self-start mr-auto'} shadow-md glow`}
                    style={{ boxShadow: '0 0 10px rgba(74, 112, 74, 0.3)' }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {showNameForm ? (
              <form onSubmit={handleSetUsername} className="p-4 border-t border-gray-300 flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama panggilanmu"
                  className="p-2 border rounded-lg focus:outline-none"
                />
                <motion.button
                  type="submit"
                  className="bg-[#4a704a] text-white p-2 rounded-lg hover:bg-[#355e3b] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Simpan
                </motion.button>
              </form>
            ) : (
              <div className="p-2">
                <div className="flex gap-2 mb-2">
                  {quickOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickOption(option)}
                      className="bg-[#a3e4b7] text-white px-3 py-1 rounded-full text-sm hover:bg-[#7fd8a1] transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="flex border-t border-gray-300 p-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1 p-3 border-none focus:outline-none rounded-l-lg"
                  />
                  <motion.button
                    type="submit"
                    className="bg-[#4a704a] text-white p-3 rounded-r-lg hover:bg-[#355e3b] transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Kirim
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div className="relative">
            <motion.button
              className="bg-[#4a704a] text-white p-6 rounded-full shadow-lg hover:bg-[#355e3b]"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ backgroundImage: `url('/assets/images/logo-chatbot.png')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '60px', height: '60px' }}
            >
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;