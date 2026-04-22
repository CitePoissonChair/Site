import { useState } from 'react';

export function VideoHero() {
  const [videoError, setVideoError] = useState(false);

  const handleIframeError = () => {
    setVideoError(true);
  };

  return (
    <section id="video_hero_section">
      <div id="video_container">
        {!videoError ? (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=dQw4w9WgXcQ&fs=0&rel=0&showinfo=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ pointerEvents: 'none' }}
            onError={handleIframeError}
          />
        ) : (
          <p id="video-error" style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
            La vidéo n'est pas disponible. Vérifiez que la vidéo YouTube peut être partagée.
          </p>
        )}
      </div>
    </section>
  );
}
