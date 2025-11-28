'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
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
      
      {/* STABLE MOBILE BACKGROUND FIX 
        1. position: fixed -> Agar tidak ikut scroll
        2. h-[100vh] & supports-dvh -> Agar tinggi konsisten meski address bar browser muncul/hilang
        3. bg-cover & bg-center -> Agar gambar proporsional
        4. z-[-1] -> Agar selalu di belakang konten
        5. transform-gpu -> Memaksa hardware acceleration untuk performa lebih mulus
      */}
      <div 
        className="fixed top-0 left-0 w-full h-[100vh] supports-[height:100dvh]:h-[100dvh] z-[-1] bg-cover bg-center bg-no-repeat transform-gpu pointer-events-none"
        style={{ backgroundImage: "url('/BG2.jpeg')" }}
      >
        {/* Overlay tipis agar teks lebih terbaca di atas gambar yang mungkin terang/ramai */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* CONTENT WRAPPER */}
      <div className="relative z-10 w-full">
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