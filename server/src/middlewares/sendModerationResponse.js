/* eslint-disable indent */
const nodemailer = require('nodemailer');
const ServerError = require('../errors/ServerError');
const userQueries = require('../controllers/queries/userQueries');
const contestQueries = require('../controllers/queries/contestQueries');

module.exports = async (req, res, next) => {
    console.log(req.body);
    const foundUser = await userQueries.findUser({ id: req.body.contestOwner });
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'examtest733@gmail.com',
                pass: 'qwerty123qwerty',
            },
        },
        );
        const result = await transporter.sendMail({
        from: 'Squadhelp <bladeb071@gmail.com>',
        to: `bladeb071@gmail.com`,
        subject: 'Message from Node js',
        text: ``,
        html:
            `Your contest #${req.body.id} was ${req.body.verdict == 'resolve' ? 'accepted' : 'rejected'}`,
        });
        res.send(result);
    } catch (err) {
        next (new ServerError('Server Error on send moderation verdict'));
    }
};
