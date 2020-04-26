const mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema   = new Schema({
    title: { type : String , unique : true, trim:true, required : true, dropDups: true },
    description: { type : String, trim:true},
    content:{type : String, trim:true},
    link:{
        type : String,
        unique : true,
        lowercase:true,
        set: str=>str.replace( /\s+/g, '-' )
        },
        image:{url:{ type : String, trim:true}},
},
{
  timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);