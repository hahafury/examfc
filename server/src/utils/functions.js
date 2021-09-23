const bd = require('../models');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  typeIndex, contestId, industry, awardSort, userRole) => {
  const object = {
    where: {},
    order: [],
  };
  if(userRole === CONSTANTS.MODERATOR){
    Object.assign(object.where, {
      status: CONSTANTS.CONTEST_STATUS_CHECKING,
    });
  }
  if(userRole === CONSTANTS.CREATOR){
    Object.assign(object.where, {
      status: CONSTANTS.CONTEST_STATUS_ACTIVE,
    });
  }
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes (index) {
  return { [ bd.Sequelize.Op.or ]: [types[ index ].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];
