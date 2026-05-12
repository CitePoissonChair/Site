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
      <div className="overflow-hidden w-full">
        <div
          ref={ref}
          className="flex gap-[50px] will-change-transform"
        >
          {images.map((image, index) => {
            const content = (
              <div className="relative w-screen h-[80vh] flex-shrink-0 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />

                {image.label && (
                  <div className="absolute inset-0 flex items-end p-8 md:p-14 bg-black/20">
                    <p
                      className={`
                        whitespace-pre-line
                        text-white

                        ${
                          image.labelType === 'list'
                            ? 'text-xs md:text-sm uppercase tracking-[0.28em] leading-relaxed font-light'
                            : ''
                        }

                        ${
                          image.labelType === 'quote'
                            ? 'text-2xl md:text-5xl leading-tight font-light max-w-[600px]'
                            : ''
                        }

                        ${
                          !image.labelType
                            ? 'text-3xl md:text-6xl font-medium'
                            : ''
                        }
                      `}
                    >
                      {image.label}
                    </p>
                  </div>
                )}
              </div>
            );

            if (image.link) {
              return (
                <Link
                  key={index}
                  to={image.link}
                  className="block"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={index}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';
