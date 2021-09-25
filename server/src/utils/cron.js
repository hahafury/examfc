const path = require('path');
const errorLogPath = path.join(__dirname, '..', 'logs/error.json');
const moment = require('moment');
const fs = require('fs');
const controller = require('../socketInit');
const cronJob = require('cron').CronJob;

module.exports.toNewLogFunction = async () => {
    try {
      const fileContent = JSON.parse(fs.readFileSync(errorLogPath), "utf8");
      const newLogFilName = `${moment().format('MMMM-Do-YYYY-h-mm-ss')}`;
      const newPath = path.join(__dirname, '..', `logs/${newLogFilName}.json`);
      for ( let elem of fileContent ) delete elem.stackTrace;
      const newFileContent = fileContent.map(item=>({
        message: item.message,
        code: item.code,
        time: item.time,
      }));
      fs.writeFile(newPath, `${JSON.stringify(newFileContent)}`, () => {
        console.log('--------------------------------------------');
        console.log(`New error file named ${newLogFilName} created successfully`);
        console.log('--------------------------------------------');
      });
      fs.writeFile(errorLogPath, '', () => {
        console.log('--------------------------------------------');
        console.log(`error.json file cleared successfully`);
        console.log('--------------------------------------------');
      });;
    } catch (error) {
        console.log(error)
        console.log('--------------------------------------------');
        console.log('Error file cant be created');
        console.log('--------------------------------------------');
    }
};

/*module.exports.eventNotification = async (userId, eventNotificationTime, eventInfo) => {
  new cronJob(eventNotificationTime, () => {
    controller.getNotificationController().emitEventNotification(userId
      `Event ${eventInfo} is coming soon`);
  }).start();
};*/

