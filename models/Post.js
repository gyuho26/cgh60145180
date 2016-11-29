var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  password: {type: String},
  content: {type: String, required: true, trim: true},
  read: {type: Number, default: 0},  
  createdAt: {type: Date, default: Date.now},
  
  city:{type: String, required: true, trim: true},
  address: {type: String, required: true, trim: true},
  cash: {type: Number, default: 0},
  facilities: {type: String, required: true, trim: true},
  rule: {type: String, required: true, trim: true}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;