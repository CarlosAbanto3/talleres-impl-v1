const AppFactory = require('@rimac/core/src/app-factory');
const ApiGatewayEvent= require('@rimac/core/src/middlewares/api-gateway-event.middleware')
const SiniestroController = require('./SiniestroController');
const SSMParameterLoader = require('./SSMParameterLoader');

AppFactory.addMiddleware(SSMParameterLoader());
AppFactory.addMiddleware(ApiGatewayEvent());

module.exports.handler = AppFactory.bootstrap(SiniestroController);
