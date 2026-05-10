import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const SPEED = 1.1;
const LERP = 0.1;

const photosImages = [...];
const livesImages = [...];
const clipsImages = [...];

const carousels = [photosImages, livesImages, clipsImages];

export function Prestations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const targetY = useRef(0);
  const currentY = useRef(0);

  const currentSection = useRef(0);

  const currentX = useRef([0, 0, 0]);
  const targetX = useRef([0, 0, 0]);

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

      const section = currentSection.current;

      const isCarousel = section < carousels.length;

      // =========================
      // 1. CAROUSEL MODE (LOCKED)
      // =========================
      if (isCarousel) {
        const imagesCount = carousels[section].length;
        const maxX = (imagesCount - 1) * window.innerWidth;

        const current = targetX.current[section];
        const next = current + delta * 0.8;

        targetX.current[section] = Math.max(0, Math.min(next, maxX));

        // 🚨 IMPORTANT : on bloque vertical tant que pas fini
        const isAtEnd = targetX.current[section] >= maxX - 5;
        const isAtStart = targetX.current[section] <= 5;

        // si on arrive au bout et scroll vers le bas → section suivante
        if (isAtEnd && delta > 0) {
          currentSection.current++;
        }

        // si début et scroll vers le haut → section précédente
        if (isAtStart && delta < 0 && section > 0) {
          currentSection.current--;
        }

        return;
      }

      // =========================
      // 2. VERTICAL MODE
      // =========================
      const maxScroll = maxY();

      targetY.current = Math.max(
        0,
        Math.min(targetY.current + delta, maxScroll)
      );
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    refs.current[i] = el;
  };

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[rgb(15,15,15)] text-white">
      
      <div ref={contentRef} className="will-change-transform">

        <SiteHeader title="Prestations" showBack />
        <VideoHero />

        <div className="h-[10vh]" />

        <ImageCarousel images={photosImages} ref={setRef(0)} />

        <div className="h-[10vh]" />

        <ImageCarousel images={livesImages} ref={setRef(1)} />

        <div className="h-[10vh]" />

        <ImageCarousel images={clipsImages} ref={setRef(2)} />

        <div className="h-[20vh]" />

      </div>
    </div>
  );
}
