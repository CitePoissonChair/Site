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
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      
      {/* header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="flex justify-center py-[3vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>
      </div>

      {/* IMPORTANT: scroll container */}
      <div
        className="
          flex
          h-full
          w-max
          overflow-x-auto
          overflow-y-hidden
          snap-x
          snap-mandatory
        "
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="
              w-screen
              h-screen
              flex
              items-center
              justify-center
              snap-center
              shrink-0
              relative
            "
          >
            <img
              src={photo}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
