
const { io } = require('../index');
const empresa = require('../Models/Empresa');
const empresas = require('../Models/Empresas');

//contiene todos los metodos o las acciones
const empres = new empresas()  
  
empres.agregarempresa( new empresa('Airbus') );
empres.agregarempresa( new empresa('Boing') );
empres.agregarempresa( new empresa('Sukhoi') );
empres.agregarempresa( new empresa('Embraber') );

console.log(empres);
 
//CONFIGURO MENSAJES DEL SERVIDOR
io.on('connection', client => {

    console.log( 'cliente conectado');
 
    //voy a emitir todo el arreglo de empresas
    client.emit('empresas-activas', empres.obtenerempresa());

    //escucho cuando flutter envia un boto
    client.on('voto-empresa', (payload) => {
        empres.votosempresa(payload.id);
        io.emit('empresas-activas', empres.obtenerempresa()); //notifica todos los conectados
    });

    //escucho cuando quiero agregar una nueva empresa al listado
    client.on('agregar-empresa', (payload) => {
        const nuevaempresa = new empresa(payload.nombre) //creo una nueva banda con la clase y envio la nueva banda
        empres.agregarempresa(nuevaempresa);
        io.emit('empresas-activas', empres.obtenerempresa()); //notifica todos los conectados
    });

    //escucho cuando borro una empresa
    client.on('borrar-empresa', (payload) => {
        empres.borrarempresa(payload.id);
        io.emit('empresas-activas', empres.obtenerempresa()); //notifica todos los conectados
    });

    client.on('disconnect', () => {
        console.log( 'cliente desconectado');
    });
 
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        //emito un mensaje a todos los cliente contectados
        io.emit('mensaje', {User: 'Administrador'});
    });

    //EL CLIENTE ESTA ESCUCHANDO UN EVENTO LLAMADO EMITIR-MENSAJE Y RECIBE UN PAYLOAD O OBJETO
    //COMO LO RECIBIO EJECUTA LA ACCION QUE ES EMITIR EL MENSAJE CONFIGURADO O QUE RECIBA A TODOS LOS QUE ESTEN ESCUCHANDO NUEVO-MENSAJE
    client.on('emitir-mensaje', (payload) => {
        //io.emit('nuevo-mensaje', payload ); //emite a todo el mundo
        client.broadcast.emit('nuevo-mensaje', payload ); //emite a todos menos a que emite el mensaje
    });

    //recibe el mensaje desde el boton de la app
    client.on('emitir-f', (payload) => {
        client.broadcast.emit('emitir-f', payload ); //emite a todos menos a que emite el mensaje
    });
});