const Article = require('../models/article');
const url = require('url')

//Connect to mongoDB
var mongoose   = require('mongoose');
mongoose.connect(url.parse(process.env.MONGODB_URI),{ useNewUrlParser: true });
module.exports = async (req, res) => {
	        Article.find(function(err, articles) {
            if (err)
                res.send(err);
            res.json(articles);
        });

}