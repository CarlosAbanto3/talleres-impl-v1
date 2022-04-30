const AWS = require('aws-sdk');
const { performance } = require('perf_hooks');
const { Logger } = require('@rimac/common');

const ssm = new AWS.SSM();

process.env.SSM_IS_LOADED = 'NO';

module.exports = () => {
  return {
    async before() {
      Logger.info('Getting parameters');
      Logger.debug(`¿SSM cargado?: ${process.env.SSM_IS_LOADED}`);

      const t0 = performance.now();

      try {

        if (process.env.SSM_IS_LOADED === 'SI') {
          return;
        }

        const variablesEntorno = Object.keys(process.env);

        const parametrosSSMMap = variablesEntorno
          .filter((variable) => process.env[variable].startsWith('ssm:'))
          .reduce((acc, variable) => {
            const parametroSSM = process.env[variable].replace('ssm:', '');
            acc[parametroSSM] = variable;
            return acc;
          }, {});

        if (Object.keys(parametrosSSMMap).length === 0) {
          process.env.SSM_IS_LOADED = 'SI';
          Logger.debug(`No variables SSM`);
          return;
        }

        const consultaSSM = {
          Names: Object.keys(parametrosSSMMap),
          WithDecryption: true
        };
        const parametrosSSM = await ssm.getParameters(consultaSSM).promise();

        parametrosSSM.Parameters
          .forEach(({ Name, Value }) => {
            process.env[parametrosSSMMap[Name]] = Value;
          });

        process.env.SSM_IS_LOADED = 'SI';
        Logger.debug(`¿SSM cargado?: ${process.env.SSM_IS_LOADED }`);

      } catch (e) {
        Logger.error('ERROR Getting SSM parameters');
        Logger.error(e);
      }

      const t1 = performance.now();

      Logger.info(`Call to get parameters took ${t1 - t0} milliseconds.`);
    }
  };
};
