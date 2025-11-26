'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-orange-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-12 items-start max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Ubah animasi agar muncul dari bawah (karena sekarang centered/full width)
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy-primary mb-6 text-center">
              About the <span className="text-orange-primary">Event</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The End of Year Concert by MEC is an annual celebration that
              showcases the students&apos; learning progress throughout the year. It
              includes performances such as drama, poetry, storytelling,
              singing, and other creative English presentations.
            </p>

            <div className="space-y-4 mb-8">
              <motion.div
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <Calendar className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Date</h3>
                  <p className="text-gray-600">Sunday, 7 December 2025</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <Clock className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Time</h3>
                  <p className="text-gray-600">14:00 WIB - Finish</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Venue</h3>
                  <p className="text-gray-600">Hotel Bintang Mulia</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <Users className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Audience</h3>
                  <p className="text-gray-600">Students, Parents & Guests</p>
                </div>
              </motion.div>
            </div>

            {/* The Compass (Location Map) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-navy-primary mb-4 flex items-center">
                <MapPin className="mr-2 text-orange-primary" />
                Location Map
              </h3>
              <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                {/* Update URL iframe dengan koordinat baru */}
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
              <div className="text-center mt-4">
                <Button 
                  variant="outline" 
                  className="border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white"
                  onClick={() => window.open('https://maps.app.goo.gl/GXuEQAF8N79rMSwDA', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}