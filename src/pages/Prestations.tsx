import { useEffect, useRef, useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const LERP = 0.08;
const SPEED = 1.8;

const photosImages = [
  { src: '/prestationscontenu/24012026-Youth Code (6).jpg', alt: 'Photos 1', link: '/photos' },
  { src: '/prestationscontenu/24012026-Youth Code (2).jpg', alt: 'Photos 2', link: '/photos' },
  { src: '/prestationscontenu/24012026-Youth Code (1).jpg', alt: 'Photos 3', link: '/photos' },
];

const livesImages = [
  { src: '/prestationscontenu/24012026-Street Sects (6).jpg', alt: 'Lives 1', link: '/captations' },
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p1.jpg', alt: 'Lives 2', link: '/captations' },
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p2.jpg', alt: 'Lives 3', link: '/captations' },
];

const clipsImages = [
  { src: '/images/Revues/Buddy System/Buddy 1/buddy_1_p3.jpg', alt: 'Clips 1', link: '/clips' },
  { src: '/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_1.jpg', alt: 'Clips 2', link: '/clips' },
  { src: '/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_2.jpg', alt: 'Clips 3', link: '/clips' },
];

const carousels = [photosImages, livesImages, clipsImages];
const titles = ['Photos', 'Captations', 'Clips'];

export function Prestations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const carouselInnerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const targetYRef = useRef(0);
  const targetXRefs = useRef([0, 0, 0]);
  const currentYRef = useRef(0);
  const currentXRefs = useRef([0, 0, 0]);

  const lastYRef = useRef(-1);
  const lastXRef = useRef([-1, -1, -1]);

  // ✅ section active
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const getMaxScrollY = () => content.scrollHeight - window.innerHeight;
    const getMaxScrollX = (numImages: number) => (numImages - 1) * (window.innerWidth + 50);

    const animate = () => {
      // --- scroll vertical ---
      const diffY = targetYRef.current - currentYRef.current;
      currentYRef.current += Math.abs(diffY) > 0.1 ? diffY * LERP : diffY;

      const roundedY = Math.round(currentYRef.current * 100) / 100;
      if (roundedY !== lastYRef.current) {
        content.style.transform = `translateY(-${roundedY}px)`;
        lastYRef.current = roundedY;
      }

      // --- scroll horizontal ---
      for (let i = 0; i < 3; i++) {
        const diffX = targetXRefs.current[i] - currentXRefs.current[i];
        currentXRefs.current[i] += Math.abs(diffX) > 0.1 ? diffX * LERP : diffX;

        const roundedX = Math.round(currentXRefs.current[i] * 100) / 100;
        if (roundedX !== lastXRef.current[i]) {
          const el = carouselInnerRefs.current[i];
          if (el) el.style.transform = `translateX(-${roundedX}px)`;
          lastXRef.current[i] = roundedX;
        }
      }

      // ✅ LOGIQUE SIMPLE ET FIABLE
      const y = currentYRef.current;
      const sectionHeight = window.innerHeight;

      let index = 0;

      if (y > sectionHeight * 1.5) index = 2;
      else if (y > sectionHeight * 0.5) index = 1;
      else index = 0;

      if (index !== activeSection) {
        setActiveSection(index);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * SPEED;
      const maxY = getMaxScrollY();

      targetYRef.current = Math.max(0, Math.min(targetYRef.current + delta, maxY));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      style={{ background: 'rgb(15,15,15)' }}
    >
      {/* 🔥 TITRE FIXE */}
      <div className="fixed top-[18vh] left-[5vw] z-20 text-[4vh] font-bold transition-all duration-300 hover:scale-105">
        {titles[activeSection]}
      </div>

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
