const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  //operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//tabla empleado
db.Departamento = require('../models/departamento.model.js')(sequelize, Sequelize);
//tabla empleado
db.Empleado = require('../models/empleado.model.js')(sequelize, Sequelize);
//tabla cliente
db.Cliente = require('../models/cliente.model.js')(sequelize, Sequelize);
//proveedor
db.Proveedor = require('../models/proveedor.model.js')(sequelize, Sequelize);
//producto
db.Producto = require('../models/producto.model.js')(sequelize, Sequelize);
//factura
db.Factura = require('../models/factura.model.js')(sequelize, Sequelize);
//detalles
db.Detalle = require('../models/facturas_detalles.model.js')(sequelize, Sequelize);

module.exports = db;