const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  username1: { type: String, required: true },
  username2: { type: String, required: true },
  msgs: [{
    msg: { type: String },
    username: { type: String },
    time: { type: Date },
  }]
});

module.exports = model('Chat', chatSchema);
