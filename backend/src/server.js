//point d'entrer du server avec une route pour les requetes http
const express = require("express"); // gerer les serveur http (recevoir requette et repondre)
const cors = require("cors");// autorise le fronte a apppeler le back, qui chaqun tourne sur un port different
const pool = require("./db");
require("dotenv").config();// charge les variable de .env

const categoriesRouter = require("./routes/categories");
const restaurantsRouter = require("./routes/restaurants");
const authRouter = require("./routes/auth");
const menuItemsRouter = require("./routes/menuItems");
const reviewsRouter = require("./routes/reviews");


const app = express();
app.use(cors());
app.use(express.json());// permet de recuperer le body des requettes en json
app.use("/api/categories", categoriesRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/auth", authRouter);
app.use("/api/menu-items", menuItemsRouter);
app.use("/api/reviews", reviewsRouter);

//ROUTES de test verifie que le serveur + connnnexion BD ok//
app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()"); // test de la connexion à la base de données
        res.json({ status: "ok" , time: result.rows[0].now});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

