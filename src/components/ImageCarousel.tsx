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
        <div className="w-full h-full flex items-center overflow-hidden">

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
                className="
                  flex-none w-screen h-full
                  relative flex items-center justify-center
                  group
                "
              >
                <div className="relative w-full h-full overflow-hidden">

                  {img.link ? (
                    <Link
                      to={img.link}
                      className="w-full h-full block relative"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="
                          w-full h-full object-cover
                          transition-transform duration-1000 ease-out
                          group-hover:scale-110
                          will-change-transform
                        "
                      />

                      {/* overlay */}
                      <div className="
                        absolute inset-0
                        bg-black/20
                        group-hover:bg-black/10
                        transition-all duration-700
                      " />

                      {/* label */}
                      {img.label && (
                        <div className="
                          absolute inset-0
                          flex items-center justify-center
                          pointer-events-none
                        ">
                          <div className="
                            text-[7vh] font-bold text-white
                            transition-all duration-500
                            group-hover:text-yellow-400
                            group-hover:scale-110
                          ">
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
                        className="
                          w-full h-full object-cover
                          transition-transform duration-1000 ease-out
                          group-hover:scale-110
                        "
                      />

                      <div className="
                        absolute inset-0 bg-black/20
                        group-hover:bg-black/10
                        transition-all duration-700
                      " />

                      {img.label && (
                        <div className="
                          absolute inset-0 flex items-center justify-center pointer-events-none
                        ">
                          <div className="
                            text-[7vh] font-bold text-white
                            group-hover:text-yellow-400
                            transition-all duration-500
                            group-hover:scale-110
                          ">
                            {img.label}
                          </div>
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
