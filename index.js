    
    //LLAMO LA INSTALACION DE EXPRESS EN LA VARIABLE
    //LLAMO A LA INSTACION DE PATH
    //CONFIGURO LAS VARIABLES DE ENTORNO EN EL ARCHIVO .ENV
 
    //DESPUES APP TIENE YA EL EXPRES CREADO
    const express = require('express');
    const path = require('path');
    require('dotenv').config();
 
    //APP DE EXPRESS
    const app = express();
  
    //SERVIDOR DE NODE CONFIGURACION
    const server = require('http').createServer(app);
    module.exports.io = require('socket.io')(server); //exporto el io
    require('./Sockets/Socket') //aqui llamo a la sockets que escucha y emite
 

    //creo el path publico
    //el __dirname me indica el directoro o la direcion http donde esta montada el server
    //public es la cartera que me redireciona a  un html
    const pathpublico = path.resolve( __dirname, 'Public' );

    //USO LA CARPETA PUBLIC PARA MOSTRAR EN EL SERVER CUANDO SE ABRA EN UN ANVEGADOR
    app.use(express.static(pathpublico));

    //CREO EL LISTE O LA ESCUCHA EN EL PUERTO QUE SE ENCUENTRA.
    //ESTE LO CREA O LO LEE DESDE EL ARCHIVO .ENV QUE SE CONFIGURA EL PUERTO
    //Nota: nodemon solo detecta cambios en el index.js y reinicia el server en el .env hay que bajarlo y subirlo
    server.listen (process.env.PORT, (err) => {

        if (err) throw Error(err);

        console.log('Servidor corriendo en el puerto', process.env.PORT);
    });
 


    //nota en el packege.json: se agrega el "strar y el star:dev" el primero corre cuando se inicia
    //y el segundo es para el modo desarrollo

    //para arrancarlo normal se usa npm start
    //para arrancarlo en desarrollo npm run strar:dev