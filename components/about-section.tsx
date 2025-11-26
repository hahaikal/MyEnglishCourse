'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-orange-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy-primary mb-6">
              About the <span className="text-orange-primary">Event</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The End of Year Concert by MEC is an annual celebration that
              showcases the students&apos; learning progress throughout the year. It
              includes performances such as drama, poetry, storytelling,
              singing, and other creative English presentations.
            </p>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                <Calendar className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Date</h3>
                  <p className="text-gray-600">December 2025</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                <Clock className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Time</h3>
                  <p className="text-gray-600">To be announced</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                <MapPin className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Venue</h3>
                  <p className="text-gray-600">MyEnglishCourse Campus</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                <Users className="w-6 h-6 text-orange-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-primary">Audience</h3>
                  <p className="text-gray-600">Students, Parents & Guests</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-orange-primary to-orange-light rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="w-64 h-64 border-8 border-gold-accent/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-48 h-48 border-8 border-white/20 rounded-full"
                />
                <div className="absolute inset-0">
                  <img
                    src="/1.jpg"
                    alt="Student Excellence"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
