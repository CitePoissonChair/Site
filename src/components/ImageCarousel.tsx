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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const translatePositionRef = useRef<number>(0);
  const isActiveRef = useRef<boolean>(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Observer le wrapper directement : actif quand visible à 95% ou plus
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isActiveRef.current = entry.intersectionRatio >= 0.95;
        });
      },
      { threshold: [0, 0.95, 1] }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const sticky = stickyRef.current;

    if (!carousel || !sticky) return;

    const handleWheel = (e: WheelEvent) => {
      // Vérifier si cette catégorie est active (visible à 95%+)
      if (!isActiveRef.current) return;

      const carouselWidth = carousel.scrollWidth;
      const stickyWidth = sticky.clientWidth;
      const maxScroll = carouselWidth - stickyWidth;

      // Vérifier si on peut scroller dans la direction demandée
      const currentPosition = translatePositionRef.current;
      const canScrollLeft = currentPosition > 0 && e.deltaY < 0;
      const canScrollRight = currentPosition < maxScroll && e.deltaY > 0;

      if (canScrollLeft || canScrollRight) {
        // Intercepter le scroll et faire défiler les images
        e.preventDefault();

        // Accumuler le mouvement (1px de scroll = 1px de translation)
        const newPosition = Math.min(Math.max(currentPosition + e.deltaY, 0), maxScroll);
        translatePositionRef.current = newPosition;

        // Appliquer la translation
        carousel.style.transform = `translateX(-${newPosition}px)`;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

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
