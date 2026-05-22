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

  {
    src: '/prestationscontenu/Madame loyal (8).jpg',
    alt: 'Photos 2',
    label:
      'CONCERTS\nFESTIVALS\nPORTRAITS\nBACKSTAGE\nREPORTAGE',
    labelType: 'list',
    link: '/photos',
  },

  {
    src: '/prestationscontenu/Youth Code (1).jpg',
    alt: 'Photos 3',
    label: '',
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
    src: '/prestationscontenu/Madame loyal (9).jpg',
    alt: 'Lives 2',
    label:
      'LIVE SESSIONS\nMULTICAM\nCONCERTS\nÉVÉNEMENTS\nAFTERMOVIES',
    labelType: 'list',
    link: '/captations',
  },

  {
    src: '/prestationscontenu/Street Sects (2).jpg',
    alt: 'Lives 3',
    label: '',
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
    label: '',
    labelType: 'quote',
    link: '/clips',
  },
];

const carousels = [
  photosImages,
  livesImages,
  clipsImages,
];

export function Prestations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const carouselInnerRefs = useRef<
    Array<HTMLDivElement | null>
  >([null, null, null]);

  const rafRef = useRef<number | null>(null);

  const targetYRef = useRef(0);
  const currentYRef = useRef(0);

  const targetXRefs = useRef([0, 0, 0]);
  const currentXRefs = useRef([0, 0, 0]);

  const cachedOffsetsRef = useRef<
    { top: number; height: number }[]
  >([]);

  const setCarouselRef =
    (index: number) =>
    (el: HTMLDivElement | null) => {
      carouselInnerRefs.current[index] = el;
    };

  useEffect(() => {
    const isMobile = window.innerWidth < 900;

    if (isMobile) return;

    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const getMaxScrollY = () =>
      content.scrollHeight - window.innerHeight;

    const cacheOffsets = () => {
      const sections =
        content.querySelectorAll('[data-carousel]');

      cachedOffsetsRef.current = Array.from(sections).map(
        (el) => ({
          top: (el as HTMLElement).offsetTop,
          height: (el as HTMLElement).offsetHeight,
        })
      );
    };

    cacheOffsets();

    window.addEventListener('resize', cacheOffsets);

    const animate = () => {
      currentYRef.current +=
        (targetYRef.current - currentYRef.current) *
        LERP;

      content.style.transform = `
        translate3d(0,-${currentYRef.current}px,0)
      `;

      for (let i = 0; i < 3; i++) {
        currentXRefs.current[i] +=
          (targetXRefs.current[i] -
            currentXRefs.current[i]) *
          LERP;

        const el = carouselInnerRefs.current[i];

        if (el) {
          el.style.transform = `
            translate3d(-${currentXRefs.current[i]}px,0,0)
          `;
        }
      }

      rafRef.current =
        requestAnimationFrame(animate);
    };

    rafRef.current =
      requestAnimationFrame(animate);

    const getActiveCarousel = () => {
      const y = currentYRef.current;

      for (
        let i = 0;
        i < cachedOffsetsRef.current.length;
        i++
      ) {
        const section =
          cachedOffsetsRef.current[i];

        if (
          y >= section.top - 50 &&
          y < section.top + section.height - 50
        ) {
          return i;
        }
      }

      return -1;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * SPEED;

      const maxY = getMaxScrollY();

      const activeCarousel =
        getActiveCarousel();

      if (activeCarousel === -1) {
        targetYRef.current = Math.max(
          0,
          Math.min(
            targetYRef.current + delta,
            maxY
          )
        );

        return;
      }

      const carousel =
        carouselInnerRefs.current[
          activeCarousel
        ];

      if (!carousel) return;

      const maxX =
        carousel.scrollWidth -
        window.innerWidth;

      const currentX =
        targetXRefs.current[activeCarousel];

      if (delta > 0 && currentX < maxX) {
        targetXRefs.current[activeCarousel] =
          Math.min(currentX + delta, maxX);

        return;
      }

      if (delta < 0 && currentX > 0) {
        targetXRefs.current[activeCarousel] =
          Math.max(currentX + delta, 0);

        return;
      }

      targetYRef.current = Math.max(
        0,
        Math.min(
          targetYRef.current + delta,
          maxY
        )
      );
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
      className="
        h-screen
        overflow-y-auto
        md:overflow-hidden
        bg-[#0f0f0f]
      "
    >

      <div
        ref={contentRef}
        className="will-change-transform"
      >

        <div className="flex justify-center">
          <SiteHeader
            title="Prestations"
            showBack
          />
        </div>

        <VideoHero />

        <div
          data-carousel
          className="mb-[8vh]"
        >
          <ImageCarousel
            images={photosImages}
            ref={setCarouselRef(0)}
          />
        </div>

        <div
          data-carousel
          className="mb-[8vh]"
        >
          <ImageCarousel
            images={livesImages}
            ref={setCarouselRef(1)}
          />
        </div>

        <div
          data-carousel
          className="pb-[10vh]"
        >
          <ImageCarousel
            images={clipsImages}
            ref={setCarouselRef(2)}
          />
        </div>

      </div>
    </div>
  );
}
