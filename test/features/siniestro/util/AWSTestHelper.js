module.exports.buildSolicitud = (payload) => {
    const evento = require('./../input/BuscarSiniestro.json');
    evento.body = { payload };
    return evento;
};

module.exports.getRespuestaEsperada = (responseName) => require(`./../output/${responseName}.json`);

module.exports.mockSiniestroDAO = (data) => {
    const { AxCloudDatabase } = require('@rimac/data-repository');
    jest.spyOn(AxCloudDatabase, 'getInstance')
        .mockImplementation(() => ({
            executeQuery: (query) => Promise.resolve({data})
        }));
};
