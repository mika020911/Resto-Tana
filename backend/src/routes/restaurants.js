const express = require("express");
const pool = require ("../db");
const router = express.Router();
const requireAuth = require("../middleware/auth");

// get all restaurants
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            'select r.id, r.nom, r.adresse, r.description, r.photo_url, r.photo_upload_path, r.temps_livraiseon, c.nom as categorie, coalesce(avg(rev.note), 0) as note_moyenne,count(rev.id) as nombre_avis from restaurants r left join categorie c on c.id = r.categorie_id left join reviews rev on rev.restaurant_id =r.id group by r .id , c.nom order by r.created_at desc'
        );
        res.json(result.rows);
    }catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const resultRestaurant = await pool.query(
            'select r.id, r.nom, r.adresse, r.description, r.photo_url, r.photo_upload_path, r.temps_livraiseon, c.nom as categorie, coalesce(avg(rev.note), 0) as note_moyenne,count(rev.id) as nombre_avis from restaurants r left join categorie c on c.id = r.categorie_id left join reviews rev on rev.restaurant_id =r.id where r.id = $1 group by r.id, c.nom', [id]
        );
        if (resultRestaurant.rows.length === 0){
            return res.status(404).json({ status: "error", message: "Restaurant not found" });
        }
        const menuResult = await pool.query(
            'select id, nom, commentaire, created_at from reviews where restaurant_id = $1 order by created_at desc', [id]
        );
     

        res.json({
            ...resultRestaurant.rows[0],
            menu: menuResult.rows,
            //reviews: reviewsResult.rows,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});

//POst restaurants
router.post("/", requireAuth, async (req, res) => {
    const { nom, adresse, quartier, categorie_id, description, photo_url, temps_livraiseon} = req.body;
    if (!nom || !adresse || !quartier) {
        return res.status(400).json({ status: "error", message: "name, adresse, sont requis"});
    } try {
        const result = await pool.query(
            "insert into restaurants(user_id, categorie_id, nom, quartier, adresse, description, photo_url, temps_livraiseon) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [req.userId, categorie_id || null, nom , adresse, quartier, description || null, photo_url || null, temps_livraiseon || null]
        );
        res.status(201).json(result.rows[0]);
    }catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});
module.exports = router;