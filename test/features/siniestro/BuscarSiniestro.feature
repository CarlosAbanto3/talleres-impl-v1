Feature: Buscar Siniestro

  Scenario Outline: Al buscar un siniestro con filtros invalidos se muestra un mensaje de validación
    Given se ha ingresado el filtro <Tipo> y valor <Valor>
    When seleccionamos la opción de buscar siniestro
    Then se mostrará el mensaje de validación: <message> y <detail>

    Examples:
      | Tipo                     | Valor                               | message                | detail                                                                     |
      | PLACA_DE_RODAJE          | V8D23@                              | Error al Validar Datos | La placa de rodaje debe ser una cadena de 6 caracteres alfanuméricos.      |
      | NUMERO_DE_MOTOR          | V8D2345GJN47JD6543HDN1V8D2345GJN47J | Error al Validar Datos | El número de motor debe ser una cadena de 1 a 30 caracteres alfanuméricos. |
      | NUMERO_DE_SERIE          | 12312312323123232323232323232332222 | Error al Validar Datos | El número de serie debe ser una cadena de 1 a 30 caracteres alfanuméricos. |
      | PLACA_DE_RODAJES         | V8D234                              | Error al Validar Datos | El campo tipo no se encuentra definido                                     |
      | PLACA_DE_RODAJES_PRUEBAS | V8D234                              | Error al Validar Datos | El campo tipo no se encuentra definido                                     |
      | PLACA_DE_RODAJE@564?     | V8D234                              | Error al Validar Datos | El campo tipo no se encuentra definido                                     |    

  Scenario Outline: Al buscar un siniestro con filtros validos se muestra el resultado de la busqueda
    Given se ha ingresado el filtro <Tipo> y valor <Valor>
    And para ese filtro existe <cantidad> siniestros, con detalle <descripcion>
    When seleccionamos la opción de buscar siniestro
    Then se mostrará el resultado de la búsqueda: <respuesta>

    Examples:
      | Tipo            | Valor  | cantidad | descripcion              | respuesta           |
      | PLACA_DE_RODAJE | AOL083 | 1        | PERDIDA TOTAL POR CHOQUE | RegistraSiniestro   |
      | PLACA_DE_RODAJE | AOL083 | 0        | null                     | NoRegistraSiniestro |