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

  // PRELOAD
  useEffect(() => {
    photosImages.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
  }, []);

  // 🔥 WHEEL → HORIZONTAL SCROLL
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // IMPORTANT: smooth horizontal movement
      el.scrollLeft += e.deltaY * 1.2;
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="shrink-0">
        <div className="flex justify-center py-[3vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>
      </div>

      {/* CAROUSEL AREA */}
      <div className="flex-1 overflow-hidden">

        <ImageCarousel2
          images={photosImages}
          ref={carouselRef}
        />

      </div>
    </div>
  );
}
