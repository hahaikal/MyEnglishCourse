'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    opacity: number;
  }>>([]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(generatedStars);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.length > 0 && stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-gold-accent"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, 1, star.opacity],
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
      </div>

      <motion.div
        className="absolute top-20 left-10 z-0 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="w-12 h-12 md:w-16 md:h-16 text-gold-accent" />
      </motion.div>
       <motion.div
        className="absolute bottom-40 right-10 z-0 opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-gold-accent" />
      </motion.div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
            animate={{ textShadow: ['0 0 20px #FBBF24', '0 0 40px #FBBF24', '0 0 20px #FBBF24'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Shining Through
            <br />
            <span className="text-orange-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">The Year</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-xl md:text-4xl text-gold-accent font-light mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            End-of-Year Concert 2025
          </h2>
          <p className="text-lg md:text-2xl text-orange-light font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            by My English Course
          </p>
        </motion.div>

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
              <div className="w-16 h-16 md:w-20 md:h-20 bg-black/40 backdrop-blur-md border border-gold-accent/50 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-2xl md:text-3xl font-bold text-white font-mono z-10 drop-shadow-md">
                  {item.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs text-white/90 mt-2 uppercase tracking-wider font-bold drop-shadow-md">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base md:text-xl text-white max-w-2xl mx-auto mt-4 mb-8 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium"
        >
          We are delighted to invite you to our End-of-Year Concert 2025! Join us as
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
            className="bg-orange-primary hover:bg-orange-light text-white text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-orange-primary/50 transition-all duration-300 transform hover:scale-105 border-2 border-white/20"
          >
            <Sparkles className="mr-2" />
            Share Your Thoughts
          </Button>
        </motion.div>
      </div>
    </section>
  );
}