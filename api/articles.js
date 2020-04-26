const Article = require('../models/article');
const express = require('express');
//const url = require('url')
const jwt = require("express-jwt"); // NEW
const jwksRsa = require("jwks-rsa"); // NEW
// Set up Auth0 configuration 
const authConfig = {
    domain: "dev-portfolioid.auth0.com",
    audience: "http://localhost:8000/api"
  };
// Create middleware to validate the JWT using express-jwt
const checkJwt = jwt({
    // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
  
    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
  });  

//Connect to mongoDB
var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true });
  

module.exports = async (req, res) => {

	        Article.find(function(err, articles) {
            if (err)
                res.send(err);
            res.json(articles);
        });

}