const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  chatId: { type: Schema.ObjectId, required: true },
  username1: { type: String, required: true },
  username1: { type: String, required: true },
  msgs: [{
    msg: { type: String },
    username: { type: String },
    time: { type: Date },
  }]
});

module.exports = model('Chat', chatSchema);
