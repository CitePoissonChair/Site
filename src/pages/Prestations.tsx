import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

const LERP = 0.08;
const SPEED = 1.8;

const photosImages = [
  {
    src: '/prestationscontenu/Cisnienie (1).jpg',
    alt: 'Photos 1',
    label: 'PHOTOGRAPHIE',
    link: '/photos',
  },

  // IMAGE 2 → LISTE PRESTATIONS
  {
    src: '/prestationscontenu/Madame loyal (8).jpg',
    alt: 'Photos 2',
    label:
      'CONCERTS\nFESTIVALS\nPORTRAITS\nBACKSTAGE\nREPORTAGE',
    labelType: 'list',
    link: '/photos',
  },

  // IMAGE 3 → TEXTE ÉMOTIONNEL
  {
    src: '/prestationscontenu/Youth Code (1).jpg',
    alt: 'Photos 3',
    label:
      '',
    labelType: 'quote',
    link: '/photos',
  },
];

const livesImages = [
  {
    src: '/prestationscontenu/Madame loyal (5).jpg',
    alt: 'Lives 1',
    label: 'CAPTATION LIVE',
    link: '/captations',
  },

  {
    src: 'public/prestationscontenu/Madame.jpg',
    alt: 'Lives 2',
    label:
      'LIVE SESSIONS\nMULTICAM\nCONCERTS\nÉVÉNEMENTS\nAFTERMOVIES',
    labelType: 'list',
    link: '/captations',
  },

  {
    src: '/prestationscontenu/Street Sects (2).jpg',
    alt: 'Lives 3',
    label:
      '',
    labelType: 'quote',
    link: '/captations',
  },
];

const clipsImages = [
  {
    src: '/prestationscontenu/Clip father of sins.gif',
    alt: 'Clips 1',
    label: 'VIDÉO',
    link: '/clips',
  },

  {
    src: '/prestationscontenu/Clip father of sins.gif',
    alt: 'Clips 2',
    label:
      'CLIPS\nSOCIAL CONTENT\nDIRECTION ARTISTIQUE',
    labelType: 'list',
    link: '/clips',
  },

  {
    src: '/prestationscontenu/Clip father of sins.gif',
    alt: 'Clips 3',
    label:
      '',
    labelType: 'quote',
    link: '/clips',
  },
];

const carousels = [photosImages, livesImages, clipsImages];

export function Prestations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const carouselInnerRefs = useRef<Array<HTMLDivElement | null>>([
    null,
    null,
    null,
  ]);

  const targetYRef = useRef(0);
  const targetXRefs = useRef([0, 0, 0]);

  const currentYRef = useRef(0);
  const currentXRefs = useRef([0, 0, 0]);

  const cachedOffsetsRef = useRef<{ top: number; height: number }[]>(
    []
  );

  const setCarouselRef =
    (index: number) => (el: HTMLDivElement | null) => {
      carouselInnerRefs.current[index] = el;
    };

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const getMaxScrollY = () =>
      content.scrollHeight - window.innerHeight;

    const getMaxScrollX = (numImages: number) =>
      (numImages - 1) * (window.innerWidth + 50);

    const cacheOffsets = () => {
      const children = content.children;

      cachedOffsetsRef.current = [2, 3, 4].map((i) => {
        const el = children[i] as HTMLElement;

        return {
          top: el.offsetTop,
          height: el.offsetHeight,
        };
      });
    };

    cacheOffsets();

    window.addEventListener('resize', cacheOffsets);

    const getActiveCarousel = () => {
      const y = currentYRef.current;
      const offsets = cachedOffsetsRef.current;

      for (let i = 0; i < offsets.length; i++) {
        const { top, height } = offsets[i];

        if (y >= top - 2 && y < top + height - 2) {
          return i;
        }
      }

      return -1;
    };

    const animate = () => {
      const diffY =
        targetYRef.current - currentYRef.current;

      currentYRef.current += diffY * LERP;

      content.style.transform = `translateY(-${currentYRef.current}px)`;

      for (let i = 0; i < 3; i++) {
        const diffX =
          targetXRefs.current[i] -
          currentXRefs.current[i];

        currentXRefs.current[i] += diffX * LERP;

        const el = carouselInnerRefs.current[i];

        if (el) {
          el.style.transform = `translateX(-${currentXRefs.current[i]}px)`;
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
        targetYRef.current = Math.max(
          0,
          Math.min(targetYRef.current + delta, maxY)
        );

        return;
      }

      const offsets = cachedOffsetsRef.current;

      const numImages =
        carousels[carouselIndex].length;

      const maxX = getMaxScrollX(numImages);

      const currentX =
        targetXRefs.current[carouselIndex];

      if (delta > 0 && currentX < maxX) {
        targetYRef.current =
          offsets[carouselIndex].top;

        targetXRefs.current[carouselIndex] =
          Math.min(currentX + delta, maxX);
      } else if (delta < 0 && currentX > 0) {
        targetYRef.current =
          offsets[carouselIndex].top;

        targetXRefs.current[carouselIndex] =
          Math.max(currentX + delta, 0);
      } else {
        targetYRef.current = Math.max(
          0,
          Math.min(targetYRef.current + delta, maxY)
        );
      }
    };

    container.addEventListener(
      'wheel',
      handleWheel,
      { passive: false }
    );

    return () => {
      container.removeEventListener(
        'wheel',
        handleWheel
      );

      window.removeEventListener(
        'resize',
        cacheOffsets
      );

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      style={{ background: 'rgb(15,15,15)' }}
    >
      <div
        ref={contentRef}
        className="will-change-transform"
      >
        <div className="flex flex-col items-center">
          <SiteHeader
            title="Prestations"
            showBack
          />
        </div>

        <VideoHero />

        <div className="mb-10">
          <ImageCarousel
            images={photosImages}
            ref={setCarouselRef(0)}
          />
        </div>

        <div className="mb-10">
          <ImageCarousel
            images={livesImages}
            ref={setCarouselRef(1)}
          />
        </div>

        <div className="mb-10">
          <ImageCarousel
            images={clipsImages}
            ref={setCarouselRef(2)}
          />
        </div>
      </div>
    </div>
  );
}
