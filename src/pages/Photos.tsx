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

  // PRELOAD (fluidité + instant display)
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

    const lerp = 0.08; // inertie Apple
    let raf: number;
    let snapTimeout: any;

    const getMax = () => el.scrollWidth - el.clientWidth;

    // 🔥 ANIMATION LOOP (smooth + inertia)
    const animate = () => {
      current += (target - current) * lerp;
      el.scrollLeft = current;

      raf = requestAnimationFrame(animate);
    };

    animate();

    // 🔥 MAGNETIC SNAP
    const snap = () => {
      const items = el.querySelectorAll('[data-snap]');
      if (!items.length) return;

      const scroll = el.scrollLeft;

      let closest = 0;
      let minDist = Infinity;

      items.forEach((item) => {
        const left = (item as HTMLElement).offsetLeft;
        const dist = Math.abs(left - scroll);

        if (dist < minDist) {
          minDist = dist;
          closest = left;
        }
      });

      target = closest;
    };

    // 🔥 WHEEL CONTROL
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const speed = 1.4;

      target += e.deltaY * speed;
      target = Math.max(0, Math.min(target, getMax()));

      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(snap, 120);
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="shrink-0 z-20">
        <div className="flex justify-center py-[3vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="flex-1 overflow-hidden">

        <ImageCarousel2
          images={photosImages}
          ref={carouselRef}
        />

      </div>
    </div>
  );
}
