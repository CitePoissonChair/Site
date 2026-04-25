import { SiteHeader } from '../components/SiteHeader';

export function StationSoleilBleu() {
  return (
    <div className="w-full min-h-screen bg-[rgb(15,15,15)] text-[rgb(250,250,250)] px-[10vh] py-[4vh] max-[1000px]:px-[5vh]">
      <div className="w-full flex justify-center">
        <SiteHeader title="Station Soleil Bleu" showBack />
      </div>

      <div className="mt-[4vh] flex gap-[5vh] max-[1000px]:flex-col max-[1000px]:gap-[3vh]">
        <div className="flex-[0_0_35%] sticky top-[35vh] h-fit max-[1000px]:relative max-[1000px]:top-auto max-[1000px]:flex-1">
          <h1 className="text-[2.5vh] mb-[1.5vh] leading-[1.4]">
            <b className="font-bold">Station Soleil Bleu</b>
            <br />
            <i className="italic block mt-[1vh] text-[2vh]"></i>
          </h1>
          <br />
          <p className="text-[1.5vh] leading-[1.8] mb-[2vh]">
        Station orbitale 4F, dans un futur lointain. 
        Rues aussi immenses que dépeuplées, marche de l’histoire à l’arrêt. 
        Des sectes étranges prêchent la fin des temps, la pluie acide tombe à torrents. 
        Un journaliste en exil, tout juste débarqué, se réfugie dans un café. Là, un vieillard écrit, frénétiquement. 
        Pourquoi refuse-t-il obstinément d’être lu ? Et surtout, pourquoi un marginal comme lui recevrait-il la visite d’un grand ponte de la 4F ? 
        C’en est assez, quand on est en mal de scoop, pour se décider à enquêter. 
        S’ouvre alors, pour le nouvel arrivant, un abîme où langage, vérité et croyances se télescopent. 
        Une chose est sûre : si l’avenir est cadenassé, le mystérieux vieillard est persuadé d’en détenir la clef.
            <br /><br />
            <i className="italic block mt-[1vh] text-[1.3vh]">
              Un livre d'Alexandre Lécroart
              <br />
              
            </i>
          </p>
          <p className="text-[1.5vh] leading-[1.8] mb-[2vh]">
           246 pages avec 13 illustrations, 18 euros (version physique) - 4 euros (version numérique)
          </p>
            <a
            href="https://www.helloasso.com/associations/cite-poisson-chair/boutiques/cite-poisson-chair"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-[2vh] text-[1.5vh] text-[rgb(250,250,250)] border border-[rgb(250,250,250)] px-[1.5vh] py-[0.8vh] hover:bg-[rgb(250,250,250)] hover:text-[rgb(15,15,15)] transition-colors duration-200"
          >
            Commander le livre
          </a>
        </div>

        <div className="flex-1 flex flex-col gap-[3vh]">
          <img className="w-full object-contain cursor-default" src="/images/Ecrits/Station Soleil Bleu/Couvertures/station_soleil_bleu_couv.png" alt="Station Soleil Bleu - Couverture" />
          <img className="w-full object-contain cursor-default" src="/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_1.jpg" alt="Station Soleil Bleu - Image 1" />
          <img className="w-full object-contain cursor-default" src="/images/Ecrits/Station Soleil Bleu/Contenus/CPC_station_soleil_bleu_2.jpg" alt="Station Soleil Bleu - Image 2" />
        </div>
      </div>
    </div>
  );
}
