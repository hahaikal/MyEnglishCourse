'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeOverlayProps {
  onOpen: () => void;
}

function WelcomeOverlayContent({ onOpen }: WelcomeOverlayProps) {
  // REVISI CRITICAL BUG: Default state harus TRUE agar tidak flicker/bocor saat load
  const [isOpen, setIsOpen] = useState(true); 
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        setGuestName(decodeURIComponent(to));
      }
      // Kita TIDAK perlu setIsOpen(true) di sini lagi karena default sudah true
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(false);
    onOpen();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }} // Pastikan opacity awal 1 (bukan 0)
          exit={{ opacity: 0, y: -100, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
          // REVISI: z-index sangat tinggi (z-[9999]) dan background solid untuk menutup total
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-dark text-white p-4 overflow-hidden"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-primary blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-navy-primary blur-[120px]" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-10 text-center space-y-6 max-w-md w-full border border-gold-accent/30 bg-navy-primary/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl"
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
                End-of-Year Concert 2025
              </h1>
              <p className="text-sm text-orange-light font-medium">by My English Course</p>
            </div>

            <div className="py-6 border-t border-b border-white/10">
              <p className="text-sm text-gray-400 mb-2">Kepada Yth,</p>
              <h2 className="text-2xl font-bold text-white capitalize break-words">
                {guestName}
              </h2>
            </div>

            <Button
              onClick={handleOpen}
              size="lg"
              className="w-full bg-transparent border-2 border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-navy-dark transition-all duration-300 rounded-full font-semibold tracking-wide group py-6 text-lg"
            >
              <Star className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Open Invitation
            </Button>
            
            <p className="text-xs text-gray-500 italic mt-4">
              *Tap to open and play music
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