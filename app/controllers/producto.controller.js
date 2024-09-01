const db = require('../config/db.config.js');
const Producto = db.Producto;

exports.create = (req, res) => {
    let producto = {};

    try {
        producto.descripcion = req.body.descripcion;
        producto.stock = req.body.stock;
        producto.stock_minimo = req.body.stock_minimo;
        producto.precio_unitario = req.body.precio_unitario;
        producto.Id_proveedor = req.body.Id_proveedor;

        Producto.create(producto).then(result => {
            res.status(200).json({
                message: "Producto creado exitosamente con id = " + result.id_producto,
                producto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el producto!",
            error: error.message
        });
    }
};

exports.getProductoById = (req, res) => {
    let productoId = req.params.id;
    Producto.findByPk(productoId)
        .then(producto => {
            res.status(200).json({
                message: "producto obtenido exitosamente con id = " + productoId,
                producto: producto
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener producto con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);
    
        if (!producto) {
            res.status(404).json({
                message: "No se encontró el empleado para actualizar con id = " + productoId,
                producto: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                descripcion: req.body.descripcion,
                stock: req.body.stock,
                stock_minimo: req.body.stock_minimo,
                precio_unitario: req.body.precio_unitario,
                Id_proveedor: req.body.Id_proveedor
            }
            let result = await Producto.update(updatedObject, {returning: true, where: {id_producto: productoId}});
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un producto con id = " + req.params.id,
                    error: "No se pudo actualizar el producto",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un producto con id = " + productoId,
                producto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No existe el producto con id = " + productoId,
                error: "404",
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del producto con id = " + productoId,
                producto: producto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un producto con id = " + req.params.id,
            error: error.message,
        });
    }
}