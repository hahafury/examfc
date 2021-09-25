const http = require('http');
const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
const { toNewLogFunction } = require('./utils/cron.js')
const cronJob = require('cron').CronJob;

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

const toNewLog = new cronJob('0 0 * * * *', toNewLogFunction, null, true, 'America/Los_Angeles');
toNewLog.start();

const server = http.createServer(app);
server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));
controller.createConnection(server);


