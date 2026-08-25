const API_URL = "http://localhost:5000/api";

export async function fetchRestaurants() {
  const res = await fetch(`${API_URL}/restaurants`);
  if (!res.ok) throw new Error("Erreur lors du chargement des restaurants");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Erreur lors du chargement des catégories");
  return res.json();
}

export async function fetchRestaurantById(id){
const res = await fetch(`${API_URL}/restaurants/${id}`);
if (!res.ok) throw new Error (" error whwne loading restaurant");
return res.json();
}