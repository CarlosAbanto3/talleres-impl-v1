module.exports.getEtiqueta = (label) => exports.DATO_VEHICULO[label].etiqueta;

exports.DATO_VEHICULO = {
  NUMERO_DE_MOTOR: {
    etiqueta: 'Número de Motor',
    isValido: (valor) => /^[A-Z0-9]{1,30}$/.test(valor),
    mensajeValidacion: 'El número de motor debe ser una cadena de 1 a 30 caracteres alfanuméricos.'
  },
  NUMERO_DE_SERIE: {
    etiqueta: 'Número de Serie',
    isValido: (valor) => /^[A-Z0-9]{1,30}$/.test(valor),
    mensajeValidacion: 'El número de serie debe ser una cadena de 1 a 30 caracteres alfanuméricos.'
  },
  PLACA_DE_RODAJE: {
    etiqueta: 'Placa de Rodaje',
    isValido: (valor) => /^[A-Z0-9]{6}$/.test(valor),
    mensajeValidacion: 'La placa de rodaje debe ser una cadena de 6 caracteres alfanuméricos.'
  }
};

module.exports.validarDatoVehiculo = (dato) => exports.DATO_VEHICULO.hasOwnProperty(dato);

module.exports.validarValorDatoVehiculo = (tipo, valor) => {

  if(!exports.validarDatoVehiculo(tipo)) {
    return { isValido: true, mensaje: '' };
  }

  const isValorValido = exports.DATO_VEHICULO[tipo].isValido(valor);

  if(isValorValido) {
    return { isValido: true, mensaje: '' };
  }else{
    return { isValido: false, mensaje: exports.DATO_VEHICULO[tipo].mensajeValidacion };
  }
};
