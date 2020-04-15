const Article = require('../models/article');

//Connect to mongoDB
var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
module.exports = async (req, res) => {
	        Article.find(function(err, articles) {
            if (err)
                res.send(err);
            res.json(articles);
        });

}