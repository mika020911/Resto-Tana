export default function RestaurantCard({resto}){
    return(
        <div className="glass-card overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer">
            {/*photo*/}

            <div className=" relative h-48 overflow-hidden rounded-t-[20px]">
                <img 
                src={resto.photo} 
                alt={resto.nom} 
                className="w-full h-full object-cover" />
            
            <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-xs font-bold text-dark">
            {resto.tempsLivraison}
            </div>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-dark text-lg">{resto.nom}</h3>
                    <div className="flex items-center gap-1 text-sm">
                        <span>⭐</span>
                        <span className="font-bold text-dark">{resto.note}</span>
                        <span className="text-dark/40">({resto.avis})</span>
                    </div>
                </div>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-orange-100 text-orange-500 font-medium px-3 py-1 rounded-full">{resto.categorie}</span>
                <span className="text-xs text-dark/50 ">{resto.quartier}</span>
            </div>

            <p>{resto.description}</p>
            <button  className="w-full bg-dark text-white py-3 rounded-full font-semibold hover: opacity-90 transition-opacity text-sm">Voir le menu</button>
            </div>
        </div>
        
      
    )

}