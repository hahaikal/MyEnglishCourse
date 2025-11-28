'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { getSupabase, type Wish } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function ShiningWishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, delay: number, opacity: number}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    const generatedStars = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    fetchWishes();

    const subscription = supabase
      .channel('wishes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' }, (payload) => {
        setWishes((current) => {
          const exists = current.some(w => w.id === payload.new.id);
          if (exists) return current;
          return [payload.new as Wish, ...current];
        });
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchWishes = async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setWishes(data);
    } else if (error) {
      console.error('Error fetching wishes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;
    if (message.length > 280) return;

    const supabase = getSupabase();
    
    if (!supabase) {
      toast({
        title: "Supabase Not Configured",
        description: "Please set up your environment variables.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const newWishData = {
      name: name.trim(),
      message: message.trim()
    };

    const { data, error } = await supabase
      .from('wishes')
      .insert([newWishData])
      .select(); 

    if (!error && data) {
      const insertedWish = data[0] as Wish;
      setWishes((prevWishes) => [insertedWish, ...prevWishes]);

      setName('');
      setMessage('');
      toast({
        title: "Wish Sent!",
        description: "Thank you for your shining support!",
      });
    } else {
      console.error('Error sending wish:', error);
      toast({
        title: "Error",
        description: "Failed to send wish. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const charCount = message.length;
  const isOverLimit = charCount > 280;

  return (
    <section id="wishes" className="py-20 px-4 relative overflow-hidden">
      {/* Overlay Gelap untuk Shines Section agar kontras dengan bintang */}
      <div className="absolute inset-0 bg-navy-dark/90 backdrop-blur-sm z-0"></div>

      {/* REVISI: Bintang-bintang animasi ala Hero Section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.length > 0 && stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-gold-accent"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: '2px',
              height: '2px',
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, 1, star.opacity],
              scale: [0.8, 1.5, 0.8],
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-gold-accent mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Shining <span className="text-orange-primary">Wishes</span>
          </h2>
          <p className="text-lg text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-md">
            Share your words of encouragement and support for our talented students
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white/95 backdrop-blur shadow-2xl border-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-navy-primary mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    maxLength={100}
                    required
                    className="border-2 border-gray-300 focus:border-orange-primary transition-colors text-black font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-navy-primary mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your words of encouragement..."
                    maxLength={280}
                    required
                    rows={5}
                    className={`border-2 transition-colors resize-none text-black font-medium ${
                      isOverLimit ? 'border-red-500' : 'border-gray-300 focus:border-orange-primary'
                    }`}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-600 font-semibold'}`}>
                      {charCount}/280 characters
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !message.trim() || isOverLimit}
                  className="w-full bg-orange-primary hover:bg-orange-light text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="mr-2"
                      >
                        <Star className="w-5 h-5" />
                      </motion.div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 w-5 h-5" />
                      Send Wish
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {wishes.length === 0 ? (
              <Card className="p-8 bg-white/10 backdrop-blur border border-gold-accent/30">
                <p className="text-center text-gray-200 text-lg font-medium">
                  Be the first to share a shining wish!
                </p>
              </Card>
            ) : (
              wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="p-2 bg-gradient-to-br from-white to-orange-bg/30 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-primary to-gold-accent flex items-center justify-center">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-navy-primary mb-1">
                          {wish.name}
                        </h4>
                        <p className="text-gray-900 leading-relaxed mb-2 font-medium">
                          {wish.message}
                        </p>
                        <p className="text-xs text-gray-600 font-semibold">
                          {new Date(wish.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 191, 36, 0.8);
        }
      `}</style>
    </section>
  );
}