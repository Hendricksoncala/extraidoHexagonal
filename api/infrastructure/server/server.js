// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const productRoutes = require('../../api/application/routes/productRoutes');
const userRoutes = require('../../api/application/routes/userRoutes');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);
    
    app.use("/users", (req, res, next)=> {
        req.__dirname = __dirname;
        next();
    },userRoutes)

    app.use("/home", sessionAuth,auth,(req, res, next)=> {
        req.__dirname = __dirname;
        next();
    },productRoutes)
    return app;
};

module.exports = createServer;