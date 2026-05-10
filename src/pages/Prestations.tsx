import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const SPEED = 1.4;
const LERP = 0.055;

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

  const mode = useRef<'vertical' | 'horizontal'>('vertical');
  const active = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const maxY = () => content.scrollHeight - window.innerHeight;
    const maxX = (i: number) => (carousels[i].length - 1) * window.innerWidth;

    const animate = () => {
      // smooth Y
      currentY.current += (targetY.current - currentY.current) * LERP;
      content.style.transform = `translateY(-${currentY.current}px)`;

      // smooth X
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

    const getSection = () => {
      return Math.floor(currentY.current / window.innerHeight);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * SPEED;
      const section = getSection();

      // SWITCH MODE
      if (section >= 0 && section < 3) {
        const current = targetX.current[section];
        const limit = maxX(section);

        if (Math.abs(current) < limit + 5) {
          mode.current = 'horizontal';
          active.current = section;
        } else {
          mode.current = 'vertical';
          active.current = null;
        }
      }

      // HORIZONTAL LOCK
      if (mode.current === 'horizontal' && active.current !== null) {
        const i = active.current;
        const limit = maxX(i);
        const x = targetX.current[i];

        if (delta > 0 && x < limit) {
          targetX.current[i] = Math.min(x + delta, limit);
          return;
        }

        if (delta < 0 && x > 0) {
          targetX.current[i] = Math.max(x + delta, 0);
          return;
        }

        mode.current = 'vertical';
        active.current = null;
      }

      // VERTICAL
      targetY.current = Math.max(0, Math.min(targetY.current + delta, maxY()));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[rgb(15,15,15)]">
      <div ref={contentRef} className="will-change-transform">

        {/* MORPH FEEL HEADER */}
        <div className="transition-all duration-700 ease-out">
          <SiteHeader title="Prestations" showBack />
        </div>

        <VideoHero />

        <ImageCarousel
          images={photosImages}
          ref={(el) => (refs.current[0] = el)}
        />

        <ImageCarousel
          images={livesImages}
          ref={(el) => (refs.current[1] = el)}
        />

        <ImageCarousel
          images={clipsImages}
          ref={(el) => (refs.current[2] = el)}
        />

      </div>
    </div>
  );
}
