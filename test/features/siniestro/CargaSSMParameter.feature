Feature: Carga de parametros desde el SSM

  Scenario Outline: Al iniciar la aplicación, se cargan las variable de entorno
    Given se tienen variables de entorno con <nombre> y <valor>
    And tenemos los secretosSSM y LoaderSSM aún no se invoca
    When se inicia la aplicación
    Then  se cargan las variables de entorno con valor final igual a <valorFinal>

    Examples:
      | nombre               | valor                                  | valorFinal   |
      | TZ                   | America/Lima                           | America/Lima |
      | AX_CLOUD_CREDENTIALS | ssm:mock/CREDENTIALS/DATABASE/AX-CLOUD | SECRETODBAX  |

  Scenario Outline: Al iniciar la aplicación, se cargan las variable de entorno dos veces
    Given se tienen variables de entorno con <nombre> y <valor>
    And en SSM tenemos los secretosSSM y LoaderSSM ya se ha llamado
    When se inicia la aplicación
    Then  se cargan las variables de entorno con valor final igual <valorFinal>

    Examples:
      | nombre               | valor                                  | valorFinal   |
      | TZ                   | America/Lima                           | America/Lima |
      | AE_CLOUD_CREDENTIALS | ssm:mock/CREDENTIALS/DATABASE/AE-CLOUD | SECRETODBAE  |

  Scenario Outline: Al iniciar la aplicación, se cargan las variable de entorno y falla
    Given se tienen variables de entorno con <nombre> y <valor>
    And en SSM tenemos los secretosSSM y LoaderSSM aún no se invoca y hay una variable de entorno no string
    When intenta iniciar la aplicación
    Then  se carga la variable de entorno con valor final igual <valorFinal>

    Examples:
      | nombre                | valor                                   | valorFinal                              |
      | ECD_CLOUD_CREDENTIALS | ssm:mock/CREDENTIALS/DATABASE/ECD-CLOUD | ssm:mock/CREDENTIALS/DATABASE/ECD-CLOUD |