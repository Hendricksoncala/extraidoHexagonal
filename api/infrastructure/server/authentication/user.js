const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split('')[1];

    if (!token) return res.status(403).json({ message: "Toejn no proporcionado"});

    jwt.verify(token, process.env.KEY_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ message: "Token inválido"});
        console.log(payload);
        req.user = payload;
        next()
    });
}