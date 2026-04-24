import { useState } from 'react';

export function VideoHero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="flex justify-center items-center w-full h-screen relative">
      <div className="w-full h-full flex justify-center items-center">
        {!videoError ? (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=dQw4w9WgXcQ&fs=0&rel=0&showinfo=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full block border-0 p-0 m-0"
            style={{ pointerEvents: 'none' }}
            onError={() => setVideoError(true)}
          />
        ) : (
          <p className="text-[rgb(250,250,250)] text-center mt-[20px]">
            La vidéo n'est pas disponible. Vérifiez que la vidéo YouTube peut être partagée.
          </p>
        )}
      </div>
    </section>
  );
}
