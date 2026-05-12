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
            overflow-x-auto overflow-y-hidden
            no-scrollbar
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

                    {/* IMAGE */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
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
                      "
                    />

                    {/* OVERLAY */}
                    <div
                      className="
                        absolute inset-0
                        bg-black/30

                        group-hover:bg-black/15

                        transition-all
                        duration-700
                      "
                    />

                    {/* LABEL */}
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

                                group-hover:text-yellow-400
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
                    {/* IMAGE */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
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
                      "
                    />

                    {/* OVERLAY */}
                    <div
                      className="
                        absolute inset-0
                        bg-black/30

                        group-hover:bg-black/15

                        transition-all
                        duration-700
                      "
                    />

                    {/* LABEL */}
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

                                group-hover:text-yellow-400
                              `
                              : ''
                            }
                          `}
                        >
                          {image.label}
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>
            ))}

            {/* SPACING FIN */}
            <div className="flex-none w-[50px] h-full" />

          </div>
        </div>
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
