module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
      username: {
        type: Sequelize.STRING
      },

      nro_cedula:  {
        type: Sequelize.STRING,
        required: true,
      },
 
      nombres:  {
        type: Sequelize.STRING,
        required: true,
      },
 
      apellidos:  {
        type: Sequelize.STRING,
        required: true,
      },
 
      celular: Sequelize.STRING,
 
      correo_elec:  {
        type: Sequelize.STRING,
        required: true,
      },

      estatus: Sequelize.STRING,

      contrasena: {
        type: Sequelize.STRING,
        required: true,
      }
    });
  
    return Usuario;
  };
  