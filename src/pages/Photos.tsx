import { SiteHeader } from '../components/SiteHeader';
import { useEffect } from 'react';

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
  // preload images
  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">

      {/* HEADER (fixe, toujours visible) */}
      <div className="shrink-0 z-20">
        <div className="flex justify-center py-[3vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>
      </div>

      {/* CAROUSEL AREA */}
      <div className="flex-1 overflow-hidden">

        {/* SCROLLER */}
        <div
          className="
            flex
            h-full
            w-full
            overflow-x-auto
            overflow-y-hidden
            snap-x
            snap-mandatory
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
              {/* IMAGE (NOT fullscreen now, contains nicely) */}
              <img
                src={photo}
                className="
                  max-h-[80%]
                  max-w-[90%]
                  object-cover
                  rounded-[2vh]
                "
              />

              {/* overlay léger */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
