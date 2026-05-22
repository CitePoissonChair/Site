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
            items-start

            overflow-x-auto
            overflow-y-hidden

            no-scrollbar
            touch-pan-x

            snap-x
            snap-proximity

            [-webkit-overflow-scrolling:touch]

            pt-[12vh]
            pb-[4vh]

            px-[4vw]
            gap-[4vw]
          "
        >

          {images.map((image, index) => (
            <div
              key={index}
              className="
                flex-none
                relative
                overflow-hidden
                rounded-[3vh]
                shrink-0
                group
                snap-center

                w-[90vw]
                h-[72vh]

                md:w-[78vw]
                md:h-[82vh]
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

                  object-contain
                  object-center

                  transition-transform
                  duration-[1400ms]
                  ease-out

                  group-hover:scale-105

                  select-none
                  pointer-events-none
                "
              />

              <div
                className="
                  absolute inset-0
                  bg-black/20

                  transition-all
                  duration-700

                  group-hover:bg-black/10
                "
              />

            </div>
          ))}

          <div className="flex-none w-[4vw]" />

        </div>
      </div>
    );
  }
);

ImageCarousel2.displayName = 'ImageCarousel2';
