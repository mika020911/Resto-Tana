const express = require("express");
const pool = require ("../db");
const router = express.Router();

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
            reviews: reviewsResult.rows,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});

module.exports = router;