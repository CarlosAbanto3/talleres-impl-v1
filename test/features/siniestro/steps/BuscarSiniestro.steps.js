const { loadFeature, defineFeature } = require('jest-cucumber');
const { handler } = require('../../../../src/siniestro/controller/App');
const { buildSolicitud, getRespuestaEsperada, mockSiniestroDAO } = require('../util/AWSTestHelper');
const feature = loadFeature('./../BuscarSiniestro.feature', { loadRelativePath: true, errors: true });

defineFeature(feature, (test) => {
    test('Al buscar un siniestro con filtros invalidos se muestra un mensaje de validación', ({ given, when, then }) => {

        let solicitud;
        let respuesta;

        given(/^se ha ingresado el filtro (.*) y valor (.*)$/, (tipo, valor) => {

            solicitud = buildSolicitud({ tipo, valor });
        });

        when('seleccionamos la opción de buscar siniestro', async () => {

            try {
                await handler(solicitud);
            } catch (error) {
                respuesta = JSON.parse(error.toString());
            }
        });

        then(/^se mostrará el mensaje de validación: (.*) y (.*)$/, (message, details) => {

            expect(respuesta.error.message).toEqual(message);
            expect(respuesta.error.details).toEqual([details]);
        });
    });

    test('Al buscar un siniestro con filtros validos se muestra el resultado de la busqueda', ({ given, and, when, then }) => {

        let solicitud;
        let respuesta;

        given(/^se ha ingresado el filtro (.*) y valor (.*)$/, (tipo, valor) => {

            solicitud = buildSolicitud({ tipo, valor });
        });

        and(/^para ese filtro existe (.*) siniestros, con detalle (.*)$/, (cantidad, descripcion) => {

            const data = { cantidad: parseInt(cantidad), descripcion };
            mockSiniestroDAO(data);
        });

        when('seleccionamos la opción de buscar siniestro', async () => {

            const respuestaRow = await handler(solicitud);
            respuesta = JSON.parse(respuestaRow.toString());
        });

        then(/^se mostrará el resultado de la búsqueda: (.*)$/, (respuestaJSON) => {

            const respuestaEsperada = getRespuestaEsperada(respuestaJSON);
            expect(respuesta.payload).toEqual(respuestaEsperada);
        });
    });
});
