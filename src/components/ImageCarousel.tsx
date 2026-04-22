import { useRef, useEffect, useState } from 'react';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [translatePosition, setTranslatePosition] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;

    if (!carousel || !wrapper || !sticky) return;

    const handleWheel = (e: WheelEvent) => {
      // Vérifier si le wrapper est visible dans la viewport
      const wrapperRect = wrapper.getBoundingClientRect();
      const isInViewport = wrapperRect.top <= window.innerHeight && wrapperRect.bottom >= 0;

      if (!isInViewport) return;

      const carouselWidth = carousel.scrollWidth;
      const stickyWidth = sticky.clientWidth;
      const maxScroll = carouselWidth - stickyWidth;

      // Vérifier si on peut scroller dans la direction demandée
      const canScrollLeft = translatePosition > 0 && e.deltaY < 0;
      const canScrollRight = translatePosition < maxScroll && e.deltaY > 0;

      if (canScrollLeft || canScrollRight) {
        // Intercepter le scroll et faire défiler les images
        e.preventDefault();
        
        // Accumuler le mouvement (1px de scroll = 1px de translation)
        const newPosition = Math.min(Math.max(translatePosition + e.deltaY, 0), maxScroll);
        setTranslatePosition(newPosition);
        
        // Appliquer la translation
        carousel.style.transform = `translateX(-${newPosition}px)`;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [translatePosition]);

  return (
    <div className="category-wrapper" ref={wrapperRef}>
      <div className="carousel-sticky-wrapper" ref={stickyRef}>
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
      </div>
    </div>
  );
}
