const AppException = require('@rimac/common/src/exceptions/app.exception');

class CustomException extends AppException {
  constructor(
    code,
    message,
    details,
    httpStatus
  ) {
    super(code, message);
    this.name = 'CustomException';
    this.message = message;
    this.details = details;
    this.httpStatus = httpStatus;
  }
}

module.exports = CustomException;
