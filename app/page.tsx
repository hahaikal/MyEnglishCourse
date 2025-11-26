'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { GallerySection } from '@/components/gallery-section';
import { BenefitsSection } from '@/components/benefits-section';
import { ShiningWishesSection as RsvpSection } from '@/components/shining';
import { Footer } from '@/components/footer';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/backsound.mp3');
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const autoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked, showing play button');
      }
    };

    audio.addEventListener('canplaythrough', autoPlay);

    autoPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handlePlayAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        handlePlayAudio();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    if (!isPlaying) {
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    }

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <BenefitsSection />
      <RsvpSection />
      <Footer />
    </main>
  );
}
