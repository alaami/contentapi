// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const Article = require('../models/article');
//Connect to mongoDB
var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://exp_user:abcd1234@cluster0-eajrv.mongodb.net/express_db?retryWrites=true');

module.exports = async (req, res) => {
          Article.find(function(err, articles) {
            if (err)
                res.send(err);
            res.json(articles);
        });
}