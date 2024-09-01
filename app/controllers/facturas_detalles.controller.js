const db = require('../config/db.config.js');
const Detalle = db.Detalle;

exports.create = (req, res) => {
    let detalle = {};

    try {
        detalle.Id_linea = req.body.Id_linea;
        detalle.Id_producto = req.body.Id_producto;
        detalle.cantidad = req.body.cantidad;

        Detalle.create(detalle).then(result => {
            res.status(200).json({
                message: "Factura detalle creado exitosamente con id = " + result.id_facturaDetalle,
                detalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el Factura detalle!",
            error: error.message
        });
    }
};

exports.getFacturaDetalleById = (req, res) => {
    let detalleId = req.params.id;
    Detalle.findByPk(detalleId)
        .then(detalle => {
            res.status(200).json({
                message: "detalle obtenido exitosamente con id = " + detalleId,
                detalle: detalle
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener detalle con id!",
                error: error
            });
        });
};


exports.updateById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await Detalle.findByPk(detalleId);
    
        if (!detalle) {
            res.status(404).json({
                message: "No se encontró el detalle para actualizar con id = " + detalleId,
                detalle: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                Id_linea: req.body.Id_linea,
                Id_producto: req.body.Id_producto,
                cantidad: req.body.cantidad
            }
            let result = await Detalle.update(updatedObject, {returning: true, where: {id_facturaDetalle: detalleId}});
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un detalle con id = " + req.params.id,
                    error: "No se pudo actualizar el detalle",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de una Factura detalle con id = " + detalleId,
                detalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un detalle con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await Detalle.findByPk(detalleId);

        if (!detalle) {
            res.status(404).json({
                message: "No existe el detalle con id = " + detalleId,
                error: "404",
            });
        } else {
            await detalle.destroy();
            res.status(200).json({
                message: "Eliminación exitosa de la Factura detalle con id = " + detalleId,
                detalle: detalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un detalle con id = " + req.params.id,
            error: error.message,
        });
    }
}