const { loadFeature, defineFeature } = require('jest-cucumber');
const { handler } = require('../../src/talleres/App');
const { buildSolicitud, obtenerRequestEjemplo, obtenerRespuestaEsperada} = require('../util/AWSTestHelper');
const feature = loadFeature('../ObtenerDeducible.feature', { loadRelativePath: true, errors: true });
const action = 'procesarDeducible';
defineFeature(feature, (test) => {
  test('Póliza con deducible texto plano', ({
    given,
    when,
    then
  }) => {

    let solicitud;
    let respuesta;
    given(/^la póliza tiene un deducible en forma del (.*)$/, (texto) => {
      const payload = obtenerRequestEjemplo(texto);
      solicitud = buildSolicitud(action, payload);
    });

    when('ejecutamos el conversor de deducible', async () => {
      try {
        const respuestaRow = await handler(solicitud);
        respuesta = JSON.parse(respuestaRow.toString());
      } catch (error) {
        respuesta = JSON.parse(error.toString());
      }
    });

    then(/^obtenemos la parametrización del deducible en (.*)$/, (detalle) => {
      const respuestaEsperada = obtenerRespuestaEsperada(detalle);
      expect(respuesta).toEqual(respuestaEsperada);
    });
  });
});

