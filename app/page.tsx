'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
// Menggunakan alias @/ sesuai file Anda, jika error nanti akan saya ubah ke relative
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { GallerySection } from '@/components/gallery-section';
import { BenefitsSection } from '@/components/benefits-section';
import { ShiningWishesSection as RsvpSection } from '@/components/shining';
import { Footer } from '@/components/footer';
import { WelcomeOverlay } from '@/components/welcome-overlay';

function HomeContent() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/backsound.mp3');
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleOpenInvitation = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <WelcomeOverlay onOpen={handleOpenInvitation} />
      
      {/* GLOBAL FIXED BACKGROUND */}
      {/* Ini menggantikan semua background zona sebelumnya */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/BG2.jpeg')" }}
      >
        {/* Overlay tipis opsional agar teks lebih terbaca di atas gambar */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* CONTENT WRAPPER */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <BenefitsSection />
        <RsvpSection />
        <Footer />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-dark" />}>
      <HomeContent />
    </Suspense>
  );
}