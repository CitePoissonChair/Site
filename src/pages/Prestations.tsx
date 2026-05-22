import { useEffect, useRef } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';
import { Link } from 'react-router-dom';

const LERP = 0.075;
const SPEED = 1.6;

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

export function Prestations() {
  const isMobile =
    typeof window !== 'undefined' &&
    window.innerWidth < 900;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const carouselRefs = useRef<Array<HTMLDivElement | null>>([
    null,
    null,
    null,
  ]);

  const sectionRefs = useRef<Array<HTMLElement | null>>([
    null,
    null,
    null,
  ]);

  const rafRef = useRef<number | null>(null);

  const targetYRef = useRef(0);
  const currentYRef = useRef(0);

  const targetXRefs = useRef([0, 0, 0]);
  const currentXRefs = useRef([0, 0, 0]);

  const setCarouselRef =
    (index: number) => (el: HTMLDivElement | null) => {
      carouselRefs.current[index] = el;
    };

  const setSectionRef =
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    };

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const getMaxScrollY = () =>
      content.scrollHeight - window.innerHeight;

    const getActiveCarousel = () => {
      const y = currentYRef.current;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];

        if (!section) continue;

        const top = section.offsetTop;
        const height = section.offsetHeight;

        const triggerStart =
          top - window.innerHeight * 0.35;

        const triggerEnd =
          top + height - window.innerHeight * 0.65;

        if (y >= triggerStart && y <= triggerEnd) {
          return i;
        }
      }

      return -1;
    };

    const animate = () => {
      currentYRef.current +=
        (targetYRef.current -
          currentYRef.current) *
        LERP;

      content.style.transform = `translate3d(0,-${currentYRef.current}px,0)`;

      carouselRefs.current.forEach((el, i) => {
        if (!el) return;

        currentXRefs.current[i] +=
          (targetXRefs.current[i] -
            currentXRefs.current[i]) *
          LERP;

        el.style.transform = `translate3d(-${currentXRefs.current[i]}px,0,0)`;
      });

      rafRef.current =
        requestAnimationFrame(animate);
    };

    rafRef.current =
      requestAnimationFrame(animate);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * SPEED;

      const maxY = getMaxScrollY();

      const activeCarousel =
        getActiveCarousel();

      // SCROLL NORMAL
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
        carouselRefs.current[activeCarousel];

      const section =
        sectionRefs.current[activeCarousel];

      if (!carousel || !section) return;

      const maxX =
        carousel.scrollWidth -
        window.innerWidth;

      const currentX =
        targetXRefs.current[activeCarousel];

      const atStart = currentX <= 2;
      const atEnd = currentX >= maxX - 2;

      const isForward = delta > 0;
      const isBackward = delta < 0;

      // IMPORTANT :
      // uniquement lock vertical
      // SI le horizontal peut encore bouger

      if (
        (isForward && !atEnd) ||
        (isBackward && !atStart)
      ) {
        // recentrage du carousel
        const centeredY =
          section.offsetTop -
          window.innerHeight / 2 +
          section.offsetHeight / 2;

        targetYRef.current = centeredY;

        targetXRefs.current[activeCarousel] =
          Math.max(
            0,
            Math.min(currentX + delta, maxX)
          );

        return;
      }

      // SINON :
      // on repasse en vertical normal
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

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  // MOBILE
  if (isMobile) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen text-white">
        <div className="flex justify-center pt-6 pb-10">
          <SiteHeader
            title="Prestations"
            showBack
          />
        </div>

        <div className="flex flex-col gap-8 px-4 pb-20">

          <Link
            to="/photos"
            className="relative block h-[72vh] overflow-hidden rounded-[3vh]"
          >
            <img
              src={photosImages[0].src}
              alt={photosImages[0].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-[5vh] font-bold tracking-wide text-center">
                PHOTOGRAPHIE
              </h2>
            </div>
          </Link>

          <Link
            to="/captations"
            className="relative block h-[72vh] overflow-hidden rounded-[3vh]"
          >
            <img
              src={livesImages[0].src}
              alt={livesImages[0].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-[5vh] font-bold tracking-wide text-center">
                CAPTATION LIVE
              </h2>
            </div>
          </Link>

          <Link
            to="/clips"
            className="relative block h-[72vh] overflow-hidden rounded-[3vh]"
          >
            <img
              src={clipsImages[0].src}
              alt={clipsImages[0].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-[5vh] font-bold tracking-wide text-center">
                VIDÉO
              </h2>
            </div>
          </Link>

        </div>
      </div>
    );
  }

  // DESKTOP
  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden bg-[#0f0f0f]"
    >
      <div
        ref={contentRef}
        className="will-change-transform"
      >
        <div className="flex justify-center pt-6">
          <SiteHeader
            title="Prestations"
            showBack
          />
        </div>

        <VideoHero />

        <section
          ref={setSectionRef(0)}
          className="mb-24"
        >
          <ImageCarousel
            images={photosImages}
            ref={setCarouselRef(0)}
          />
        </section>

        <section
          ref={setSectionRef(1)}
          className="mb-24"
        >
          <ImageCarousel
            images={livesImages}
            ref={setCarouselRef(1)}
          />
        </section>

        <section
          ref={setSectionRef(2)}
          className="pb-24"
        >
          <ImageCarousel
            images={clipsImages}
            ref={setCarouselRef(2)}
          />
        </section>
      </div>
    </div>
  );
}
