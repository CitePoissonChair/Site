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
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">

      {/* HEADER */}
      <div className="absolute top-[3vh] left-1/2 -translate-x-1/2 z-30 text-center">

        {/* TITLE */}
        <div className="text-[1.8vh] uppercase tracking-[0.35em] opacity-80">
          Photographie
        </div>

        {/* BACK (now under title) */}
        <a
          href="/prestations"
          className="block mt-[1.2vh] text-[1.4vh] uppercase tracking-widest opacity-70 hover:opacity-100 transition"
        >
          ← Retour
        </a>

      </div>

      {/* CAROUSEL (more spacing from header) */}
      <div className="h-full flex items-start pt-[10vh]">

        <ImageCarousel2
          images={photosImages}
          ref={carouselRef}
        />

      </div>

    </div>
  );
}
