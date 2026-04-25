import { SiteHeader } from '../components/SiteHeader';

export function BuddySystem1() {
  return (
    <div className="w-full min-h-screen bg-[rgb(15,15,15)] text-[rgb(250,250,250)] px-[10vh] py-[4vh] max-[1000px]:px-[5vh]">
      <div className="w-full flex justify-center">
        <SiteHeader title="Buddy System n°1" showBack />
      </div>

      <div className="mt-[4vh] flex gap-[5vh] max-[1000px]:flex-col max-[1000px]:gap-[3vh]">
        <div className="flex-[0_0_35%] sticky top-[35vh] h-fit max-[1000px]:relative max-[1000px]:top-auto max-[1000px]:flex-1">
          <h1 className="text-[2.5vh] mb-[1.5vh] leading-[1.4]">
            <b className="font-bold">Buddy System n°1</b>
            <br />
            <i className="italic block mt-[1vh] text-[2vh]"></i>
          </h1>
          <br />
          <p className="text-[1.5vh] leading-[1.8] mb-[2vh]">
            Des corps et des cadavres
            <br /><br />
            <i className="italic block mt-[1vh] text-[1.3vh]">
              Avec des contributions de :
              <br />
              Amaury Hardré
              <br />
              Virgile Mollat
              <br />
              Margaux Tailame
              <br />
              Alexandre Lécroart
              <br />
              Raoul Deloffre
            </i>
          </p>
          <p className="text-[1.5vh] leading-[1.8] mb-[2vh]">
          
          </p>
          <a
            href="https://www.helloasso.com/associations/cite-poisson-chair/boutiques/cite-poisson-chair"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-[2vh] text-[1.5vh] text-[rgb(250,250,250)] border border-[rgb(250,250,250)] px-[1.5vh] py-[0.8vh] hover:bg-[rgb(250,250,250)] hover:text-[rgb(15,15,15)] transition-colors duration-200"
          >
            Commander le fanzine
          </a>
        </div>

        <div className="flex-1 flex flex-col gap-[3vh]">
          <img className="w-full object-contain cursor-default" src="/images/Revues/Buddy System/Couvertures/Couv_1.jpg" alt="Buddy System 1 - Couverture" />
          <img className="w-full object-contain cursor-default" src="/images/Revues/Buddy System/Buddy 1/buddy_1_p1.jpg" alt="Buddy System 1 - Image 1" />
          <img className="w-full object-contain cursor-default" src="/images/Revues/Buddy System/Buddy 1/buddy_1_p2.jpg" alt="Buddy System 1 - Image 2" />
          <img className="w-full object-contain cursor-default" src="/images/Revues/Buddy System/Buddy 1/buddy_1_p3.jpg" alt="Buddy System 1 - Image 3" />
        </div>
      </div>
    </div>
  );
}
