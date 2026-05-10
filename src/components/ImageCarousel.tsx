import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    label?: string;
    link?: string;
  }[];
}

export const ImageCarousel = forwardRef<HTMLDivElement, ImageCarouselProps>(
  ({ images }, ref) => {
    return (
      <div className="w-full h-screen overflow-hidden relative">
        
        {/* TRACK */}
        <div
          ref={ref}
          className="
            flex h-full w-full
            will-change-transform
            select-none
          "
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-none w-screen h-full relative"
            >
              <div className="w-full h-full relative">

                {img.link ? (
                  <Link to={img.link} className="w-full h-full block">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />

                    {img.label && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
                        {img.label}
                      </div>
                    )}
                  </Link>
                ) : (
                  <>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />

                    {img.label && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
                        {img.label}
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
