const { Logger } = require('@rimac/common');
const Service = require('./Service');

module.exports = {

  async procesarDeducible(payload) {
    Logger.info('controller procesarDeducible');
    Logger.info(payload);
    return Service.procesarDeducible(payload);
  }
};
