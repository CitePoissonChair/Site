import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const LERP = 0.08;
const SPEED = 1.8;

const photosImages = [
  { src: '/prestationscontenu/Cisnienie-1.jpg', alt: 'Photos 1', label: 'Photos', link: '/photos' },
  { src: '/prestationscontenu/Madame-loyal-5.jpg', alt: 'Photos 2', link: '/photos' },
  { src: '/prestationscontenu/Youth-Code-1.jpg', alt: 'Photos 3', link: '/photos' },
];

const livesImages = [
  { src: '/prestationscontenu/24012026-Street Sects (6).jpg', alt: 'Lives 1', label: 'Lives', link: '/captations' },
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p1.jpg', alt: 'Lives 2', link: '/captations' },
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p2.jpg', alt: 'Lives 3', link: '/captations' },
];

const clipsImages = [
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p3.jpg', alt: 'Clips 1', label: 'Clips', link: '/clips' },
  { src: '/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_1.jpg', alt: 'Clips 2', link: '/clips' },
  { src: '/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_2.jpg', alt: 'Clips 3', link: '/clips' },
];

const carousels = [photosImages, livesImages, clipsImages];

export function Prestations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const carouselInnerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const targetYRef = useRef(0);
  const targetXRefs = useRef([0, 0, 0]);
  const currentYRef = useRef(0);
  const currentXRefs = useRef([0, 0, 0]);

  // Cache des offsets — évite les reflows à chaque event wheel
  const cachedOffsetsRef = useRef<{ top: number; height: number }[]>([]);

  // Dernières valeurs appliquées au DOM — évite les re-paints inutiles
  const lastYRef = useRef(-1);
  const lastXRef = useRef([-1, -1, -1]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const getMaxScrollY = () => content.scrollHeight - window.innerHeight;
    const getMaxScrollX = (numImages: number) => (numImages - 1) * (window.innerWidth + 50);

    // Calcule et met en cache les offsets — appelé une seule fois au mount + resize
    const cacheOffsets = () => {
      const children = content.children;
      cachedOffsetsRef.current = [2, 3, 4].map((i) => {
        const el = children[i] as HTMLElement;
        return { top: el.offsetTop, height: el.offsetHeight };
      });
    };

    cacheOffsets();
    window.addEventListener('resize', cacheOffsets);

    const getActiveCarousel = () => {
      const y = currentYRef.current;
      const offsets = cachedOffsetsRef.current;
      for (let i = 0; i < offsets.length; i++) {
        const { top, height } = offsets[i];
        if (y >= top - 2 && y < top + height - 2) return i;
      }
      return -1;
    };

    const animate = () => {
      // --- Lerp vertical ---
      const diffY = targetYRef.current - currentYRef.current;
      if (Math.abs(diffY) > 0.1) {
        currentYRef.current += diffY * LERP;
      } else {
        currentYRef.current = targetYRef.current;
      }

      // Écriture DOM uniquement si la valeur a changé
      const roundedY = Math.round(currentYRef.current * 100) / 100;
      if (roundedY !== lastYRef.current) {
        content.style.transform = `translateY(-${roundedY}px)`;
        lastYRef.current = roundedY;
      }

      // --- Lerp horizontal ---
      for (let i = 0; i < 3; i++) {
        const diffX = targetXRefs.current[i] - currentXRefs.current[i];
        if (Math.abs(diffX) > 0.1) {
          currentXRefs.current[i] += diffX * LERP;
        } else {
          currentXRefs.current[i] = targetXRefs.current[i];
        }

        const roundedX = Math.round(currentXRefs.current[i] * 100) / 100;
        if (roundedX !== lastXRef.current[i]) {
          const el = carouselInnerRefs.current[i];
          if (el) el.style.transform = `translateX(-${roundedX}px)`;
          lastXRef.current[i] = roundedX;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * SPEED;
      const maxY = getMaxScrollY();
      const carouselIndex = getActiveCarousel();

      if (carouselIndex === -1) {
        targetYRef.current = Math.max(0, Math.min(targetYRef.current + delta, maxY));
        return;
      }

      const offsets = cachedOffsetsRef.current;
      const numImages = carousels[carouselIndex].length;
      const maxX = getMaxScrollX(numImages);
      const currentX = targetXRefs.current[carouselIndex];

      if (delta > 0 && currentX < maxX) {
        targetYRef.current = offsets[carouselIndex].top;
        targetXRefs.current[carouselIndex] = Math.min(currentX + delta, maxX);
      } else if (delta < 0 && currentX > 0) {
        targetYRef.current = offsets[carouselIndex].top;
        targetXRefs.current[carouselIndex] = Math.max(currentX + delta, 0);
      } else {
        targetYRef.current = Math.max(0, Math.min(targetYRef.current + delta, maxY));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', cacheOffsets);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      style={{ background: 'rgb(15,15,15)' }}
    >
      <div ref={contentRef} className="will-change-transform">
        <div className="flex flex-col items-center">
          <SiteHeader title="Prestations" showBack />
        </div>

        <VideoHero />

        <ImageCarousel
          images={photosImages}
          ref={(el) => { carouselInnerRefs.current[0] = el; }}
        />
        <ImageCarousel
          images={livesImages}
          ref={(el) => { carouselInnerRefs.current[1] = el; }}
        />
        <ImageCarousel
          images={clipsImages}
          ref={(el) => { carouselInnerRefs.current[2] = el; }}
        />
      </div>
    </div>
  );
}
