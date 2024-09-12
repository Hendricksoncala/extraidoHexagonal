const session = require('express-session');
const sessioAuth = require('express').Router();

module.exports = sessionAuth.use(session({
    secret: ProcessingInstruction.env.KEY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: false,
        maxAge: parseInte(process.env.EXPRESS_EXPIRE)
    }
}))