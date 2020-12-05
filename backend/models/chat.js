const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  username1: { type: String, required: true },
  username2: { type: String, required: true },
  msgs: [{
    msg: { type: String },
    username: { type: String },
    time: { type: Date },
  }],
});

module.exports = model('Chat', chatSchema);
