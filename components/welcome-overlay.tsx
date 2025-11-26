'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Hapus impor next/navigation yang bermasalah
// import { useSearchParams } from 'next/navigation'; 
import { MailOpen, Star } from 'lucide-react';
// Perbaiki jalur impor Button
import { Button } from '@/components/ui/button'; 

interface WelcomeOverlayProps {
  onOpen: () => void;
}

function WelcomeOverlayContent({ onOpen }: WelcomeOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara');
  
  useEffect(() => {
    // Gunakan window.location.search sebagai pengganti useSearchParams
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        // Decode URI component untuk menangani spasi (%20) dan karakter spesial lainnya
        setGuestName(decodeURIComponent(to));
      }
      setIsOpen(true);
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(false);
    onOpen(); // Trigger musik dan animasi utama
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-dark text-white p-4 overflow-hidden"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-primary blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-navy-primary blur-[120px]" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center space-y-6 max-w-md w-full border border-gold-accent/30 bg-navy-primary/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
          >
            <div className="space-y-2">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block"
              >
                <MailOpen className="w-12 h-12 text-gold-accent mx-auto mb-4" />
              </motion.div>
              <p className="text-sm uppercase tracking-widest text-gray-300">You are invited to</p>
              <h1 className="text-3xl font-serif font-bold text-white">
                End of Year Concert
              </h1>
              <p className="text-sm text-orange-light font-medium">by MyEnglishCourse</p>
            </div>

            <div className="py-6 border-t border-b border-white/10">
              <p className="text-sm text-gray-400 mb-2">Kepada Yth,</p>
              <h2 className="text-2xl font-bold text-white capitalize">
                {guestName}
              </h2>
            </div>

            <Button
              onClick={handleOpen}
              size="lg"
              className="w-full bg-transparent border-2 border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-navy-dark transition-all duration-300 rounded-full font-semibold tracking-wide group"
            >
              <Star className="w-4 h-4 mr-2 group-hover:animate-spin" />
              Open Invitation
            </Button>
            
            <p className="text-xs text-gray-500 italic">
              *Mohon aktifkan suara untuk pengalaman terbaik
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WelcomeOverlay(props: WelcomeOverlayProps) {
  return (
    <Suspense fallback={null}>
      <WelcomeOverlayContent {...props} />
    </Suspense>
  );
}