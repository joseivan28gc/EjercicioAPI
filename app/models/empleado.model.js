module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
        id_emp: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        primer_nombre: {
            type: Sequelize.STRING
        },
        segundo_nombre: {
            type: Sequelize.STRING
        },
        primer_apellido: {
            type: Sequelize.STRING
        },
        
        segundo_apellido: {
            type: Sequelize.STRING
        },
        nit:{
            type: Sequelize.STRING
        },
        salario: {
            type: Sequelize.FLOAT
        },
        estatus:{
            type: Sequelize.INTEGER
        }
    });
    return Empleado;
};