import { useEffect, useRef, useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';

const photos = [
  '/prestationscontenu/Madame loyal (6).jpg',
  '/prestationscontenu/Youth Code (3).jpg',
  '/prestationscontenu/Madame loyal (4).jpg',
  '/prestationscontenu/Author & Punisher (1).jpg',
  '/prestationscontenu/King Yosef (1).jpg',
  '/prestationscontenu/Cisnienie (2).jpg',
  '/prestationscontenu/Madame loyal (2).jpg',
  '/prestationscontenu/Cisnienie (4).jpg',
];

export function Photos() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Scroll tracking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const value = el.scrollLeft / max;
      setProgress(value);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Preload images
  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="flex justify-center py-[3vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 z-30">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="
          flex
          h-screen
          w-full
          overflow-x-scroll
          snap-x
          snap-mandatory
          scroll-smooth
          no-scrollbar
        "
      >
        {photos.map((photo, index) => (
          <Slide key={index} src={photo} index={index} />
        ))}
      </div>

      {/* hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

/* ---------------- SLIDE ---------------- */

function Slide({ src }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = window.innerWidth / 2;
      const dist = (rect.left + rect.width / 2 - center) / center;

      setOffset(dist);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="
        min-w-full
        h-screen
        snap-center
        relative
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* image wrapper */}
      <div
        className="absolute inset-0"
        style={{
          transform: `
            scale(${1 + Math.abs(offset) * 0.08})
            translateX(${offset * 40}px)
          `,
          filter: `blur(${Math.abs(offset) * 6}px)`,
          transition: 'transform 0.2s linear, filter 0.2s linear',
        }}
      >
        <img
          src={src}
          className="
            w-full
            h-full
            object-cover
            select-none
            pointer-events-none
          "
        />
      </div>

      {/* cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40" />
    </div>
  );
}
