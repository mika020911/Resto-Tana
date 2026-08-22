const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();

//Post api/auth/register 
router.post("/register", async (req, res) => {
    const {nom, email, mot_de_passe} = req.body;

    if (!nom || !email || !mot_de_passe) {
        return res.status(400).json({ status: "error", message: "name email and pwd  required" });
    }
        
    try {
        const existing = await pool.query("select id from users where email = $1", [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ status: "error", message: "email already used" });
        }
        const hash = await bcrypt.hash(mot_de_passe, 10);
        const result = await pool.query(
            "insert into users (nom, email, mot_de_passe_hash) values ($1, $2, $3) returning id, nom, email, created_at",[nom, email, hash]);
        const user = result.rows[0];
        
        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        
        res.status(201).json({user, token});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }});

    //POST /api/auth/login-connexion

    router.post("/login", async (req, res) => {
        const {email, mot_de_passe} = req.body;
        if (!email || !mot_de_passe) {
            return res.status(400).json({ status: "error", message: "email or password is incorrect" });
        }   
        try{
            const result = await pool.query("select id, nom, email, mot_de_passe_hash from users where email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "email or password is incorrect" });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe_hash);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "email or password is incorrect" });
        }
        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.json({
            user: {id:user.id, nom:user.nom, email:user.email}, token,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});

module.exports = router;
