const express = require('express');
const mongoose = require('mongoose');
const articleRoute = require('../routes/article');
//const { MONGODB_URI } = process.env;
// set up db connection
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
// no need to route only /book requests; that's done in now.json
app.use(articleRoute);
// just export the app instead of starting up the server
module.exports = app;