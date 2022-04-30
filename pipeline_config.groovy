pipeline_template   = "template_default"

libraries {
    npm {
        image_tag = "14"
        directories_install = [".", "api"]
        directories_build = ["api"]
        isNewApiCatalog =  true
    }
    serverless {
        directories_deploy = [".", "api"]
        enforce_deploy = true
        commands_serverless = [""]
        isNewApiCatalog =  true
    }

    sonarqube {
        //Para el pipeline si no pasa el quality gate del Sonar.
        stopQgError = true
    }

    //Notificacion por correo
    email{
        //Colocar todos los correos destinatarios separados por comas
        to="victor.maita@rimac.com.pe,kevin.yzacupe@rimac.com.pe,tomas.carrillo@rimac.com.pe"
    }

    //Notificación por canal Teams

    //[Como crear un canal en Microsoft Teams](https://dzone.com/articles/configure-jenkins-notifications-with-microsoft-tea)
   /* office365{
        webhookUrlTeams="https://rimacsegurosperu.webhook.office.com/webhookb2/[codigo-del-canal]"
    }*/
}

application_environments {
    dev{
        aws {
            credentials_id =   'journeyvida_aws_credentials'
            stage   = 'DESA'
        }
    }
    test{
        aws {
            credentials_id =   'journeyvida_aws_credentials'
            stage   = 'TEST'
        }
    }
    prod{
        requireCredentials = true
    }
}

