'use client';

import { motion } from 'framer-motion';
import { BookOpen, Megaphone, Shield } from 'lucide-react';

const benefits = [
  {
    icon: BookOpen,
    title: 'Practical English',
    description: 'Real-world language application through creative performances',
    color: 'text-orange-primary',
    bgColor: 'bg-orange-primary/10',
  },
  {
    icon: Megaphone,
    title: 'Public Speaking',
    description: 'Develop confidence and communication skills on stage',
    color: 'text-gold-accent',
    bgColor: 'bg-gold-accent/10',
  },
  {
    icon: Shield,
    title: 'Character Building',
    description: 'Cultivate discipline, courage, and responsibility',
    color: 'text-navy-primary',
    bgColor: 'bg-navy-primary/10',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-primary mb-4">
            Why This <span className="text-orange-primary">Matters</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our End of Year Concert is more than just a performance—it's a
            transformative learning experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 mx-auto mb-6 rounded-2xl ${benefit.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                >
                  <Icon className={`w-12 h-12 ${benefit.color}`} />
                </motion.div>
                <h3 className="text-2xl font-bold text-navy-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-light text-navy-primary italic max-w-4xl mx-auto leading-relaxed">
            "Every child has a light within them. Our concert is where that
            light{' '}
            <span className="text-orange-primary font-semibold not-italic">
              shines brightest
            </span>
            ."
          </blockquote>
          <p className="mt-6 text-gray-600 text-lg">
            — My English Course Team
          </p>
        </motion.div>
      </div>
    </section>
  );
}
