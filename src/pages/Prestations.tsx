import { SiteHeader } from '../components/SiteHeader';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';

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

export function Prestations() {
  return (
    <div className="bg-[rgb(15,15,15)] text-white">

      <SiteHeader title="Prestations" showBack />

      {/* HERO */}
      <VideoHero />

      {/* SECTION 1 */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold">Scroll ↓</h1>
      </section>

      {/* SECTION 2 - HORIZONTAL */}
      <section>
        <ImageCarousel images={photosImages} />
      </section>

      {/* SECTION 3 - HORIZONTAL */}
      <section>
        <ImageCarousel images={livesImages} />
      </section>

      {/* SECTION 4 - HORIZONTAL */}
      <section>
        <ImageCarousel images={clipsImages} />
      </section>

      {/* END */}
      <section className="h-[40vh]" />
    </div>
  );
}
