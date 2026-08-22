const jwt = require ("jsonwebtoken");
// verifie les token jwt et extrait l'user avet de l'envoyer au routes
function requireAuth(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId
        next();
}catch (err) {
        console.error(err.message);
        res.status(401).json({ status: "error", message: "UToken invalid or expired" });
    }
}
    module.exports = requireAuth;