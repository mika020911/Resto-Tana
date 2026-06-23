import nouritureIcon from "../assets/nouriture.png";
import MalagasyIcon from "../assets/madagascar.png";
import CroissantIcon  from "../assets/croissant.png";
import gastroIcon from "../assets/ratatouille.png";
import asieIcon from "../assets/sushi.png";
import grillageIcon from "../assets/viande-grillee.png";
import brasserieIcon from "../assets/brassage-maison.png";

export const restaurants = [
  {
    id: 1,
    nom: "La Varangue",
    quartier: "Antanimena",
    adresse: "17 Rue Printsy Ratsimamanga, Antanimena",
    categorie: "Cuisine Française",
    description: "Institution gastronomique d'Antananarivo, cuisine française raffinée aux accents malgaches dans un cadre colonial chargé d'histoire.",
    note: 4.8,
    avis: 312,
    tempsLivraison: "30-45 min",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    menu: [
      { id: 1, nom: "Foie Gras Maison", prix: 45000, description: "Foie gras artisanal aux épices malgaches", categorie: "Entrées" },
      { id: 2, nom: "Pièce de Zébu", prix: 55000, description: "Zébu grillé sauce au poivre vert", categorie: "Plats" },
      { id: 3, nom: "Dessert du Chef", prix: 20000, description: "Création du jour aux fruits locaux", categorie: "Desserts" },
    ]
  },
  {
    id: 2,
    nom: "Sakamanga",
    quartier: "Antaninarenina",
    adresse: "Rue Andrianary Ratianarivo, Antaninarenina",
    categorie: "Cuisine Malgache",
    description: "Restaurant emblématique proposant une cuisine inventive mêlant traditions malgaches et influences internationales. Cadre atypique et hospitalité chaleureuse.",
    note: 4.6,
    avis: 245,
    tempsLivraison: "25-35 min",
    photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    menu: [
      { id: 1, nom: "Romazava", prix: 18000, description: "Plat national malgache, bouillon de viande aux brèdes", categorie: "Plats" },
      { id: 2, nom: "Ravitoto", prix: 16000, description: "Feuilles de manioc pilées au porc", categorie: "Plats" },
      { id: 3, nom: "Lasopy Gasy", prix: 8000, description: "Soupe traditionnelle malgache", categorie: "Entrées" },
    ]
  },
  {
    id: 3,
    nom: "Le Marais",
    quartier: "Ankorondrano",
    adresse: "Immeuble Atrium, Ankorondrano",
    categorie: "Gastronomique",
    description: "Restaurant gastronomique dans le quartier des affaires. Le chef Lalaina propose des plats innovants avec les saveurs de Madagascar.",
    note: 4.5,
    avis: 99,
    tempsLivraison: "30-40 min",
    photo: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800",
    menu: [
      { id: 1, nom: "Caviar du Rova", prix: 65000, description: "Caviar local, spécialité de la maison", categorie: "Entrées" },
      { id: 2, nom: "Canard Malgache", prix: 48000, description: "Magret de canard aux épices locales", categorie: "Plats" },
      { id: 3, nom: "Moelleux Vanille", prix: 18000, description: "Moelleux à la vanille de Madagascar", categorie: "Desserts" },
    ]
  },
  {
    id: 4,
    nom: "La Plantation",
    quartier: "Ankorondrano",
    adresse: "Ruelle derrière l'hôtel Ibis, Ankorondrano",
    categorie: "Brasserie Française",
    description: "Belle terrasse verdoyante dans le quartier des affaires. Cuisine brasserie de qualité, service rapide. Incontournable pour un déjeuner d'affaires.",
    note: 4.4,
    avis: 178,
    tempsLivraison: "20-30 min",
    photo: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
    menu: [
      { id: 1, nom: "Salade César au Zébu", prix: 22000, description: "Salade fraîche avec viande de zébu grillée", categorie: "Entrées" },
      { id: 2, nom: "Foie Gras Maison", prix: 38000, description: "Foie gras artisanal de la ferme", categorie: "Entrées" },
      { id: 3, nom: "Pièce de Zébu Grillée", prix: 42000, description: "500g de zébu grillé, frites maison", categorie: "Plats" },
    ]
  },
  {
    id: 5,
    nom: "Grand Orient",
    quartier: "Ivandry",
    adresse: "Quartier résidentiel d'Ivandry",
    categorie: "Cuisine Asiatique",
    description: "Destination culinaire délicieuse dans le quartier le plus prestigieux de Tana. Cuisine chinoise authentique dans un cadre calme et élégant.",
    note: 4.7,
    avis: 203,
    tempsLivraison: "30-45 min",
    photo: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    menu: [
      { id: 1, nom: "Sushis Assortis", prix: 35000, description: "12 pièces de sushis variés", categorie: "Entrées" },
      { id: 2, nom: "Canard Laqué", prix: 45000, description: "Canard laqué à la pékinoise", categorie: "Plats" },
      { id: 3, nom: "Riz Cantonnais", prix: 18000, description: "Riz sauté aux légumes et œufs", categorie: "Accompagnements" },
    ]
  },
  {
    id: 6,
    nom: "Le Buffet du Jardin",
    quartier: "Antaninarenina",
    adresse: "Place Colbert, Antaninarenina",
    categorie: "Cuisine Française",
    description: "Institution depuis plus de 40 ans. Trône sur la place Colbert. Une adresse incontournable pour un goûter ou un repas dans le centre-ville.",
    note: 4.3,
    avis: 421,
    tempsLivraison: "20-30 min",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    menu: [
      { id: 1, nom: "Croque-Monsieur", prix: 12000, description: "Pain grillé, jambon, fromage fondu", categorie: "Snacks" },
      { id: 2, nom: "Steak Frites", prix: 28000, description: "Steak de bœuf, frites maison", categorie: "Plats" },
      { id: 3, nom: "Mille-feuille Maison", prix: 10000, description: "Pâtisserie française classique", categorie: "Desserts" },
    ]
  },
  {
    id: 7,
    nom: "Le Grill du Rova",
    quartier: "Haute Ville",
    adresse: "Près du Palais de la Reine, Haute Ville",
    categorie: "Grillades",
    description: "Vue panoramique sur la ville et la plaine de Tana. Grillades, salades et plats malgaches savourés en terrasse avec un panorama exceptionnel.",
    note: 4.2,
    avis: 156,
    tempsLivraison: "25-35 min",
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    menu: [
      { id: 1, nom: "Brochettes de Zébu", prix: 22000, description: "Brochettes marinées aux herbes", categorie: "Grillades" },
      { id: 2, nom: "Côte de Porc Grillée", prix: 25000, description: "Côte de porc avec légumes du jour", categorie: "Grillades" },
      { id: 3, nom: "Salade Fraîche", prix: 10000, description: "Salade de saison aux légumes locaux", categorie: "Entrées" },
    ]
  },
  {
    id: 8,
    nom: "Viko Viko",
    quartier: "Andraharo",
    adresse: "Quartier Andraharo, Antananarivo",
    categorie: "Cuisine Malgache",
    description: "Endroit charmant à l'atmosphère chaleureuse et accueillante. Le duo qui gère l'établissement salue personnellement chaque client.",
    note: 4.5,
    avis: 134,
    tempsLivraison: "20-30 min",
    photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    menu: [
      { id: 1, nom: "Vary Amin'anana", prix: 12000, description: "Riz aux brèdes, plat traditionnel", categorie: "Plats" },
      { id: 2, nom: "Akoho sy Voanio", prix: 20000, description: "Poulet au lait de coco malgache", categorie: "Plats" },
      { id: 3, nom: "Jus de Fruits Frais", prix: 6000, description: "Jus de fruits tropicaux de saison", categorie: "Boissons" },
    ]
  },
];

export const categories = [
  { id: 1, nom: "Tout", icon: nouritureIcon },
  { id: 2, nom: "Cuisine Malgache", icon: MalagasyIcon },
  { id: 3, nom: "Cuisine Française", icon: CroissantIcon },
  { id: 4, nom: "Gastronomique", icon: gastroIcon },
  { id: 5, nom: "Cuisine Asiatique", icon: asieIcon },
  { id: 6, nom: "Grillades", icon: grillageIcon },
  { id: 7, nom: "Brasserie Française", icon: brasserieIcon },
];