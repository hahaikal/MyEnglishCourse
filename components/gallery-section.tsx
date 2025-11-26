'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const showcaseItems = [
  {
    image: '/2.jpg',
    title: 'Building Confidence',
    description:
      'By performing on stage, students learn to manage nervousness, speak clearly, and present themselves with confidence. This experience helps them grow braver and more independent.',
    gradient: 'from-orange-primary to-orange-light',
    delay: 0.2,
  },
  {
    image: '/5.jpg',
    title: 'Skills & Fun Learning',
    description:
      'Students practice English in a fun and meaningful way through drama, poetry, and other performances.',
    gradient: 'from-gold-accent to-orange-light',
    delay: 0.4,
  },
  {
    image: '/4.jpg',
    title: 'Community & Connection',
    description:
      'To strengthen communication between My English Course, students, and parents, and to celebrate the learning journey of the entire year.',
    gradient: 'from-navy-primary to-orange-primary',
    delay: 0.6,
  },
];

export function GallerySection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-orange-bg to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-primary mb-4">
            The <span className="text-orange-primary">Showcase</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes our End of Year Concert a transformative
            experience for every student
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-orange-primary to-orange-light rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            A Night of Growth & Celebration
          </h3>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Every performance is a milestone. Every student shines. Join us in
            witnessing the incredible journey of learning and self-discovery.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
