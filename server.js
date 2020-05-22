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
      var article = new Article({
          title:req.body.title,
          description:req.body.description,
          link:req.body.title,
          content:req.body.content,
          image:{url:req.body.image}

      });
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
    router.route('/article/:link')
    .get(function(req, res) {
        Article.find({'link': req.params.link}, function(err, article) {
            
            if (err)
                res.send(err);
            else
                res.json(article);
        });        
    })
    .put(function(req, res) {

        Article.findOneAndUpdate({'link': req.params.link}, {title:req.body.title,
        description:req.body.description,
        link:req.body.title,
        content:req.body.content,
        image:{url:req.body.image}}, function(err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Article updated!' });
            });
            
        })
        // Delete route
        .delete(function(req, res) {
            Article.remove({
                link: req.params.link
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
