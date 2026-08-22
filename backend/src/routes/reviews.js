const express = require("express");
const pool = require ("../db");
const router = express.Router();
const requireAuth = require("../middleware/auth");

//post /api/reviews/ laisser un reviews sur un restaurant
router.post("/", requireAuth, async(req, res)=>{
    const {restaurant_id, note, commentaire} = req.body;

    if (!restaurant_id || note === undefined) {
        return res.status(400).json({ status: "error", message: "restaurant_id and note are required"});
    }
    if (note<1 || note>5){
        return res.status(400).json({ status: "error", message: "note must be between 1 and 5"});
    }
    try{
        const result = await pool.query(
            "insert into  reviews(user_id, restaurant_id, note, commentaire) values ($1, $2, $3, $4) returning *", [req.userId, restaurant_id, note, commentaire || null]
        );

        res.status(201).json(result.rows[0]);
    }catch (err) {
        if (err.code ===23505){
            return res.status(400).json({ status: "error", message: "you have already reviewed this restaurant"});
        }
        if (err.message.includes("own restaurant")) {
            return res.status(400).json({ status: "error", message: "you cannot review your own restaurant"});
        }
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});
module.exports =router;