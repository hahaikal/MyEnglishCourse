'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutSection() {
  return (
    // Background section dibuat transparan karena sudah di-handle oleh wrapper di page.tsx
    <section className="py-20 px-4 relative">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-12 items-start max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg text-center md:text-left">
                About the <span className="text-gold-accent">Event</span>
              </h2>
              
              <p className="text-lg text-gray-100 leading-relaxed mb-8 font-medium text-center md:text-left drop-shadow-md">
                The End of Year Concert by MEC is an annual celebration that
                showcases the students&apos; learning progress throughout the year. It
                includes performances such as drama, poetry, storytelling,
                singing, and other creative English presentations.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Calendar, title: "Date", desc: "Sunday, 7 December 2025" },
                  { icon: Clock, title: "Time", desc: "Session 1: 13.30 - 15.00 WIB \n(PreSchool, PreKindergarten, Kindergarten & Basic)\nSession 2: 15.30 - 18.00 WIB\n(Starter - Waystage)" },
                  { icon: MapPin, title: "Venue", desc: "Ballroom Bintang Mulia" },
                  { icon: Users, title: "Audience", desc: "Students, Parents & Guests" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 bg-white/90 p-4 rounded-lg shadow-lg border-l-4 border-orange-primary backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <item.icon className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-navy-primary">{item.title}</h3>
                      <div className="text-gray-900 font-medium whitespace-pre-line">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* The Compass (Location Map) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center drop-shadow-md">
                  <MapPin className="mr-2 text-gold-accent" />
                  Location Map
                </h3>
                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-white/30">
                  <iframe
                    src="https://maps.google.com/maps?q=1.703194321232287,100.40300574418615&hl=es;z=14&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="text-center mt-6">
                  <Button 
                    variant="outline" 
                    className="border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-navy-primary font-bold bg-navy-primary/50 backdrop-blur-sm px-8 py-6 text-lg rounded-full transition-all"
                    onClick={() => window.open('https://maps.app.goo.gl/GXuEQAF8N79rMSwDA', '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}