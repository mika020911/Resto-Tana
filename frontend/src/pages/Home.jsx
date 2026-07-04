import { useState } from "react";
import { restaurants, categories } from "../data/restaurant";
import RestaurantCard from "../components/RestaurantCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [categoriesActive, setCategoriesActive] = useState("Tout");

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.nom.toLowerCase().includes(search.toLowerCase()) ||
      r.quartier.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      categoriesActive === "Tout" || r.categorie === categoriesActive;
    return matchSearch && matchCat;
  });

  return (
    <main className="px-4 md:px-12 py-6">
      {/* Hero */}
      <div className="glass-card p-8 md:p-12 mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-dark mb-3">
          Trouver les meilleurs <br />
          <span className="text-orange-400">restaurants à Antananarivo</span>
        </h1>
        <p className="text-dark/90 mb-8">
          Découvrez et savourez les saveurs d'Antananarivo
        </p>

        {/* Barre de recherche */}
        <div className="flex items-center gap-3 bg-white/80 rounded-full px-4 py-3 max-w-lg mx-auto shadow-md">
          <span className="text-xl">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un restaurant, un quartier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-dark placeholder:text-dark/70 font-medium"
          />
        </div>
      </div>

      {/* Catégories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriesActive(cat.nom)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all text-sm ${
              categoriesActive === cat.nom
                ? "bg-dark text-white shadow-lg scale-105"
                : "glass-card text-dark hover:bg-white/80"
            }`}
          >
            <img src={cat.icon} alt={cat.nom} className="w-5 h-5 object-contain" />
            <span>{cat.nom}</span>
          </button>
        ))}
      </div>

      {/* Résultats */}
      <div className="mb-4">
        <h2 className="font-bold text-dark text-lg">
          {filtered.length} restaurant{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </h2>
      </div>

      {/* Liste des restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((resto) => (
          <RestaurantCard key={resto.id} resto={resto} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <span className="text-4xl">😕</span>
          <p className="text-dark/60 mt-4 font-medium">Aucun restaurant trouvé</p>
        </div>
      )}
    </main>
  );
}