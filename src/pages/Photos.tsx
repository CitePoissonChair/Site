import { SiteHeader } from '../components/SiteHeader';
import { useEffect, useRef } from 'react';
import { ImageCarousel2 } from '../components/ImageCarousel2';

const photosImages = [
  { src: '/prestationscontenu/Madame loyal (6).jpg', alt: '1' },
  { src: '/prestationscontenu/Youth Code (3).jpg', alt: '2' },
  { src: '/prestationscontenu/Madame loyal (4).jpg', alt: '3' },
  { src: '/prestationscontenu/Author & Punisher (1).jpg', alt: '4' },
  { src: '/prestationscontenu/King Yosef (1).jpg', alt: '5' },
  { src: '/prestationscontenu/Cisnienie (2).jpg', alt: '6' },
];

export function Photos() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    photosImages.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let target = el.scrollLeft;
    let current = el.scrollLeft;

    const lerp = 0.07;
    let raf: number;

    const animate = () => {
      current += (target - current) * lerp;
      el.scrollLeft = current;

      raf = requestAnimationFrame(animate);
    };

    animate();

    const max = () => el.scrollWidth - el.clientWidth;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      target += e.deltaY * 1.5;
      target = Math.max(0, Math.min(target, max()));
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">

      {/* HEADER ULTRA LIGHT */}
      <div className="shrink-0 z-20 relative">

        <div className="flex items-center justify-between px-[4vh] pt-[2vh]">

          {/* BACK */}
          <div className="text-[1.5vh] uppercase tracking-widest opacity-80 hover:opacity-100 transition">
            ← Retour
          </div>

          {/* TITLE */}
          <div className="text-[2vh] uppercase tracking-[0.3em]">
            Photos
          </div>

          {/* spacer (équilibre visuel) */}
          <div className="w-[8vh]" />

        </div>
      </div>

      {/* CAROUSEL REMONTÉ */}
      <div className="flex-1 overflow-hidden -mt-[10vh]">

        <ImageCarousel2
          images={photosImages}
          ref={carouselRef}
        />

      </div>
    </div>
  );
}
