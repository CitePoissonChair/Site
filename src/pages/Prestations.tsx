import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const SPEED = 1.2;
const LERP = 0.08;

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

const sections = [photosImages, livesImages, clipsImages];

export function Prestations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const carRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetY = useRef(0);
  const currentY = useRef(0);

  const targetX = useRef([0, 0, 0]);
  const currentX = useRef([0, 0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const animate = () => {
      // vertical smooth scroll
      currentY.current += (targetY.current - currentY.current) * LERP;
      content.style.transform = `translateY(-${currentY.current}px)`;

      // horizontal smooth per section
      for (let i = 0; i < sections.length; i++) {
        currentX.current[i] += (targetX.current[i] - currentX.current[i]) * LERP;

        const el = carRefs.current[i];
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

      targetY.current += delta;

      const maxY = content.scrollHeight - window.innerHeight;
      targetY.current = Math.max(0, Math.min(targetY.current, maxY));

      // detect section (smooth, no snap)
      const sectionIndex = Math.min(
        sections.length - 1,
        Math.max(0, Math.floor(targetY.current / window.innerHeight))
      );

      const images = sections[sectionIndex];

      const maxX = (images.length - 1) * window.innerWidth;

      targetX.current[sectionIndex] += delta * 0.3;

      targetX.current[sectionIndex] = Math.max(
        0,
        Math.min(targetX.current[sectionIndex], maxX)
      );
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden bg-[rgb(15,15,15)]"
    >
      <div ref={contentRef} className="will-change-transform">

        <SiteHeader title="Prestations" showBack />
        <VideoHero />

        <ImageCarousel
          images={photosImages}
          ref={(el) => { carRefs.current[0] = el }}
        />

        <ImageCarousel
          images={livesImages}
          ref={(el) => { carRefs.current[1] = el }}
        />

        <ImageCarousel
          images={clipsImages}
          ref={(el) => { carRefs.current[2] = el }}
        />

      </div>
    </div>
  );
}
