module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("member", {
      descripcion: {
        type: Sequelize.STRING
      },

      orden:  {
        type: Sequelize.INTEGER
      },
       
    });
  
    return Member;
  };
  