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

        {/* TRACK */}
        <div
          ref={ref}
          className="
            flex w-full h-full
            will-change-transform
            snap-x snap-mandatory
          "
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="
                flex-none w-screen h-full
                relative overflow-hidden
                snap-center
                group
              "
            >
              {img.link ? (
                <Link to={img.link} className="w-full h-full block relative">

                  {/* BACK LAYER (parallax slow) */}
                  <div className="
                    absolute inset-0 scale-110
                    transition-transform duration-[1200ms]
                    group-hover:scale-125
                  ">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* OVERLAY LAYER */}
                  <div className="
                    absolute inset-0 bg-black/30
                    group-hover:bg-black/10
                    transition
                  " />

                  {/* FOREGROUND LABEL */}
                  {img.label && (
                    <div className="
                      absolute inset-0 flex items-center justify-center
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
                  <div className="absolute inset-0 scale-110 group-hover:scale-125 transition-transform duration-[1200ms]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                  {img.label && (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-[7vh] font-bold pointer-events-none">
                      {img.label}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
