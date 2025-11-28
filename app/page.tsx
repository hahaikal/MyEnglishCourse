'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { HeroSection } from '@/components/hero-section';
import { WelcomeOverlay } from '@/components/welcome-overlay';

const AboutSection = dynamic(() => import('@/components/about-section').then(mod => mod.AboutSection), {
  loading: () => <div className="h-96" />,
});
const GallerySection = dynamic(() => import('@/components/gallery-section').then(mod => mod.GallerySection), {
  loading: () => <div className="h-96" />,
});
const BenefitsSection = dynamic(() => import('@/components/benefits-section').then(mod => mod.BenefitsSection));
const ShiningWishesSection = dynamic(() => import('@/components/shining').then(mod => mod.ShiningWishesSection));
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer));

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
      
      <div className="fixed inset-0 w-full h-full z-[-1]">
        <Image
          src="/BG2.jpeg"
          alt="Background Starry Night"
          fill
          priority
          quality={75}
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative z-10 w-full">
        <HeroSection />
        
        <AboutSection />
        <GallerySection />
        <BenefitsSection />
        <ShiningWishesSection />
        <Footer />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-dark flex items-center justify-center text-white">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}