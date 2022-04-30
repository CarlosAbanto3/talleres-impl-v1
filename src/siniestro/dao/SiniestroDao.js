const AxCloudDatabase  = require('@rimac/data-repository/src/databases/ax-cloud.database');
const SiniestroQueryTemplate = require('./SiniestroQueryTemplate');
const BuscarSiniestroResponse = require('../controller/BuscarSiniestroResponse');

module.exports = {

  async buscarSiniestroData({tipo, valor}) {

    const buscarSiniestroResponse = new BuscarSiniestroResponse({});

    const db = AxCloudDatabase.getInstance();
    const result = await db.executeQuery({
      statement: SiniestroQueryTemplate.BUSCAR_SINIESTRO_VEHICULO,
      values: { tipo, valor },
      target: buscarSiniestroResponse
    });

    return result.data;
  }
};
