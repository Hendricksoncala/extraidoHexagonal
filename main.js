const https = require('https');
const fs = require('fs');
const ConnectToDatabase = require('./infrastructure/database/mongodb');
const createServer = require('./infrastructure/server/server');

const startApp = async () => {
    let connectToDatabase = new ConnectToDatabase();
    await connectToDatabase.connectOpen();
    const app = createServer();

    const httpsServer = https.creteServer({
        key: fs.readFileSync('./private.key'),
        cert: fs.readFileSync('./certificate.crt'),
    }, app)

    app.listen({port: process.env.EXPRESS_PORT, host:process.env.EXPRESS_HOST}, () => {
        console.log(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
    });
};

startApp();