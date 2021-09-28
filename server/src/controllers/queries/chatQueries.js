const db = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

module.exports.findConversation = async (participants,  transaction) => {
  const conversation = await db.Conversations.findOne({
      where: { 
          participants: participants,
      },
  },transaction);
  if (!conversation) {
    const newConversation = await db.Conversations.create({participants, blackList: [false, false], favoriteList: [false, false]},transaction)
    return newConversation.get({ plain: true });
  }
  return conversation;
};

module.exports.getChatPreview = async (participants,  transaction) => {
    const conversations = await db.Messages.findAll({ 
        include: [
            { 
                model: db.Conversations,
                where: {
                  participants: {[Op.contains]: [participants[0]]}
                },
                attributes: [
                  'participants',
                  'blackList',
                  'favoriteList'
                ],
            },
        ],
        order: [
            ['createdAt', 'DESC']
        ],
    },transaction);
    
    let newConversations = [];
    const isEqualConversation = (array, value) => {
      for(let elem of array){
        if(elem.conversation == value) return true;
        else continue;
      }
      return false;
    };

    for (let i = 0; i < conversations.length; i++) {
      if(i == 0) newConversations.push(conversations[i])
      else if(isEqualConversation(newConversations, conversations[i].conversation) == false){
        newConversations.push(conversations[i]);
      }
      else if(isEqualConversation(newConversations, conversations[i].conversation) == true) continue;
    }

    return newConversations;
};

module.exports.addMessage = async (data, transaction) => {
    const message = await db.Messages.create({
      sender: data.sender,
      body: data.body,
      conversation: data.conversation
    },transaction)
    if (!message) {
      return new ServerError('server error on adding message');
    }
    return message;
};

module.exports.getChatMessages = async (participants, transaction) => {
    const messages = await db.Messages.findAll({
        include: [
            { 
                model: db.Conversations,
                where: { 
                    participants: participants,
                },
                attributes: []
            }
        ],
        order: [
          ['createdAt', 'ASC']
      ]
    }, transaction);
    if (!messages){
        return new ServerError('server error on getting chat messages');
    };
    return messages;
};

module.exports.updateConversation = async (data, predicate, transaction) => {
  const newConversation = await db.Conversations.update(data,{
    where: { participants: predicate }, transaction});
  if (!newConversation){
      return new ServerError('server error on updating conversation');
  };
  return newConversation;
};

module.exports.createCatalog = async (data, transaction) => {
  const newCatalog = await db.Catalogs.create(data,transaction);
  if (!newCatalog){
      return new ServerError('server error on creating catalog');
  };
  return newCatalog;
};

module.exports.updateCatalog = async (predicate, chatId, transaction) => {
  const [updatedCount, [updatedCatalogs]] = await db.Catalogs.update({
    chats: db.sequelize.fn('array_append', db.sequelize.col('Catalogs.chats'),chatId)
  },{where: predicate, returning: true, transaction});
  if (updatedCount.length < 1){
      return new ServerError('server error on updating catalog');
  };
  return updatedCatalogs;
};

module.exports.getCatalogs = async (predicate) => {
  const catalogs = await db.Catalogs.findAll({
    where: predicate,
    group: [
      'id',
      'catalogName',
      'chats',
    ]
  })
  return catalogs;
};

module.exports.removeChatFromCatalog = async (chatId, predicate, transaction) => {
  const [updatedCount, [updatedCatalogs]] = await db.Catalogs.update({
    chats: db.sequelize.fn('array_remove', db.sequelize.col('Catalogs.chats'),chatId)
  },{where: predicate, returning: true, transaction});
  if (updatedCount.length < 1){
      return new ServerError('server error on removing chat from catalog');
  };
  return updatedCatalogs;
}

module.exports.deleteCatalog = async (catalogId) => {
  const deletedCatalog = await db.Catalogs.destroy({
    where: {
      id: catalogId
    }
  });
  if (!deletedCatalog){
      return new ServerError('server error on deleting catalog');
  };
  return deletedCatalog;
}