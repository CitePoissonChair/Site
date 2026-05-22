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
      <div className="w-full h-screen relative flex-none overflow-hidden">

        {/* VIEWPORT */}
        <div
          className="
            w-full h-full
            flex items-center

            overflow-x-auto
            overflow-y-hidden

            no-scrollbar

            snap-x
            snap-mandatory

            touch-pan-x

            [-webkit-overflow-scrolling:touch]
          "
        >

          {/* TRACK */}
          <div
            ref={ref}
            className="
              flex h-full
              select-none
              will-change-transform
              pr-[50px]
            "
          >

            {images.map((image, index) => (
              <div
                key={index}
                className="
                  flex-none
                  w-screen
                  h-full
                  relative
                  group
                  overflow-hidden
                  snap-center
                "
              >

                {image.link ? (
                  <Link
                    to={image.link}
                    className="
                      w-full h-full
                      block
                      relative
                      overflow-hidden
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
                        object-cover object-center

                        scale-100
                        group-hover:scale-110

                        transition-transform
                        duration-[1600ms]
                        ease-out

                        will-change-transform

                        pointer-events-none
                        select-none
                      "
                    />

                    <div
                      className="
                        absolute inset-0
                        bg-black/30
                        group-hover:bg-black/15
                        transition-all
                        duration-700
                      "
                    />

                    {image.label && (
                      <div
                        className="
                          absolute inset-0
                          flex items-center justify-center
                          pointer-events-none
                          p-8 md:p-14
                        "
                      >

                        <div
                          className={`
                            whitespace-pre-line
                            text-white
                            text-center

                            transition-all
                            duration-500
                            ease-out

                            group-hover:scale-105

                            ${image.labelType === 'list'
                              ? `
                                text-[11px]
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
                                text-2xl
                                md:text-5xl
                                leading-tight
                                font-light
                                max-w-[700px]
                              `
                              : ''
                            }

                            ${!image.labelType
                              ? `
                                text-[7vh]
                                font-bold
                                tracking-wide
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
                ) : null}

              </div>
            ))}

            <div className="flex-none w-[50px] h-full" />

          </div>
        </div>
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
