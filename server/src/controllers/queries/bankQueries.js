const db = require('../../models');
const BankDeclineError = require('../../errors/BankDeclineError');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount, [updatedBank]] = await db.Banks.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount < 1) {
    console.log(updatedCount);
    throw new BankDeclineError('Bank decline transaction');
  };
};
