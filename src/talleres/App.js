const {
    AppFactory, ApiGatewayEvent
  } = require('@rimac/core');
  const controller = require('./Controller');
  
  AppFactory.addMiddleware(ApiGatewayEvent());
  module.exports.handler = AppFactory.bootstrap(controller);
  