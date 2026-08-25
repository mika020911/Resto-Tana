import { useParams } from "react-router-dom";
import { fetchRestaurantById } from "../services/api";
import { useEffect, useState } from "react";

export default function Restaurant() {
  const {id} = useParams ();
  const [resto , setResto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState (false);
  

  useEffect(()=>{
    async function loadData() {
      try {
        const data = await fetchRestaurantById(id);
        setResto(data);
      }catch (err){
        console.error(err);
        setError(true);
      }finally{
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return(<main className="px-4 md:px-12 py-6 text-center">Chargement en cours</main>)
  }
  if(error || !resto){
    return (
      <div className="text-center py-20">
        <span className="text-5xl">😕</span>
        <p className="text-dark/60 mt-4 font-medium text-2xl">Restaurant introuvable</p>
      </div>
    );
  }
const photo = resto.photo_upload_path || resto.photo_url;
  return (
    <main className="px-4 md:px-12 py-6">
      
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-6">
                <img
                src={photo}
                alt={resto.nom}
                className="w-full h-full object-cover"
                />
                <div classname="absolute inset-0 bg-black/30"/> 
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-extrabold" >{resto.nom}</h1>
                  <p className="text-white/80 mt-1">{resto.adresse}</p>
                </div> 
            </div>
            {/* Info rapide*/}
            <div className="glass-card p-5 mb-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span className="font-bold text-dark">{Number(resto.note_moyenne).toFixed(1)}</span>
                <span className="text-dark/40">({resto.nombre_avis} avis)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span className="text-dark/70">{resto.temps_livraiseon}</span>
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
           {/* Avis */}
           <div className="glass-card p-5 mt-6">
            <h2 className="font-bold text-dark text-lg mb-4"> Avis et commentaires</h2>
              
              {/* Etoile */}
              <div className="space-y-3 mb-4">
                {resto.reviews.length === 0 && (
                  <p className="text-dark/50 text-sm">Aucun Avis pour le moment</p>
                )}
               {resto.reviews.map((rev)=>(
                <div key={rev.id} className="bg-white/60 rounded-xl p-3">
                  <span className="text-orange-500 font-bold ">{"⭐".repeat(rev.note)}</span>
                  {rev.commentaire && <p className="text-dark/70 text-sm mt-1">{rev.commentaire}</p>}
                </div>
               ))}
              </div>

              {/* Nom 
              <input
              type="text"
              placeholder="Votre nom"
              className="w-full bg-white/60 rounded-xl px-4 py-3 mt-3 mb-3 outline-none text-dark placeholder:text-dark/40 "
              />*/}
              {/* Commentaire 
              <textarea
              placeholder="Votre commentaires ...."
               rows={3}     
                className="w-full bg-white/60 rounded-xl px-4 py-3 outline-none text-dark placeholder;text-dark/40 resize-none"
              />

              
              <button className="bg-dark text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity mt-3">
                Envoyer l'avis 
              </button>
              */}

           </div>

    </main>
  );
}