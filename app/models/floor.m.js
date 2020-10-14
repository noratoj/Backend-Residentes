module.exports = (sequelize, Sequelize) => {
    const Floor = sequelize.define("floor", {
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
  
    return Floor;
  };
  