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

          {/* TRACK */}
          <div
            ref={ref}
            className="flex w-full h-full will-change-transform select-none"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-none w-screen h-full flex items-center justify-center relative group overflow-hidden"
              >
                {image.link ? (
                  <Link
                    to={image.link}
                    className="w-full h-full flex items-center justify-center relative overflow-hidden"
                  >
                    {/* IMAGE + PARALLAX BASE */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="
                        w-full h-full object-cover
                        will-change-transform
                        transition-transform duration-1000 ease-out
                        group-hover:scale-110
                      "
                    />

                    {/* overlay cinéma doux */}
                    <div className="
                      absolute inset-0
                      bg-black/20
                      opacity-60
                      group-hover:opacity-30
                      transition-opacity duration-700
                    " />

                    {/* TITRE */}
                    {image.label && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className="
                            text-[7vh] font-bold text-white
                            tracking-wide
                            transition-all duration-500 ease-out
                            group-hover:text-yellow-400
                            group-hover:scale-110
                          "
                        >
                          {image.label}
                        </div>
                      </div>
                    )}
                  </Link>
                ) : (
                  <>
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="
                        w-full h-full object-cover
                        will-change-transform
                        transition-transform duration-1000 ease-out
                        group-hover:scale-110
                      "
                    />

                    <div className="
                      absolute inset-0
                      bg-black/20
                      opacity-60
                      group-hover:opacity-30
                      transition-opacity duration-700
                    " />

                    {image.label && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className="
                            text-[7vh] font-bold text-white
                            tracking-wide
                            transition-all duration-500 ease-out
                            group-hover:text-yellow-400
                            group-hover:scale-110
                          "
                        >
                          {image.label}
                        </div>
                      </div>
                    )}
                  </>
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
