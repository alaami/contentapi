// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
const Article = require('../models/article');
//Auth
const jwt = require("express-jwt"); // NEW
const jwksRsa = require("jwks-rsa"); // NEW


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Connect to mongoDB
var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://exp_user:abcd1234@cluster0-eajrv.mongodb.net/express_db?retryWrites=true'); // connect to our database

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



// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

// more routes for our API will happen here
router.route('/articles')

    // create article (accessed at POST )
    .post(function(req, res) {

      var article = new Article();      // create a new instance of the Article model
      article.name = req.body.name;  // set the article name (comes from the request)
      article.description = req.body.description;  
      // save the bear and check for errors
      article.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Article created!' });

    });
  })

    .get(function(req, res) {
        Article.find(function(err, articles) {
            if (err)
                res.send(err);
            res.json(articles);
        });
    });

    // route ended with 
    router.route('/article/:article_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(checkJwt,function(req, res) {
        Article.findById(req.params.article_id, function(err, article) {
            if (err)
                res.send(err);
            res.json(article);
        });
        
    })
    // update
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Article.findById(req.params.article_id, function(err, article) {

            if (err)
                res.send(err);

            article.name = req.body.name;  
            article.description = req.body.description;  
            // save the bear
            article.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Article updated!' });
            });
        })
    })
        // Delete route
        .delete(function(req, res) {
            Article.remove({
                _id: req.params.article_id
            }, function(err, article) {
                if (err)
                    res.send(err);
    
                res.json({ message: 'Successfully deleted' });
            });
        });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
// listen on the port
app.listen(port);
