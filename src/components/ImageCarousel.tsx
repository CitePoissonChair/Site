import { useRef, useEffect } from 'react';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    label?: string;
    labelClass?: string;
    link?: string;
  }>;
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      if (carousel.contains(e.target as Node)) {
        const canScrollRight = carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth;
        const canScrollLeft = carousel.scrollLeft > 0;
        const isScrollingDown = e.deltaY > 0;

        if ((isScrollingDown && canScrollRight) || (!isScrollingDown && canScrollLeft)) {
          carousel.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="images-carousel" ref={carouselRef}>
      {images.map((image, index) => (
        <div key={index} className="image-item">
          {image.link ? (
            <a href={image.link}>
              <img src={image.src} alt={image.alt} />
              {image.label && (
                <div className={`image-label ${image.labelClass || ''}`}>
                  {image.label}
                </div>
              )}
            </a>
          ) : (
            <>
              <img src={image.src} alt={image.alt} />
              {image.label && (
                <div className={`image-label ${image.labelClass || ''}`}>
                  {image.label}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
