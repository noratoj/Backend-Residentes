module.exports = (sequelize, Sequelize) => {
    const Building = sequelize.define("building", {
      descripcion: {
        type: Sequelize.STRING
      },

      orden:  {
        type: Sequelize.INTEGER
      },
 
      imagen:  {
        type: Sequelize.STRING
      },
 
    });
  
    return Building;
  };
  