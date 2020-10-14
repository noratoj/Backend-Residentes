module.exports = (sequelize, Sequelize) => {
    const Vecino = sequelize.define("vecino", {
      nro_cedula: {
        type: Sequelize.STRING
      },
 
      nombre1:  {
        type: Sequelize.STRING,
        required: true,
      },
      nombre_2:  {
        type: Sequelize.STRING,
      },
      apellido_1:  {
        type: Sequelize.STRING,
        required: true,
      },
      apellido_2: Sequelize.STRING,
      id_miembro: Sequelize.INTEGER,
      tipo_cedula: Sequelize.STRING,
      telefono_1: Sequelize.STRING,
      telefono_2: Sequelize.STRING,
      
      correo_elec:  {
        type: Sequelize.STRING,
        required: true,
      },

      
      lider_calle: Sequelize.STRING,
      activo_pase: Sequelize.STRING,

      id_torre:  {
        type: Sequelize.INTEGER,
        required: true,
      },

      id_piso:  {
        type: Sequelize.INTEGER,
        required: true,
      },

      apto:  {
        type: Sequelize.STRING,
        required: true,
      },

      fecha_nac: Sequelize.DATE,
      profesion: Sequelize.STRING,
      medicamentos: Sequelize.STRING,
      observacion: Sequelize.STRING,
      antecedentes: Sequelize.STRING,
      estructura_condom: Sequelize.INTEGER,
      orden_fam: Sequelize.INTEGER,
      grupo_fam: Sequelize.INTEGER,
      agrupado_color: Sequelize.INTEGER,
      vocero: Sequelize.INTEGER,
      sexo: Sequelize.STRING,
      tipo_voto: Sequelize.STRING    
    },
    {
      timestamps: true,
    }
  
    );
  
    return Vecino;
  };
  