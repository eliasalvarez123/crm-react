const Pedidos = require('../models/Pedidos');

// agrea un nuveo cliente
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        // almacenar el registro
        await pedido.save();
        res.json({mensaje :'Se agrego un nuevo pedido '});
    } catch (error) {
        // si hay un error, console.log y next
        console.log(error); 
        next();
    }
}

// muestras todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        // si hay un error, console.log y next
        console.log(error); 
        next();
    }
}

// mostrar Pedidos por id
exports.mostrarPedido = async (req, res, next) => {

    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });
    if(!pedido){
        res.json({mensaje : 'Este pedido no existe'});
        return next()
    }
    // Mostrar el cliente
    res.json(pedido);

}

// actualizar cliente por id
exports.actualizarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({ _id : req.params.idPedido },
            req.body,{
                new : true
            })
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
        res.json(pedido);
    } catch (error) {
    
        console.log(error); 
        next();
    }
}

// Eliminar pedido por id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id : req.params.idPedido });
        res.json({mensaje : 'El Pedido se ha eliminado'});
    } catch (error) {
        console.log(error); 
        next();
    }
}