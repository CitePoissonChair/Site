import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

type ImageItem = {
  src: string;
  alt: string;
  label?: string;
  labelType?: string;
  link?: string;
};

type Props = {
  images: ImageItem[];
};

export const ImageCarousel2 = forwardRef<HTMLDivElement, Props>(
  ({ images }, ref) => {
    return (
      <div className="w-full h-full overflow-hidden">

        {/* SCROLL TRACK (controlled externally) */}
        <div
          ref={ref}
          className="
            flex
            h-[80vh]
            items-start
            pt-[6vh]
            overflow-x-auto
            overflow-y-hidden
            scroll-smooth
            no-scrollbar
          "
        >

          {images.map((image, index) => (
            <div
              key={index}
              data-snap
              className="
                flex-none
                w-[85vw]
                h-[70vh]
                mx-[2vw]
                relative
                overflow-hidden
                rounded-[3vh]
                group
                shrink-0
              "
            >

              {image.link ? (
                <Link to={image.link} className="block w-full h-full relative">

                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      transition-transform
                      duration-[1200ms]
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />

                </Link>
              ) : (
                <>
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      transition-transform
                      duration-[1200ms]
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />
                </>
              )}

            </div>
          ))}

          {/* spacing fin */}
          <div className="flex-none w-[10vw] h-full" />

        </div>
      </div>
    );
  }
);

ImageCarousel2.displayName = 'ImageCarousel2';
