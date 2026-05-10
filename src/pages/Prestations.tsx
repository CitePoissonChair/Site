<ImageCarousel
  images={photosImages}
  ref={(el) => {
    carouselRefs.current[0] = el;
  }}
/>

<ImageCarousel
  images={livesImages}
  ref={(el) => {
    carouselRefs.current[1] = el;
  }}
/>

<ImageCarousel
  images={clipsImages}
  ref={(el) => {
    carouselRefs.current[2] = el;
  }}
/>
