const SiniestroDAO = require('../dao/SiniestroDao');
const Presenter = require('./SiniestroResponseBuilder');

module.exports = {

  async buscarSiniestro(consulta) {

    const resultado = await SiniestroDAO.buscarSiniestroData(consulta);

    return Presenter.createResponseBuscarSiniestro(resultado, consulta);
  }
};
