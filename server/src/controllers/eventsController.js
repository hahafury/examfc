const { Events } = require('./../models');
const { Users } = require('./../models');


module.exports.create = async (req, res, next) => {
  const { body } = req;
  try {
    const createdEvent = await Events.create(body);
    if (createdEvent) {
      return res.status(201).send({ data: createdEvent });
    }
    res.status(400).send('Bad request');
  } catch (err) {
    next(err);
  }
};

module.exports.getAllEvents = async (req, res, next) => {
  try {
    const foundEvents = await Events.findAll({
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt'],
      },
      where: {
        eventOwner: req.body.userId,
      },
      include: [
        {
          model: Users,
          where: {
            id: req.body.userId,
          },
          attributes: [],
        },
      ],
    });
    res.status(201).send({ data: foundEvents });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteEventById = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const foundEvent = await Events.destroy({
      where: {
        id: id,
      },
    });
    typeof foundEvent === 'undefined'
      ? res.status(404).send('Not found')
      : res.sendStatus(200).send(`Event with id ${id} was deleted`) 
  }
  catch (err) {
    next(err);
  }
}