const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{type:String},
  age:{type:Number},
  image : [{
    imageName : {type:String}
  }]
},{collection:'user'});

module.exports = mongoose.model('user',userSchema)