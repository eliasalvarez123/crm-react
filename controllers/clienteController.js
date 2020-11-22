const Clientes = require('../models/Clientes');

// agrea un nuveo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        // almacenar el registro
        await cliente.save();
        res.json({mensaje :'Se agrego un nuevo cliente'});
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
}

// muestras todos lo clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        // almacenar el registro
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        // si hay un error, console.log y next
        console.log(error); 
        next();
    }
}

// mostrar cliente por id
exports.mostrarCliente = async (req, res, next) => {

        const cliente = await Clientes.findById(req.params.idCliente);
        if(!cliente){
            res.json({mensaje : 'Ese cliente no existe'});
            next()
        }
        // Mostrar el cliente
        res.json(cliente);
  
    }

// actualizar cliente por id
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente },
            req.body,{
                new : true
            });
        res.json(cliente);
    } catch (error) {
    
        res.send(error); 
        next();
    }
}


// Eliminar cliente por id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({ _id : req.params.idCliente });
        res.json({mensaje : 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error); 
        next();
    }
}

