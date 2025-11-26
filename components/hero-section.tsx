'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
  }>>([]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Star Animation Logic
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);

    // Countdown Logic (Target: 7 Dec 2025, 14:00 WIB)
    const targetDate = new Date('2025-12-07T14:00:00+07:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToWishes = () => {
    document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy-dark via-navy-primary to-navy-dark pt-20 pb-10">
      {/* Background Stars */}
      {stars.length > 0 && stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-gold-accent"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="absolute top-20 left-20 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="w-16 h-16 text-gold-accent opacity-20" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight"
            animate={{ textShadow: ['0 0 20px #FBBF24', '0 0 40px #FBBF24', '0 0 20px #FBBF24'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Shining Through
            <br />
            <span className="text-orange-primary">The Year</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-xl md:text-4xl text-gold-accent font-light mb-4">
            End of Year Concert
          </h2>
          <p className="text-lg md:text-2xl text-orange-light font-medium">
            by MyEnglishCourse
          </p>
        </motion.div>

        {/* The Clock (Countdown) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 mb-8 flex flex-wrap justify-center gap-4"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm border border-gold-accent/30 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl font-bold text-white font-mono">
                  {item.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mt-4 mb-8 leading-relaxed"
        >
          We are delighted to invite you to our End of Year Concert! Join us as
          we celebrate our students&apos; growth, creativity, and achievements.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Button
            onClick={scrollToWishes}
            size="lg"
            className="bg-orange-primary hover:bg-orange-light text-white text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-orange-primary/50 transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="mr-2" />
            Share Your Wishes
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-gold-accent"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}