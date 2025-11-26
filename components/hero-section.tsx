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
  }>>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  const scrollToWishes = () => {
    document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy-dark via-navy-primary to-navy-dark">
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
        className="absolute top-20 left-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="w-16 h-16 text-gold-accent opacity-20" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-20 h-20 text-gold-accent opacity-20" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight"
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
          <h2 className="text-2xl md:text-4xl text-gold-accent font-light mb-4">
            End of Year Concert
          </h2>
          <p className="text-xl md:text-2xl text-orange-light font-medium">
            by MyEnglishCourse
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-8 leading-relaxed"
        >
          We are delighted to invite you to our End of Year Concert! Join us as
          we celebrate our students&apos; growth, creativity, and achievements.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12"
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
