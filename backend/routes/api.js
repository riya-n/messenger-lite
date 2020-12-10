const express = require('express');

const User = require('../models/user');
const Chat = require('../models/chat');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post('/user2', isAuthenticated, (req, res, next) => {
  const { id } = req.body;

  if (id && id !== '') {
    req.session.username2 = id;
    res.send('other user updated successfully');
  } else {
    next('error while updating other user');
  }
});

router.get('/user2', isAuthenticated, (req, res, next) => {
  const { username2 } = req.session;

  if (username2 && username2 !== '') {
    res.send(username2);
  } else {
    next('error while getting other user');
  }
});

router.get('/chats', isAuthenticated, (req, res, next) => {
  const { username } = req.session;

  User.findOne({ username }, (error, user) => {
    if (user) {
      res.send(user.chats);
    } else {
      next(error);
    }
  });
});

router.get('/chat', isAuthenticated, (req, res, next) => {
  // console.log(req);
  const { chatId } = req.query;
  console.log('chatid', chatId);

  Chat.findById(chatId, (error, chat) => {
    if (chat) {
      console.log('sending', chat);
      res.send(chat);
    } else {
      console.log('ooopppps');
      next(error);
    }
  });
});

router.get('/users', (req, res, next) => {
  User.find({}, (error, users) => {
    if (users) {
      res.send(users);
    } else {
      next(error);
    }
  });
});

router.post('/chat', isAuthenticated, async (req, res, next) => {
  let { chatId } = req.body;
  const { msg, username2 } = req.body;
  const { username } = req.session;

  const msgObj = {
    msg,
    username,
    time: Date.now(),
  };

  try {
    if (chatId === undefined || chatId === '') {
      // new chat
      await Chat.create({ username1: username, username2, msgs: [msgObj] },
        async (error, chat) => {
          if (error) {
            next(error);
          } else {
            // eslint-disable-next-line no-underscore-dangle
            chatId = chat._id;

            // add chat to both user objects
            await User.findOneAndUpdate(
              { username },
              { $push: { chats: { chatId, username: username2 } } },
              { useFindAndModify: true },
            );
            await User.findOneAndUpdate(
              { username: username2 },
              { $push: { chats: { chatId, username } } },
              { useFindAndModify: true },
            );
          }
        });
    } else {
      // the chat exists in the db
      await Chat.findByIdAndUpdate(chatId,
        { $push: { msgs: msgObj } },
        { useFindAndModify: true });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
