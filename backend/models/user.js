const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  chats: [{
    chatId: { type: Schema.ObjectId },
    username: { type: String }, // of the other user
  }],
});

module.exports = model('User', userSchema);
