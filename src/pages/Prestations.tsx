import { Logo } from '../components/Logo';
import { VideoHero } from '../components/VideoHero';
import { ImageCarousel } from '../components/ImageCarousel';
import '../styles/Prestations.css';

export function Prestations() {
  const photosImages = [
    {
      src: '/prestationscontenu/24012026-Youth Code (6).jpg',
      alt: 'Photos 1',
      label: 'Photos',
      labelClass: 'titre-style',
      link: '/photos',
    },
    {
      src: '/prestationscontenu/24012026-Youth Code (2).jpg',
      alt: 'Photos 2',
      link: '/photos',
    },
    {
      src: '/prestationscontenu/24012026-Youth Code (1).jpg',
      alt: 'Photos 3',
      link: '/photos',
    },
  ];

  const livesImages = [
    {
      src: '/prestationscontenu/24012026-Street Sects (6).jpg',
      alt: 'Lives 1',
      label: 'Lives',
      labelClass: 'label',
      link: '/captations',
    },
    {
      src: '/images/buddy_1_p1.jpg',
      alt: 'Lives 2',
      link: '/captations',
    },
    {
      src: '/images/buddy_1_p2.jpg',
      alt: 'Lives 3',
      link: '/captations',
    },
  ];

  const clipsImages = [
    {
      src: '/images/buddy_1_p3.jpg',
      alt: 'Clips 1',
      label: 'Clips',
      labelClass: 'label',
      link: '/clips',
    },
    {
      src: '/images/CPC_station_soleil_bleu_1.jpg',
      alt: 'Clips 2',
      link: '/clips',
    },
    {
      src: '/images/CPC_station_soleil_bleu_2.jpg',
      alt: 'Clips 3',
      link: '/clips',
    },
  ];

  return (
    <div className="prestations-page">
      <Logo />

      <VideoHero />

      <section id="categories_section">
        <div className="category-wrapper">
          <ImageCarousel images={photosImages} />
        </div>

        <div className="category-wrapper">
          <ImageCarousel images={livesImages} />
        </div>

        <div className="category-wrapper">
          <ImageCarousel images={clipsImages} />
        </div>
      </section>
    </div>
  );
}
