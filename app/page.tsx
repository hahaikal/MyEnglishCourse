'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { HeroSection } from '../components/hero-section'; // Fixed path
import { AboutSection } from '../components/about-section'; // Fixed path
import { GallerySection } from '../components/gallery-section'; // Fixed path
import { BenefitsSection } from '../components/benefits-section'; // Fixed path
import { ShiningWishesSection as RsvpSection } from '../components/shining'; // Fixed path
import { Footer } from '../components/footer'; // Fixed path
import { WelcomeOverlay } from '../components/welcome-overlay'; // Fixed path

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

  // Fungsi ini akan dipanggil saat tombol di WelcomeOverlay diklik
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
    <main className="overflow-hidden">
      <WelcomeOverlay onOpen={handleOpenInvitation} />
      
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <BenefitsSection />
      <RsvpSection />
      <Footer />
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