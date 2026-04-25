import { SiteHeader } from '../components/SiteHeader';

export function APropos() {
  return (
    <div className="min-h-screen bg-[rgb(15,15,15)] flex flex-col items-center px-[4vw] py-[4vh]">
      <SiteHeader title="À propos" showBack />
      <div className="max-w-[60ch] mt-[4vh] flex flex-col gap-[2.5vh] text-[rgb(220,220,220)] text-[1.8vh] leading-relaxed">
        <p>
          Cité Poisson-Chair est un collectif artistique basé à Paris, explorant les croisements entre les disciplines artistiques.
        </p>
        <p>
          À travers ses projets, le collectif mêle écriture, image et son. Chaque création est pensée comme un espace de rencontre — entre les corps, les médiums et les imaginaires.
        </p>
        <p>
          Cité Poisson-Chair publie la revue <em>Buddy System</em>, un fanzine qui réunit des contributions écrites et visuelles autour de thèmes traversant la corporalité, la transformation et le collectif. La revue est disponible à la commande en ligne.
        </p>
        <p>
          Le collectif intervient également en tant que prestataire dans le domaine de la photographie de concert et de la captation de lives et de performances scéniques.
        </p>
      </div>
    </div>
  );
}
