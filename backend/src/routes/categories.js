const express = require("express");
const pool = require ("../db");
const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("select id, nom , icon from categorie order by nom");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});
module.exports = router;