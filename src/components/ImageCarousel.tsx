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
      <div className="w-full h-screen overflow-hidden flex-none relative">
        <div className="w-full h-full flex items-center">

          <div
            ref={ref}
            className="flex w-full h-full will-change-transform select-none"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-none w-screen h-full flex items-center justify-center relative group"
              >
                <div className="w-full h-full relative overflow-hidden">

                  {img.link ? (
                    <Link to={img.link} className="w-full h-full block">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />

                      {img.label && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-[7vh] font-bold text-white group-hover:text-yellow-400 transition">
                            {img.label}
                          </div>
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
                        <div className="absolute inset-0 flex items-center justify-center text-[7vh] font-bold text-white pointer-events-none">
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
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
