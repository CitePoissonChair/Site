import { SiteHeader } from '../components/SiteHeader';

const photos = [
  '/prestationscontenu/Madame loyal (6).jpg',
  '/prestationscontenu/Youth Code (3).jpg',
  '/prestationscontenu/Madame loyal (4).jpg',
  '/prestationscontenu/Author & Punisher (1).jpg',
  '/prestationscontenu/King Yosef (1).jpg',
  '/prestationscontenu/Cisnienie (2).jpg',
  '/prestationscontenu/Madame loyal (2).jpg',
  '/prestationscontenu/Cisnienie (4).jpg',
];

export function Photos() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* background glow */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[-20vh] left-[-10vw] w-[40vw] h-[40vw] bg-white blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 px-[3vh] py-[3vh]">
        <div className="flex justify-center mb-[6vh]">
          <SiteHeader title="Photos" showBack backTo="/prestations" />
        </div>

        {/* gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-[1.5vh] space-y-[1.5vh]">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[2.5vh]
                break-inside-avoid
                cursor-pointer
              "
            >
              {/* image */}
              <img
                src={photo}
                alt=""
                className="
                  w-full
                  object-cover
                  transition-all
                  duration-500
                  group-hover:scale-[1.03]
                  group-hover:brightness-110
                "
              />

              {/* overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

              {/* subtle border glow */}
              <div className="absolute inset-0 rounded-[2.5vh] border border-white/0 group-hover:border-white/10 transition duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
