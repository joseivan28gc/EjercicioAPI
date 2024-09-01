module.exports = (sequelize, Sequelize) => {
	const Departamento = sequelize.define('departamentos', {	
	  id_departamento: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  description: {
			type: Sequelize.STRING
	  },
    
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Departamento;
}