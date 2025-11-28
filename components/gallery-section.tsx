'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const showcaseItems = [
  {
    images: ['/1.jpg', '/6.jpg', '/3.jpg', '/7.jpg'],
    title: 'Building Confidence',
    description:
      'By performing on stage, students learn to manage nervousness, speak clearly, and present themselves with confidence. This experience helps them grow braver and more independent.',
    delay: 0.2,
  },
  {
    images: ['/5.jpg'],
    title: 'Skills & Fun Learning',
    description:
      'Students practice English in a fun and meaningful way through drama, poetry, and other performances.',
    delay: 0.4,
  },
  {
    images: ['/4.jpg', '/2.jpg', '/8.jpg'],
    title: 'Community & Connection',
    description:
      'To strengthen communication between My English Course, students, and parents, and to celebrate the learning journey of the entire year.',
    delay: 0.6,
  },
];

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    duration: 50,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const goToPrevious = () => {
    emblaApi?.scrollPrev();
  };

  const goToNext = () => {
    emblaApi?.scrollNext();
  };

  const goToSlide = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="relative h-64 overflow-hidden bg-gray-100 group/slider">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {images.map((imgSrc, index) => (
            <div key={index} className="relative flex-[0_0_100%] h-full overflow-hidden">
              {/* OPTIMIZATION STEP 2: Ganti <img> dengan <Image /> */}
              <Image
                src={imgSrc}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0} // Prioritaskan gambar pertama
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function GallerySection() {
  return (
    <section className="py-20 px-4 relative ">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            The <span className="text-gold-accent">Showcase</span>
          </h2>
          <p className="text-lg text-gray-100 font-medium max-w-2xl mx-auto drop-shadow-md">
            Discover what makes our End-of-Year Concert a transformative
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
              <Card className="h-full overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 bg-white/90 backdrop-blur-md">
                <ImageSlider images={item.images} title={item.title} />

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm font-medium">
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
          className="mt-16 bg-gradient-to-r from-orange-primary to-orange-light rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden border border-white/20"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32 text-white" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md">
              A Bright Day to Celebrate
            </h3>
            <p className="text-lg md:text-xl opacity-100 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Let’s gather to appreciate our children’s growth and achievements. We can’t wait to share this joyful celebration with you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}