import { SiteHeader } from '../components/SiteHeader';

export function Clips() {
  return (
    <div className="w-full min-h-screen bg-[rgb(15,15,15)] text-[rgb(250,250,250)] px-[10vh] py-[4vh] max-[1000px]:px-[5vh]">
      <div className="w-full flex justify-center">
        <SiteHeader title="Clips" showBack backTo="/prestations" />
      </div>

      <div className="mt-[4vh] flex gap-[5vh] max-[1000px]:flex-col max-[1000px]:gap-[3vh]">
        <div className="flex-[0_0_35%] sticky top-[35vh] h-fit max-[1000px]:relative max-[1000px]:top-auto max-[1000px]:flex-1">
          <h1 className="text-[2.5vh] mb-[1.5vh] leading-[1.4]">
            <b className="font-bold">Clips</b>
          </h1>
          <p className="text-[1.5vh] leading-[1.8] mb-[2vh]">Clips vidéo - À venir</p>
        </div>

        <div className="flex-1 flex flex-col gap-[3vh]">
          <p className="text-[1.5vh]">Contenu à venir...</p>
        </div>
      </div>
    </div>
  );
}
