import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import RecipePreview from '../components/home/RecipePreview';
import CTASection from '../components/home/CTASection';

const HERO_IMAGE = 'https://media.base44.com/images/public/69dbb256640e902970e65c83/9d370b06c_generated_1597df4d.png';
const RECIPE_IMAGES = [
  'https://media.base44.com/images/public/69dbb256640e902970e65c83/f99dd7aa6_generated_ec9d80e2.png',
  'https://media.base44.com/images/public/69dbb256640e902970e65c83/b940c0c5d_generated_ecd30785.png',
  'https://media.base44.com/images/public/69dbb256640e902970e65c83/1182e0e7d_generated_d3d04f6b.png',
];
const LIFESTYLE_IMAGE = 'https://media.base44.com/images/public/69dbb256640e902970e65c83/e3436ab63_generated_957b7e23.png';
const HOME_IMAGES = [HERO_IMAGE, ...RECIPE_IMAGES, LIFESTYLE_IMAGE];

export default function Home() {
  useEffect(() => {
    const preloadHomeImages = () => {
      HOME_IMAGES.forEach((src, index) => {
        const image = new Image();
        image.decoding = 'async';
        image.fetchPriority = index < 2 ? 'high' : 'low';
        image.src = src;
      });
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadHomeImages, { timeout: 1000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(preloadHomeImages, 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <HeroSection heroImage={HERO_IMAGE} />
      <StatsSection />
      <RecipePreview images={RECIPE_IMAGES} />
      <TestimonialsSection />
      <CTASection lifestyleImage={LIFESTYLE_IMAGE} />
    </div>
  );
}
