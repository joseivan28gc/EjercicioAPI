module.exports = (sequelize, Sequelize) => {
	const Detalle = sequelize.define('detalle', {
		id_facturaDetalle: {
			type: Sequelize.INTEGER, 
			autoIncrement: true,
			primaryKey: true
		},
		Id_linea: {
			type: Sequelize.INTEGER 
		},
		Id_producto: {
			type: Sequelize.INTEGER
		},
		cantidad: {
			type: Sequelize.INTEGER
		}
	});
	
	return Detalle;
}