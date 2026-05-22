import { forwardRef } from 'react';

type ImageItem = {
  src: string;
  alt: string;
};

type Props = {
  images: ImageItem[];
};

export const ImageCarousel2 = forwardRef<HTMLDivElement, Props>(
  ({ images }, ref) => {
    return (
      <div className="w-full h-full overflow-hidden">

        <div
          ref={ref}
          className="
            flex
            h-[85vh]
            items-start
            overflow-x-auto
            overflow-y-hidden
            no-scrollbar

            touch-pan-x
            snap-x
            snap-mandatory

            will-change-transform
            [-webkit-overflow-scrolling:touch]
          "
        >

          {images.map((image, index) => (
            <div
              key={index}
              className="
                flex-none
                w-[88vw]
                h-[78vh]
                mx-[2vw]
                relative
                overflow-hidden
                rounded-[3vh]
                shrink-0
                group
                snap-center
              "
            >

              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                draggable={false}
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  object-[center_20%]

                  transition-transform
                  duration-[1200ms]
                  ease-out

                  group-hover:scale-105

                  select-none
                  pointer-events-none
                "
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />

            </div>
          ))}

          <div className="flex-none w-[10vw]" />

        </div>
      </div>
    );
  }
);

ImageCarousel2.displayName = 'ImageCarousel2';
