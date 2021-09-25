const db = require('../../models');
const NotFound = require('../../errors/EventNotFoundError');
const ServerError = require('../../errors/ServerError');

module.exports.findEvent = async (predicate, transaction) => {
  const result = await db.Users.findOne({ where: predicate, transaction });
  if (!result) {
    throw new NotFound('event with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.eventCreate = async (data) => {
  const newEvent = await db.Events.create(data);
  if (!newEvent) {
    throw new ServerError('server error on event creation');
  } else {
    return newEvent.get({ plain: true });
  }
};

