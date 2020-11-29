const express = require('express');
const { Types } = require('mongoose');

const User = require('../models/user');
const Chat = require('../models/chat');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.get('/chats', isAuthenticated, (req, res, next) => {
  const { username } = req.body;

  User.findOne({ username }, (error, user) => {
    if (user) {
      res.send(user.chats);
    } else {
      next(error);
    }
  })
});

router.get('/chat', isAuthenticated, (req, res, next) => {
  const { chatId } = req.body;

  Chat.findOne({ chatId }, (error, chat) => {
    if (chat) {
      res.send(chat);
    } else {
      next(error);
    }
  })
})

router.post('/chat/add', isAuthenticated, async (req, res, next) => {
  const { chatId, msg, username2 } = req.body;
  const { username } = req.session;

  const msgObj = {
    msg,
    username,
    time: Date.now(),
  };

  try {
    if (chatId) {
      // the chat exists in the db
      await Chat.findOneAndUpdate({ chatId },
        { '$push': { 'msgs': msgObj } },
        { useFindAndModify: true });
    } else {
      chatId = Types.ObjectId(); // generates new id

      // new chat
      await Chat.create({
        chatId,
        username1: username,
        username2,
        msgs: [msgObj],
      });

      // add chat to both user objects
      await User.findOneAndUpdate(
        { username },
        {'$push': { 'chats': { chatId, username: username2 } } },
        { useFindAndModify: true }
      );
      await User.findOneAndUpdate(
        { username2 },
        {'$push': { 'chats': { chatId, username } } },
        { useFindAndModify: true }
      );
    }

    res.send('msg added successfully');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
