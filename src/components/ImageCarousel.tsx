import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    label?: string;
    link?: string;
  }>;
}

export const ImageCarousel = forwardRef<HTMLDivElement, ImageCarouselProps>(
  ({ images }, ref) => {
    return (
      <div className="w-full h-screen relative overflow-hidden flex-none">
        <div className="w-full h-full flex items-center overflow-hidden">
          <div
            ref={ref}
            className="flex gap-[50px] w-full h-full px-[25px] will-change-transform"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-none h-full min-w-[100vw] flex items-center justify-center relative group"
              >
                {image.link ? (
                  <Link
                    to={image.link}
                    className="w-full h-full flex items-center justify-center relative overflow-hidden"
                  >
                    {/* IMAGE */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* LABEL SIMPLE (SANS BACKGROUND) */}
                    {image.label && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-[4vh] font-bold text-white transition-colors duration-300 group-hover:text-yellow-400">
                          {image.label}
                        </div>
                      </div>
                    )}
                  </Link>
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                    {/* IMAGE */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* LABEL SIMPLE */}
                    {image.label && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-[4vh] font-bold text-white transition-colors duration-300 group-hover:text-yellow-400">
                          {image.label}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
