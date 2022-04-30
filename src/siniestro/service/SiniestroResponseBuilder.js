const { getEtiqueta } = require('./Utils');

module.exports = {

  createResponseBuscarSiniestro({cantidad, descripcion}, { tipo, valor}) {

    const etiqueta = getEtiqueta(tipo);
    const data = { etiqueta, valor, descripcion };

    if (cantidad === 0) {
      return buildNoRegistraSiniestro(data);
    } else {
      return buildSiRegistraSiniestro(data);
    }
  }
};

const buildSiRegistraSiniestro = ({ etiqueta, valor, descripcion }) => ({
    status: '1',
    mensaje: `El tipo ${etiqueta} con valor ${valor} registra siniestro por el concepto de: [${descripcion}].`
});

const buildNoRegistraSiniestro = ({ etiqueta, valor }) => ({
    status: '0',
    mensaje: `El tipo ${etiqueta} con valor ${valor} NO registra siniestro de Pérdida Total.`
});
