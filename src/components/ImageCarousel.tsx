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

export const ImageCarousel = forwardRef<HTMLDivElement, Props>(
  ({ images }, ref) => {
    return (
      <section className="w-full h-screen relative overflow-hidden">

        {/* VIEWPORT */}
        <div
          className="
            w-full
            h-full

            overflow-x-auto
            overflow-y-hidden

            no-scrollbar
            touch-pan-x

            snap-x
            snap-mandatory

            [-webkit-overflow-scrolling:touch]
          "
        >

          {/* TRACK */}
          <div
            ref={ref}
            className="
              flex
              h-full
              items-center
              will-change-transform
              px-[6vw]
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
                  rounded-[2.5vh]
                  group
                  shrink-0
                  snap-center

                  w-[88vw]
                  h-[72vh]

                  md:w-[78vw]
                  md:h-[82vh]
                "
              >

                {image.link ? (
                  <Link
                    to={image.link}
                    className="block w-full h-full relative"
                  >

                    {/* IMAGE */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      draggable={false}
                      className="
                        absolute inset-0
                        w-full h-full

                        object-cover
                        object-center

                        transition-transform
                        duration-[1600ms]
                        ease-out

                        group-hover:scale-105

                        pointer-events-none
                        select-none
                      "
                    />

                    {/* OVERLAY */}
                    <div
                      className="
                        absolute inset-0
                        bg-black/30

                        transition-all
                        duration-700

                        group-hover:bg-black/15
                      "
                    />

                    {/* LABEL */}
                    {image.label && (
                      <div
                        className="
                          absolute inset-0
                          flex items-center justify-center
                          p-6 md:p-12
                          pointer-events-none
                        "
                      >

                        <div
                          className={`
                            whitespace-pre-line
                            text-white
                            text-center

                            transition-all
                            duration-500

                            group-hover:scale-105

                            ${image.labelType === 'list'
                              ? `
                                text-[10px]
                                md:text-sm
                                uppercase
                                tracking-[0.35em]
                                leading-[1.9]
                                font-light
                              `
                              : ''
                            }

                            ${image.labelType === 'quote'
                              ? `
                                text-xl
                                md:text-5xl
                                leading-tight
                                font-light
                                max-w-[700px]
                              `
                              : ''
                            }

                            ${!image.labelType
                              ? `
                                text-[5vh]
                                md:text-[7vh]
                                font-bold
                                tracking-[0.15em]
                              `
                              : ''
                            }
                          `}
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
                      draggable={false}
                      className="
                        absolute inset-0
                        w-full h-full

                        object-cover
                        object-center

                        transition-transform
                        duration-[1600ms]
                        ease-out

                        group-hover:scale-105

                        pointer-events-none
                        select-none
                      "
                    />

                    <div className="absolute inset-0 bg-black/20" />
                  </>
                )}

              </div>
            ))}

            <div className="flex-none w-[6vw]" />

          </div>
        </div>
      </section>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
