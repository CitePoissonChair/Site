import { useEffect, useRef } from 'react';
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

  // preload
  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      {/* header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="flex justify-center py-[3vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>
      </div>

      {/* SCROLL AREA */}
      <div
        ref={containerRef}
        className="
          flex
          h-screen
          w-screen
          overflow-x-scroll
          overflow-y-hidden
          snap-x
          snap-mandatory
          scroll-smooth
        "
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="
              min-w-full
              h-screen
              flex
              items-center
              justify-center
              snap-center
              relative
            "
          >
            <img
              src={photo}
              className="
                w-full
                h-full
                object-cover
                select-none
                pointer-events-none
              "
            />

            {/* vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
