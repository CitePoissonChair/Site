import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const SPEED_Y = 1.2;
const SPEED_X = 0.9;
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

  const mode = useRef<'vertical' | 'horizontal'>('vertical');
  const active = useRef(0);

  const targetY = useRef(0);
  const currentY = useRef(0);

  const targetX = useRef([0, 0, 0]);
  const currentX = useRef([0, 0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const sectionHeight = window.innerHeight;

    const animate = () => {
      // vertical
      currentY.current += (targetY.current - currentY.current) * LERP;
      content.style.transform = `translateY(-${currentY.current}px)`;

      // horizontal
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

    const getSection = () =>
      Math.round(currentY.current / sectionHeight);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const deltaY = e.deltaY * SPEED_Y;

      // =========================
      // MODE VERTICAL
      // =========================
      if (mode.current === 'vertical') {
        targetY.current += deltaY;

        const section = getSection();
        active.current = section;

        // clamp
        const maxY = content.scrollHeight - sectionHeight;
        targetY.current = Math.max(0, Math.min(targetY.current, maxY));

        // 🔥 entrer en mode horizontal si section carrousel
        if (section >= 0 && section < sections.length) {
          const elTop = section * sectionHeight;

          const distance = Math.abs(targetY.current - elTop);

          // si on est "assez proche", on lock horizontal
          if (distance < 40) {
            mode.current = 'horizontal';
            targetY.current = elTop;
          }
        }
      }

      // =========================
      // MODE HORIZONTAL
      // =========================
      else if (mode.current === 'horizontal') {
        const i = active.current;
        const images = sections[i];

        const maxX = (images.length - 1) * window.innerWidth;

        targetX.current[i] += deltaY * SPEED_X;

        // clamp horizontal
        if (targetX.current[i] <= 0) {
          targetX.current[i] = 0;

          // retour vertical vers haut
          if (deltaY < 0) mode.current = 'vertical';
        }

        if (targetX.current[i] >= maxX) {
          targetX.current[i] = maxX;

          // fin → retour vertical
          if (deltaY > 0) {
            mode.current = 'vertical';
          }
        }
      }
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
          ref={(el) => { carRefs.current[0] = el; }}
        />

        <ImageCarousel
          images={livesImages}
          ref={(el) => { carRefs.current[1] = el; }}
        />

        <ImageCarousel
          images={clipsImages}
          ref={(el) => { carRefs.current[2] = el; }}
        />

      </div>
    </div>
  );
}
