import { useParams } from "react-router-dom";
import { restaurants } from "../data/restaurant";

export default function Restaurant() {
  const { id } = useParams();
  const resto = restaurants.find((r) => r.id === parseInt(id));

  if (!resto) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl">😕</span>
        <p className="text-dark/60 mt-4 font-medium text-2xl">Restaurant introuvable</p>
      </div>
    );
  }

  return (
    <main className="px-4 md:px-12 py-6">
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-6">
                <img
                src={resto.photo}
                alt={resto.nom}
                className="w-full h-full object-cover"
                />
                <div classname="absolute inset-0 bg-black/30"/> 
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-extrabold">{resto.nom}</h1>
                  <p className="text-white/80 mt-1">{resto.adresse}</p>
                </div> 
            </div>
            {/* Info rapide*/}
            <div className="glass-card p-5 mb-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span className="font-bold text-dark">{resto.note}</span>
                <span className="text-dark/40">({resto.avis} avis)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span className="text-dark/70">{resto.tempsLivraison}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-orange-100 text-orange-500 font-medium px-3 py-1 rounded-full">{resto.categorie}</span>
              </div>
            </div>
            {/* Description */}
            <div className="glass-card p-5 mb-6">
              <h2 className="font-bold text-dark text-lg mb-2">
                A propos
              </h2>
              <p className="text-dark/70 leading-relaxed ">{resto.description}</p>

            </div>
            {/* Menu */}
           <div className="glass-card p-5">
            <h2 className="font-bold text-dark text-lg mb-4">Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resto.menu.map((plat) =>(
                <div
                key={plat.id} 
                className="flex items-center justify-between bg-white/60 rounded-2xl p-4">
                  <div>
                  <p className="font-semibold text-dark">{plat.nom}</p>
                  <p className="text-dark/50 text-sm">{plat.description}</p>
                  <span className="text-xs bg-orange-100 text-orange-500 font-medium px-2 py-1 rounded-full mt-1 inline-block">{plat.categorie}
                  </span>
                  </div>
                  <p className="font-bold text-dark ml-4 whitespace-nowrap">{plat.prix.toLocaleString()} Ar</p>
                </div>
                
              ))}
            </div>

           </div>
    </main>
  );
}