import { SiteHeader } from '../components/SiteHeader';
import { useEffect, useRef } from 'react';
import { ImageCarousel2 } from '../components/ImageCarousel2';

const photosImages = [
  {
    src: '/prestationscontenu/Madame loyal (6).jpg',
    alt: 'Photo 1',
    link: '#',
  },
  {
    src: '/prestationscontenu/Youth Code (3).jpg',
    alt: 'Photo 2',
  },
  {
    src: '/prestationscontenu/Madame loyal (4).jpg',
    alt: 'Photo 3',
  },
  {
    src: '/prestationscontenu/Author & Punisher (1).jpg',
    alt: 'Photo 4',
  },
  {
    src: '/prestationscontenu/King Yosef (1).jpg',
    alt: 'Photo 5',
  },
  {
    src: '/prestationscontenu/Cisnienie (2).jpg',
    alt: 'Photo 6',
  },
  {
    src: '/prestationscontenu/Madame loyal (2).jpg',
    alt: 'Photo 7',
  },
  {
    src: '/prestationscontenu/Cisnienie (4).jpg',
    alt: 'Photo 8',
  },
];

export function Photos() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // preload images (important pour fluidité Apple-like)
  useEffect(() => {
    photosImages.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">

      {/* HEADER FIXE */}
      <div className="shrink-0 z-20">
        <div className="flex justify-center py-[3vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>
      </div>

      {/* CAROUSEL AREA */}
      <div className="flex-1 flex items-center">

        <ImageCarousel2
          images={photosImages}
          ref={carouselRef}
        />

      </div>
    </div>
  );
}
