module.exports = (sequelize, Sequelize) => {
	const Factura = sequelize.define('factura', {
		id_factura: {
			type: Sequelize.INTEGER, 
			autoIncrement: true,
			primaryKey: true
		},
		No_factura: {
			type: Sequelize.INTEGER 
		},
		serie: {
			type: Sequelize.STRING
		},
		Id_cliente: {
			type: Sequelize.INTEGER
		},
		Id_empleado: {
			type: Sequelize.INTEGER
		},
		fecha_fac: {
			type: Sequelize.DATE
		}
	});
	
	return Factura;
}