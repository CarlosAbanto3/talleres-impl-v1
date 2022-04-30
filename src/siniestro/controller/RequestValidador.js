const HttpConstant = require('@rimac/core/src/constants/http.constant');
const Joi = require('joi');
const validationMessages = require('@rimac/core/src/validation/validation-messages');
const { validarValorDatoVehiculo, validarDatoVehiculo } = require('../service/Utils');
const ErrorConstant = require('../service/TipoError');
const CustomException = require('./CustomException');

module.exports = {
  async buscarSiniestroValidation(payload) {
    const schema = Joi.object({
      tipo: Joi.string()
        .custom((value, helpers) => {

          if (!validarDatoVehiculo(value)) {
            return helpers.message('El campo tipo no se encuentra definido');
          }

          return value;
        }),

      valor: Joi.string()
        .custom((value, helpers) => {

          const validacion = validarValorDatoVehiculo(payload.tipo, value);

          if (!validacion.isValido) {
            return helpers.message(validacion.mensaje);
          }

          return value;
        })
    });

    const validation = schema.validate(payload, {
      allowUnknown: true,
      abortEarly: false,
      convert: false,
      errors: { language: 'spanish' },
      messages: validationMessages
    });

    if (validation.error) {
      const messagesError = validation.error.details.map(({ message }) => message);

      throw new CustomException(
        ErrorConstant.ERROR_200.code,
        ErrorConstant.ERROR_200.message,
        messagesError,
        HttpConstant.BAD_REQUEST_STATUS.code
      );
    }
  }
};
