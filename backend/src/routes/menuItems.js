const express = require("express");
const pool = require ("../db");
const router = express.Router();
const requireAuth = require("../middleware/auth");

// post restaurant menu item
router.post("/", requireAuth, async (req, res) => {
    const { restaurant_id, nom, prix, description, categorie} = req.body;
    if (!restaurant_id || !nom || prix === undefined) {
        return res.status(400).json({ status: "error", message: "restaurant_id, nom, prix sont requis"});
    }
    try {
const result = await pool.query(
    "select user_id from restaurants where id = $1", [restaurant_id]
);
if (result.rows.length === 0) {
    return res.status(404).json({ status: "error", message: "Restaurant not found" });
}
const restaurantOwnerId = result.rows[0].user_id;
if (restaurantOwnerId !== req.userId) {
    return res.status(403).json({ status: "error", message: "you are not the owner of this restaurant" });
}
const menuItemResult = await pool.query(
    "insert into menu_items(restaurant_id, nom, prix, description, categorie) values ($1, $2, $3, $4, $5) returning *", [restaurant_id, nom, prix, description || null, categorie || null]
);
res.status(201).json(menuItemResult.rows[0]);
}catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", message: err.message });
}
});
module.exports = router;
