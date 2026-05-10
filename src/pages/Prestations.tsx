import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const SPEED = 1.1;
const LERP = 0.045;

const photosImages = [
  { src: '/prestationscontenu/Cisnienie (1).jpg', alt: 'Photos', label: 'Photos', link: '/photos' },
  { src: '/prestationscontenu/Madame loyal (8).jpg', alt: 'Photos', link: '/photos' },
  { src: '/prestationscontenu/Youth Code (1).jpg', alt: 'Photos', link: '/photos' },
];

const livesImages = [
  { src: '/prestationscontenu/24012026-Street Sects (6).jpg', alt: 'Lives', label: 'Lives', link: '/captations' },
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p1.jpg', alt: 'Lives', link: '/captations' },
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p2.jpg', alt: 'Lives', link: '/captations' },
];

const clipsImages = [
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p3.jpg', alt: 'Clips', label: 'Clips', link: '/clips' },
  { src: '/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_1.jpg', alt: 'Clips', link: '/clips' },
  { src: '/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_2.jpg', alt: 'Clips', link: '/clips' },
];

const carousels = [photosImages, livesImages, clipsImages];

export function Prestations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const targetY = useRef(0);
  const currentY = useRef(0);

  const targetX = useRef([0, 0, 0]);
  const currentX = useRef([0, 0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const maxY = () => content.scrollHeight - window.innerHeight;

    const animate = () => {
      currentY.current += (targetY.current - currentY.current) * LERP;
      content.style.transform = `translateY(-${currentY.current}px)`;

      for (let i = 0; i < 3; i++) {
        currentX.current[i] += (targetX.current[i] - currentX.current[i]) * LERP;

        const el = refs.current[i];
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
      const y = currentY.current;

      const sectionHeight = window.innerHeight;
      const section = Math.floor(y / sectionHeight);

      targetY.current = Math.max(0, Math.min(targetY.current + delta, maxY()));

      const isCentered =
        y % sectionHeight < sectionHeight * 0.8 &&
        y % sectionHeight > sectionHeight * 0.2;

      if (section >= 0 && section < carousels.length && isCentered) {
        const maxX = (carousels[section].length - 1) * window.innerWidth;
        const current = targetX.current[section];

        const horizontal = delta * 0.4;

        targetX.current[section] = Math.max(
          0,
          Math.min(current + horizontal, maxX)
        );
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[rgb(15,15,15)]">
      <div ref={contentRef} className="will-change-transform">

        <SiteHeader title="Prestations" showBack />
        <VideoHero />

        <div className="h-[10vh]" />

        <ImageCarousel
          images={photosImages}
          ref={(el) => { refs.current[0] = el; }}
        />

        <div className="h-[10vh]" />

        <ImageCarousel
          images={livesImages}
          ref={(el) => { refs.current[1] = el; }}
        />

        <div className="h-[10vh]" />

        <ImageCarousel
          images={clipsImages}
          ref={(el) => { refs.current[2] = el; }}
        />

        <div className="h-[20vh]" />
      </div>
    </div>
  );
}
