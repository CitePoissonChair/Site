import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const LERP = 0.06; // plus smooth (important)
const SPEED = 1.6;

const photosImages = [
  { src: '/prestationscontenu/Cisnienie (1).jpg', alt: 'Photos 1', label: 'Photos', link: '/photos' },
  { src: '/prestationscontenu/Madame loyal (8).jpg', alt: 'Photos 2', link: '/photos' },
  { src: '/prestationscontenu/Youth Code (1).jpg', alt: 'Photos 3', link: '/photos' },
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

  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetY = useRef(0);
  const currentY = useRef(0);

  const targetX = useRef([0, 0, 0]);
  const currentX = useRef([0, 0, 0]);

  const activeSection = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const getMaxY = () => content.scrollHeight - window.innerHeight;
    const getMaxX = (n: number) => (n - 1) * window.innerWidth;

    const animate = () => {
      // smooth vertical scroll (parallax feel)
      currentY.current += (targetY.current - currentY.current) * LERP;
      content.style.transform = `translateY(-${currentY.current}px)`;

      // horizontal scroll
      for (let i = 0; i < 3; i++) {
        currentX.current[i] += (targetX.current[i] - currentX.current[i]) * LERP;

        const el = carouselRefs.current[i];
        if (el) {
          el.style.transform = `translateX(-${currentX.current[i]}px)`;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * SPEED;
      const maxY = getMaxY();

      // détection section simple mais stable
      const section = Math.floor(currentY.current / window.innerHeight);

      if (section >= 0 && section < 3) {
        const maxX = getMaxX(carousels[section].length);
        const current = targetX.current[section];

        if (delta > 0 && current < maxX) {
          targetX.current[section] = Math.min(current + delta, maxX);
          activeSection.current = section;
          return;
        }

        if (delta < 0 && current > 0) {
          targetX.current[section] = Math.max(current + delta, 0);
          activeSection.current = section;
          return;
        }
      }

      targetY.current = Math.max(0, Math.min(targetY.current + delta, maxY));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[rgb(15,15,15)]">
      <div ref={contentRef} className="will-change-transform">

        <SiteHeader title="Prestations" showBack />
        <VideoHero />

        {/* PHOTOS */}
        <ImageCarousel
          images={photosImages}
          ref={(el) => (carouselRefs.current[0] = el)}
        />

        {/* CAPTATIONS */}
        <ImageCarousel
          images={livesImages}
          ref={(el) => (carouselRefs.current[1] = el)}
        />

        {/* CLIPS */}
        <ImageCarousel
          images={clipsImages}
          ref={(el) => (carouselRefs.current[2] = el)}
        />

      </div>
    </div>
  );
}
