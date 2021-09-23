const db = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await db.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.findContest = async (predicate, transaction) => {
  const result = await db.Contests.findOne({ where: predicate, transaction });
  if (!result) {
    throw new NotFound('contest with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await db.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updateResult[ 0 ] < 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updateResult[ 1 ][ 0 ].dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await db.Offers.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.deleteContest = async ( contestId, transaction ) => {
  const deletedContest = db.Contests.findOne({
    where: {
      id: contestId
    }
  });
  if(deletedContest){
    bd.Contests.destroy({
      where: {
        id: contestId,
      }
    });
  } else{
    throw new ServerError('cannot find contest!');
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const result = await db.Offers.update(data,
    { where: predicate, returning: true, transaction });
  if (result[ 0 ] < 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return result[ 1 ];
  }
};

module.exports.createOffer = async (data) => {
  const result = await db.Offers.create(data);
  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};
