import { SiteHeader } from '../components/SiteHeader';
import { useEffect, useRef } from 'react';

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

  // preload images
  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Wheel → horizontal scroll (Apple style)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // smooth horizontal scroll
      el.scrollLeft += e.deltaY * 0.8;
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => el.removeEventListener('wheel', onWheel);
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

        <div
          ref={containerRef}
          className="
            flex
            h-full
            w-full
            overflow-x-hidden
            snap-x
            snap-mandatory
            scroll-smooth
          "
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className="
                min-w-full
                h-full
                flex
                items-center
                justify-center
                snap-center
                shrink-0
                relative
              "
            >
              {/* BIG IMAGE */}
              <img
                src={photo}
                className="
                  w-[85%]
                  h-[85%]
                  object-cover
                  rounded-[3vh]
                  shadow-2xl
                "
              />

              {/* soft vignette */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
