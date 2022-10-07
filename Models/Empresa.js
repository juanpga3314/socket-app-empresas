
    //realizo la importacion para la creacion de un ID unico
    const { v4: uuidV4 } = require('uuid');

    class empresa {

        //defino como va a estar compuesta la empresa o que contiene
        constructor( name = 'Sin - nombre' ) {
            
            this.id = uuidV4(); //crea el identificador unico
            this.nombre = name;
            this.votos = 0;
        }
    }

    module.exports = empresa;