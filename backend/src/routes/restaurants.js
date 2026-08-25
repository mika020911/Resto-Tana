const express = require("express");
const pool = require ("../db");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const multer = require ("multer");
const supabase = require ("../supabaseClient")

const upload = multer({storage:multer.memoryStorage()});

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
            'select id, nom, prix, description, categorie, created_at from menu_items where restaurant_id = $1 order by created_at desc', [id]
        );
        const reviewsResult = await pool.query(
            'select id, commentaire, note, created_at from reviews where restaurant_id = $1 order by created_at desc', [id]
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
//upload post api/restaurant/:id/photo
router.post("/:id/photo", requireAuth, upload.single("photo"), async (req, res)=>{
    const {id} = req.params;

    if(!req.file){
        return res.status(400).json({staus:"error",  message:"no files received"});
    }
    try{
        const restaurantResult = await pool.query("select user_id from restarants where id= $1", [id]);
        if (restaurantResult.rows.length === 0){
            return res.status(404).json({status:"error", message:"Restaurant not found"});
        }
        if (restaurantResult.rows[0].user_id != req.userId) {
            return res.status(403).json({status:"error", message:"Your are not owner of this restaurant"});
        }
         const fileName = `${id}-${Date.now()}-${req.file.originalname}`;

         const {error:uploadError} = await supabase.storage
         .from("restaurant-photo")
         .upload(fileName, req.file.buffer, {contentType: req.file.mimetype});  

         if (uploadError){
            console.err(uploadError.message);
        return res.status(500).json({status:"error", message:"upload echec"});
         }
         const {data:publicUrlData} = supabase.storage.from("restaurant-photos").getPublicUrl(fileName);

         const updateResult = await pool.query (
            "update restaurants set photo_url_path = $1 where id =$2 returning *", [publicUrlData.publicUrl, id]
         );
         res.json(updateResult.rows[0]);
    }catch (err){
        console.error(err.message);
        res.status(500).json({status:"error", message:err.message});
    }
})


module.exports = router;