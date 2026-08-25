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

export async function registerUser (nom , email, mot_de_passe){
  const res = await fetch(`${API_URL}/auth/register`,{
    method: "POST",
    headers : {"Content-type":"application/json"},
    body:JSON.stingify({nom, email, mot_de_passe}),
  });

  const data = await res.json();
  if (!res.ok) throw new Error (data.message || "Register error");
  return data;
}
export async function loginUser (email, mot_de_passe){
  const res = await fetch (`${API_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stingify({email, mot_de_passe}), 
  });
  const data = await res.json();
  if (!res.ok) throw new Error (data.massege || "Login error");
  return data;
}

//appeler api pour ....
export async function createResto(payload, token) {
const res = await fetch (`${API_URL}/restaurant`, {
  method:"POST",
  headers: {
    "Content-type":"application/json", 
  Authorization: `Bearer ${token}`},
  body:JSON.stringify(payload),

});
const data = await res.json();
if(!res.ok) throw new Error (data.message || "Error creating Resto");
return data;
}

export async function uploadPhotoResto (restaurantID, file, token) {
  const res = await fetch (`${API_URL}/restaurant/${restaurantID}/photo`, {
    methode: "POST",
    headers: {
      Authorization: `Bearer ${token}`},
      body:FormData,
  });
  const data = await res.json();
  if(!res.ok) throw new Error (data.message || "error uploading photo");
  return data;
}