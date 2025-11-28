'use client';

import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-gold-accent" />
            <h3 className="text-2xl font-bold">My English Course</h3>
            <Star className="w-6 h-6 text-gold-accent" />
          </div>

          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Empowering students through language, creativity, and confidence
          </p>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-orange-primary fill-orange-primary" /> for our amazing students
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © 2025 MyEnglishCourse. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
