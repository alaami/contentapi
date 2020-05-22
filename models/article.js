const mongoose = require('mongoose');
var Schema       = mongoose.Schema;
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
var imageSchema = new Schema({ url:{ type : String, trim:true} });
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
    image:imageSchema
       ,
},
{
  timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);