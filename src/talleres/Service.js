const { Logger } = require('@rimac/common');
const ServiceSupports = require('./support/ServiceSupports');

module.exports = {

  async procesarDeducible(payload) {
    Logger.info('service procesarDeducible');
    Logger.info(payload);
    const lines = payload.text.split('\n');
    const linesTalleres = lines.map((l, i) => {
      if (ServiceSupports.validarTaller(l) && ServiceSupports.validarCopagoYMoneda(l)) {
        return l;
      }
      if (ServiceSupports.validarTaller(l) && !ServiceSupports.validarCopagoYMoneda(l) && ServiceSupports.validarCopagoYMoneda(lines[i + 1])) {
        return `${l} ${lines[i + 1]}`;
      }
      return null;
    }).filter((l) => l !== null);
    const reponse = linesTalleres.map((line) => {
      const deducible = ServiceSupports.obtenerDeducible(line);
      const copago = ServiceSupports.obtenerMonto(line);
      const tipos = ServiceSupports.obtenerTipo(line);
      const moneda = ServiceSupports.obtenerMoneda(line);
      const marca = ServiceSupports.obtenerMarca(line);
      const taller = ServiceSupports.obtenerTalleres(line);
      return tipos.map((tipo) => {
        return {
          deducible, copago, moneda, tipo, marca, taller
        };
      });
    }).reduce((x, y) => x.concat(y), []);
    return reponse;
  }
};
