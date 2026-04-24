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

// Le ref est forwardé vers le div interne qui reçoit le translateX
// Le parent manipule directement ref.current.style.transform — aucun re-render React
export const ImageCarousel = forwardRef<HTMLDivElement, ImageCarouselProps>(
  ({ images }, ref) => {
    return (
      <div className="w-full h-screen relative overflow-hidden flex-none">
        <div className="w-full h-full flex items-center overflow-hidden">
          <div
            ref={ref}
            className="flex gap-[50px] w-full h-full px-[25px] will-change-transform"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-none h-full min-w-[100vw] flex items-center justify-center relative"
              >
                {image.link ? (
                  <Link to={image.link} className="w-full h-full flex items-center justify-center relative">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover block" />
                    {image.label && (
                      <div className="absolute bottom-[20px] left-[20px] bg-[rgba(0,0,0,0.7)] text-[rgb(250,250,250)] px-[20px] py-[10px] text-[2rem] font-bold z-[2]">
                        {image.label}
                      </div>
                    )}
                  </Link>
                ) : (
                  <>
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover block" />
                    {image.label && (
                      <div className="absolute bottom-[20px] left-[20px] bg-[rgba(0,0,0,0.7)] text-[rgb(250,250,250)] px-[20px] py-[10px] text-[2rem] font-bold z-[2]">
                        {image.label}
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
