var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, trim: true},
  title: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  content: {type: String, required: true, trim: true},
  read: {type: Number, default: 0},  
  city: {type: String, required: true, trim: true},
  adress: {type: String, required: true, trim: true},
  fee: {type: String, required: true, trim: true},
  facility: {type: String, required: true, trim: true},
  rule: {type: String, required: true, trim: true}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;