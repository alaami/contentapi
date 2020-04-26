// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.port || 8000;
const Article = require('./models/article');


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Connect to mongoDB
var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGODB_URI); // connect to our database


const router = express.Router();             

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

router.route('/articles')
    // create article (accessed at POST )
    .post(function(req, res) {
      var article = new Article();      // create a new instance of the Article model
      article.title = req.body.title;  // set the article name (comes from the request)
      article.description = req.body.description;  
      article.link=req.body.title;
      article.content=req.body.content;
      article.image.url=req.body.image;
      article.save(function(err) {
          if (err)
              res.send(err);
          else
              res.json({ message: 'Article created!' });

    });
  })

    .get(function(req, res) {
        Article.find(function(err, articles) {
            if (err)
                res.send(err);
            else
                res.json(articles);
        });
    });

    // route ended with 
    router.route('/article/:article_id')
    .get(function(req, res) {
        Article.findById(req.params.article_id, function(err, article) {
            if (err)
                res.send(err);
            else
                res.json(article);
        });        
    })
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Article.findById(req.params.article_id, function(err, article) {

            article.title = req.body.title;  
            article.description = req.body.description; 
            article.link = req.body.title; 
            article.content=req.body.content;
            article.image.url=req.body.image;  
            // save the bear
            article.save(function(err) {
                if (err)
                    res.send(err);
                else
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
                else
                    res.json({ message: 'Successfully deleted' });
            });
        });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.listen(port);
