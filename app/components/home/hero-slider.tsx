import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    title: 'Produits du terroir',
    subtitle: 'Épices, huiles & condiments',
    description: 'Céréales, légumes, viandes et plus — directement des producteurs locaux à votre table.',
    cta: 'Découvrir les offres',
    link: '/products',
    gradient: 'from-amber-500/80 bg-transparent',
    accent: 'text-primary',
    image: "/photo-1542838132-92c53300491e.jpg"
  },
  {
    title: 'Offres du moment',
    subtitle: 'Épices, huiles & condiments',
    description: 'Les saveurs authentiques du Cameroun — piment, huile de palme, gingembre et bien plus.',
    cta: 'Voir les produits',
    link: '/products',
    gradient: 'from-blue-500/80  bg-transparent',
    accent: 'text-blue-600',
    image: "/photo-1610832958506-aa56368176cf.jpg"
  },
  {
    title: 'Fraîcheur garantie',
    subtitle: 'Poissons & Viandes locales',
    description: 'Des produits frais et fumés sélectionnés chaque jour auprès de nos producteurs partenaires.',
    cta: 'Acheter maintenant',
    link: '/products',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-accent',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-(--card)">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className={`relative px-8 py-16 md:px-16 md:py-24 `}
        >
          <img src={slide.image} className='w-full z-0 h-full object-cover absolute top-0 opacity-60 left-0' alt="" />
          <div className={` absolute top-0 left-0 bg-linear-to-br w-full h-full ${slide.gradient}`}></div>
          <div className="max-w-lg relative z-10">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest ${slide.accent} mb-3`}>
              {slide.title}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              {slide.subtitle}
            </h1>
            <p className="text-foreground/80 text-base md:text-lg mb-8 leading-relaxed">
              {slide.description}
            </p>

            <Link
              href={slide.link}
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              {slide.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>



        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-foreground' : 'w-4 bg-foreground/20'
              }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-(--card)/80 backdrop-blur flex items-center justify-center hover:bg-(--card) transition-colors shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-(--card)/80 backdrop-blur flex items-center justify-center hover:bg-(--card) transition-colors shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}