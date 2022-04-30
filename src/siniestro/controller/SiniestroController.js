const Logger  = require('@rimac/common/src/utils/logger');
const SiniestroService = require('../service/SiniestroService');
const Validation = require('./RequestValidador');

module.exports = {

  async buscarSiniestro(consulta) {

    Logger.info('SiniestroController::buscarSiniestro');
    Logger.info(consulta);

    await Validation.buscarSiniestroValidation(consulta);

    return SiniestroService.buscarSiniestro(consulta);
  }

};
