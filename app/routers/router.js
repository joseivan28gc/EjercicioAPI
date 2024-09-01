let express = require('express');
let router = express.Router();
 
//Importar tablas
const departamentos = require('../controllers/departamento.controller.js');
const empleados = require('../controllers/empleado.controller.js');
const clientes = require('../controllers/cliente.controller.js');
const proveedores = require('../controllers/proveedor.controller.js');
const productos = require('../controllers/producto.controller.js');
const facturas = require('../controllers/factura.controller.js');
const facturas_detalles = require('../controllers/facturas_detalles.controller.js');

//Tabla Departamento
router.post('/api/departamentos/create', departamentos.create);
router.get('/api/departamentos/onebyid/:id_departamento', departamentos.getById_departamento);
router.put('/api/departamentos/update/:id_departamento', departamentos.updateById_departamento);
router.delete('/api/departamentos/delete/:id', departamentos.deleteById_departamento);

//Tabla Empleados
router.post('/api/empleados/create', empleados.create);
router.get('/api/empleados/all', empleados.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id', empleados.getEmpleadoById);
router.put('/api/empleados/update/:id', empleados.updateById);
router.delete('/api/empleados/delete/:id', empleados.deleteById);

//Tabla clientes
router.post('/api/clientes/create', clientes.create);
router.get('/api/clientes/onebyid/:id', clientes.getClienteById);
router.put('/api/clientes/update/:id', clientes.updateById);
router.delete('/api/clientes/delete/:id', clientes.deleteById);

//proveedors
router.post('/api/proveedores/create', proveedores.create);
router.get('/api/proveedores/onebyid/:id', proveedores.getProveedorById);
router.put('/api/proveedores/update/:id', proveedores.updateById);
router.delete('/api/proveedores/delete/:id', proveedores.deleteById);

//productos
router.post('/api/productos/create', productos.create);
router.get('/api/productos/onebyid/:id', productos.getProductoById);
router.put('/api/productos/update/:id', productos.updateById);
router.delete('/api/productos/delete/:id', productos.deleteById);

//factura
router.post('/api/facturas/create', facturas.create);
router.get('/api/facturas/onebyid/:id', facturas.getFacturaById);
router.put('/api/facturas/update/:id', facturas.updateById);
router.delete('/api/facturas/delete/:id', facturas.deleteById);

//Detalles de la factura
router.post('/api/facturas_detalles/create', facturas_detalles.create);
router.get('/api/facturas_detalles/onebyid/:id', facturas_detalles.getFacturaDetalleById);
router.put('/api/facturas_detalles/update/:id', facturas_detalles.updateById);
router.delete('/api/facturas_detalles/delete/:id', facturas_detalles.deleteById);

module.exports = router;