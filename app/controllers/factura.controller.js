const db = require('../config/db.config.js');
const Factura = db.Factura;

exports.create = (req, res) => {
    let factura = {};

    try {
        factura.No_factura = req.body.No_factura;
        factura.serie = req.body.serie;
        factura.Id_cliente = req.body.Id_cliente;
        factura.Id_empleado = req.body.Id_empleado;
        factura.fecha_fac = req.body.fecha_fac;

        Factura.create(factura).then(result => {
            res.status(200).json({
                message: "factura creado exitosamente con id = " + result.id_factura,
                factura: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el factura!",
            error: error.message
        });
    }
};

exports.getFacturaById = (req, res) => {
    let facturaId = req.params.id;
    Factura.findByPk(facturaId)
        .then(factura => {
            res.status(200).json({
                message: "factura obtenido exitosamente con id = " + facturaId,
                factura: factura
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener factura con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);
    
        if (!factura) {
            res.status(404).json({
                message: "No se encontró el factura para actualizar con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                No_factura: req.body.No_factura,
                serie: req.body.serie,
                Id_cliente: req.body.Id_cliente,
                Id_empleado: req.body.Id_empleado,
                fecha_fac: req.body.fecha_fac
            }
            let result = await Factura.update(updatedObject, {returning: true, where: {id_factura: facturaId}});
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un factura con id = " + req.params.id,
                    error: "No se pudo actualizar el factura",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un factura con id = " + facturaId,
                factura: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un factura con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe el factura con id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del factura con id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un factura con id = " + req.params.id,
            error: error.message,
        });
    }
}