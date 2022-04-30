module.exports.buildSolicitud = (action, payload) => {
  const evento = require('../request/middleware-lambda.json');
  evento.action = action;
  return {...evento,...payload};
};

module.exports.obtenerRespuestaEsperada = ( escenario) => require(`./../output/${escenario}.js`);

module.exports.obtenerRequestEjemplo = ( escenario) => require(`./../input/${escenario}.js`);
