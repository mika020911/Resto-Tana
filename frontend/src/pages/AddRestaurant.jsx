import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResto, uploadPhotoResto } from "../services/api";

export default function AddRestaurant() {
  const [form, setForm] = useState({
    nom: "", quartier: "", adresse: "", categorie_id: "", description: "", temps_livraiseon: "",
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <p className="text-center py-20">Vous devez être connecté pour ajouter un restaurant.</p>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const resto = await createResto(form, token);
      if (photo) {
        await uploadPhotoResto(resto.id, photo, token);
      }
      navigate(`/restaurant/${resto.id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="px-4 md:px-12 py-12 max-w-lg mx-auto">
      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold text-dark mb-6">Ajouter un restaurant</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nom" placeholder="Nom du restaurant" value={form.nom} onChange={handleChange}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none" required />
          <input name="quartier" placeholder="Quartier" value={form.quartier} onChange={handleChange}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none" required />
          <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none" required />
          <input name="categorie_id" type="number" placeholder="ID catégorie" value={form.categorie_id} onChange={handleChange}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}
            className="w-full bg-white/80 rounded-2xl px-4 py-3 outline-none" rows={3} />
          <input name="temps_livraiseon" placeholder="Temps de livraison (ex: 30-45 min)" value={form.temps_livraiseon} onChange={handleChange}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none" />
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full bg-white/80 rounded-full px-4 py-3" />
          <button type="submit" className="w-full bg-dark text-white py-3 rounded-full font-semibold">
            Créer le restaurant
          </button>
        </form>
      </div>
    </main>
  );
}