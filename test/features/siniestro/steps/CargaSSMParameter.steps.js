const { loadFeature, defineFeature } = require('jest-cucumber');
const feature = loadFeature('./../CargaSSMParameter.feature', { loadRelativePath: true, errors: true });



defineFeature(feature, (test) => {

    test('Al iniciar la aplicación, se cargan las variable de entorno', ({ given, and, when, then }) => {

        let variableDeEntorno;
        let SSMParameterLoader;

        given(/^se tienen variables de entorno con (.*) y (.*)$/, (nombre, valor) => {
            jest.resetModules();
            mockSSMOk();
            variableDeEntorno = nombre;
            process.env[nombre] = valor;
        });

        and('tenemos los secretosSSM y LoaderSSM aún no se invoca', () => {
            //TODO hacer mock SSM dinámico
            SSMParameterLoader = require('../../../../src/siniestro/controller/SSMParameterLoader');
            process.env.SSM_IS_LOADED = 'NO';
        });

        when('se inicia la aplicación', async () => {

            await SSMParameterLoader().before();
        });

        then(/^se cargan las variables de entorno con valor final igual a (.*)$/, (valorFinal) => {

            expect(process.env[variableDeEntorno]).toEqual(valorFinal);
        });
    });

    test('Al iniciar la aplicación, se cargan las variable de entorno dos veces', ({ given, and, when, then }) => {

        let variableDeEntorno;
        let SSMParameterLoader;

        given(/^se tienen variables de entorno con (.*) y (.*)$/, (nombre, valor) => {
            jest.resetModules();
            mockSSMOk();
            variableDeEntorno = nombre;
            process.env[nombre] = valor;
        });

        and('en SSM tenemos los secretosSSM y LoaderSSM ya se ha llamado', async () => {

            SSMParameterLoader = require('../../../../src/siniestro/controller/SSMParameterLoader');
            process.env.SSM_IS_LOADED = 'NO';
            await SSMParameterLoader().before();
        });

        when('se inicia la aplicación', async () => {

            await SSMParameterLoader().before();
        });

        then(/^se cargan las variables de entorno con valor final igual (.*)$/, (valorFinal) => {

            expect(process.env[variableDeEntorno]).toEqual(valorFinal);
        });
    });

    test('Al iniciar la aplicación, se cargan las variable de entorno y falla', ({ given, and, when, then }) => {

        let variableDeEntorno;
        let SSMParameterLoader;

        given(/^se tienen variables de entorno con (.*) y (.*)$/, (nombre, valor) => {
            jest.resetModules();
            mockSSMError();
            variableDeEntorno = nombre;
            process.env[nombre] = valor;
        });
        and('en SSM tenemos los secretosSSM y LoaderSSM aún no se invoca y hay una variable de entorno no string', () => {
            SSMParameterLoader = require('../../../../src/siniestro/controller/SSMParameterLoader');
            process.env.SSM_IS_LOADED = 'NO';
        });
        when('intenta iniciar la aplicación', async () => {

            await SSMParameterLoader().before();
        });
        then(/^se carga la variable de entorno con valor final igual (.*)$/, (valorFinal) => {
            expect(process.env[variableDeEntorno]).toEqual(valorFinal);
        });
    });
});

const mockSSMOk = () => {
    jest.mock('aws-sdk', () => {
        return {
            SSM: jest.fn(() => ({
                getParameters: (query) => ({
                    promise: () => Promise.resolve(require('../input/ssm/SecretosSSM.json'))
                })
            }))
        };
    });
};

const mockSSMError = () => {
    jest.mock('aws-sdk', () => {
        return {
            SSM: jest.fn(() => ({
                getParameters: (query) => ({
                    promise: () => Promise.reject(require('../input/ssm/SecretosSSM.json'))
                })
            }))
        };
    });
};
