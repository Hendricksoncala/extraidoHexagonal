// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const productRoutes = require('../../application/routes/productRoutes');
const userRoutes = require('../../application/routes/userRoutes');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const {auth} = require("../../application/middlewares/authenticateToken")
const {sessionAuth} = require("../../application/middlewares/sessionLogin")


const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    app.use('/users', userRoutes);

    app.use('/product', productRoutes)
    return app;
};

module.exports = createServer;