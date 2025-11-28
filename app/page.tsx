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
    <main className="overflow-hidden">
      <WelcomeOverlay onOpen={handleOpenInvitation} />
      
      <div className="relative">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/BG2.jpeg')" }}
        >
          <div className="absolute inset-0 bg-navy-dark/30"></div>
        </div>
        
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/BG2.jpeg')" }}
        >
           <div className="absolute inset-0 bg-gradient-to-b bg-navy-dark/30"></div>
        </div>

        <div className="relative z-10">
          <GallerySection />
          <BenefitsSection />
          <RsvpSection />
          <Footer />
        </div>
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