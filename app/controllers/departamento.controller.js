// Importar la configuración de la base de datos y el modelo Customer
const db = require('../config/db.config.js');
const Departamento = db.Departamento;

// Crear un nuevo cliente(Crear tabla y guardar datos)
exports.create = (req, res) => {
    let departamento = {};//aqui

    try{
        // Construir el objeto Customer a partir del cuerpo de la solicitud
        departamento.description = req.body.description;//cambiar cada uno


        // Guardar en la base de datos
        Departamento.create(departamento).then(result => {    //cambiar nombres
            // Enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Departamento subido exitosamente con el id = " + result.id_departamento,//aqui
                departamento: result,//aqui
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Obtener un cliente por ID
exports.getById_departamento = (req, res) => {
    // Obtener el ID del cliente de los parámetros de la solicitud 
    let departamentoId = req.params.id_departamento;
    Departamento.findByPk(departamentoId)
        .then(departamento => {
           // Enviar los datos del cliente al cliente
            res.status(200).json({
                message: " Departamento obtenido exitosamente con el id = " + departamentoId,
                departamentos: departamento
            });
        })
        . catch(error => {
          // log on console y enviar mensaje de error al cliente
          console.log(error);
  
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  }

  exports.updateById_departamento = async (req, res) => {
    try {
        // Obtener el ID del departamento de los parámetros de la solicitud
        let departamentoId = req.params.id_departamento;

        // Buscar el departamento en la base de datos
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            // Enviar mensaje de error si el departamento no existe
            return res.status(404).json({
                message: "Not Found for updating a department with id = " + departamentoId,
                departamento: "",
                error: "404"
            });
        } else {
            // Construir el objeto actualizado con los datos de la solicitud
            let updatedObject = {
                description: req.body.description
            };

            // Actualizar el departamento en la base de datos
            let [rowsUpdated, [updatedDepartment]] = await Departamento.update(updatedObject, {
                returning: true,
                where: { id_departamento: departamentoId }
            });

            // Verificar si la actualización tuvo éxito
            if (rowsUpdated === 0) {
                return res.status(500).json({
                    message: "Error -> Can not update a department with id = " + departamentoId,
                    error: "Can NOT Update",
                });
            }

            // Enviar mensaje de éxito y el departamento actualizado al cliente
            res.status(200).json({
                message: "Update successfully a Department with id = " + departamentoId,
                departamento: updatedDepartment,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a department with id = " + req.params.id_departamento,
            error: error.message
        });
    }
};

// Eliminar un cliente por ID
exports.deleteById_departamento = async (req, res) => {
    try{
      // Obtener el ID del cliente de los parámetros de la solicitud
        let departamentoId = req.params.id_departamento;
        // Obtener el ID del cliente de los parámetros de la solicitud
        let departamento = await Departamento.findByPk(departamentoId);

        if(!departamento){
          // Enviar mensaje de error si el cliente no existe
            res.status(404).json({
                message: "Does Not exist a Libro with id = " + departamentoId,
                error: "404",
            });
        } else {
          // Eliminar el cliente de la base de datos
            await departamento.destroy();
            // Enviar mensaje de éxito y el cliente eliminado al cliente
            res.status(200).json({
                message: "Libro eliminado exitosamente con el id = " + departamentoId,
                departamento: departamento,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id_departamento,
            error: error.message,
        });
    }
}