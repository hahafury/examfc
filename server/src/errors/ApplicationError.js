const path = require('path');
const errorLogPath = path.join(__dirname, '..', 'logs/error.json');
const toLogger = require('./Logger')

class ApplicationError extends Error{

  constructor (message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong. Please try again';
    this.code = status || 500;
    toLogger(errorLogPath, this.message, this.code, this.stack);
  }
};

module.exports = ApplicationError;
