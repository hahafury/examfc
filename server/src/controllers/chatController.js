const Conversation = require('../models/mongoModels/conversation');
const Message = require('../models/mongoModels/Message');
const Catalog = require('../models/mongoModels/Catalog');
const moment = require('moment');
const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');
const chatQueries = require('./queries/chatQueries');
const newSqlChatController = require('./queries/chatQueries')

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  let transaction;
  const conversation = await chatQueries.findConversation(participants,transaction);
  try {
    transaction = await db.sequelize.transaction();
    const message = await chatQueries.addMessage({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: conversation.id,         
    },transaction)
    message.participants = participants;
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    const preview = {
      id: conversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createdAt: message.createdAt,
      participants,
      blackList: conversation.blackList,
      favoriteList: conversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id: conversation.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createdAt: message.createdAt,
        participants,
        blackList: conversation.blackList,
        favoriteList: conversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    transaction.commit();
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    const messages = await chatQueries.getChatMessages(participants);
    const interlocutor = await userQueries.findUser(
      { id: req.body.interlocutorId });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
try {
  const data = await chatQueries.getChatPreview([req.tokenData.userId,null]);
  console.log(data);
  console.log('--------------')
  const interlocutors = [];
  data.forEach(elements => {
    interlocutors.push(elements.Conversation.participants.find(
      (participant) => participant !== req.tokenData.userId));
  });
  const senders = await db.Users.findAll({
    where: {
      id: interlocutors,
    },
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
  data.forEach((elements) => {
    senders.forEach(sender => {
      if (elements.Conversation.participants.includes(sender.dataValues.id)) {
        elements.dataValues.interlocutor = {
          id: sender.dataValues.id,
          firstName: sender.dataValues.firstName,
          lastName: sender.dataValues.lastName,
          displayName: sender.dataValues.displayName,
          avatar: sender.dataValues.avatar,
        };
      }
    });
  });
  res.send(data);
} catch (err) {
  next(err);
}
};

module.exports.blackList = async (req, res, next) => {
  const predicate = req.body.participants.indexOf(req.tokenData.userId) == 0 ? 1 : 2;
  try {
    await db.sequelize.query(`UPDATE "Conversations"
    SET "blackList" [${predicate}] = '${req.body.blackListFlag}'
    WHERE "participants" = '{${req.body.participants}}';`, {type: db.sequelize.QueryTypes.UPDATE})
    .then(() => {
      return ;
    })
    const chat = await chatQueries.findConversation(req.body.participants);
    res.send(chat)
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  console.log(req.body)
  console.log(req.tokenData)
  const predicate = req.body.participants.indexOf(req.tokenData.userId) == 0 ? 1 : 2;
  try {
    await db.sequelize.query(`UPDATE "Conversations"
    SET "favoriteList" [${predicate}] = '${req.body.favoriteFlag}'
    WHERE "participants" = '{${req.body.participants}}';`, {type: db.sequelize.QueryTypes.UPDATE})
    .then(() => {
      return ;
    })
    const chat = await chatQueries.findConversation(req.body.participants);
    res.send(chat)
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();
  console.log(req.body)
  try {
    const catalog = await chatQueries.createCatalog({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId]
    },transaction)
    await transaction.commit();
    res.send(catalog);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();
  try {
    const catalog = await chatQueries.updateCatalog({
      catalogName: req.body.catalogName
    }, req.body.id, req.tokenData.userId,transaction);
    await transaction.commit();
    res.send(catalog);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();
  const predicate = {
    id: req.body.catalogId,
    userId: req.tokenData.userId,
  };
  try {
    const catalog = await chatQueries.updateCatalog(predicate, req.body.chatId, transaction);
    await transaction.commit();
    res.send(catalog);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  let transaction = await db.sequelize.transaction();
  const predicate = {
    id: req.body.catalogId,
    userId: req.tokenData.userId,
  }
  try {
    const catalog = await chatQueries.removeChatFromCatalog(req.body.chatId, predicate, transaction);
    await transaction.commit();
    res.send(catalog);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await chatQueries.deleteCatalog(req.body.catalogId);
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  const predicate = {
    userId: req.tokenData.userId,
  };
  try {
    const catalogs = await chatQueries.getCatalogs(predicate);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
