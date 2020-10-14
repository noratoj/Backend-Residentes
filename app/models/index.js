const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./usuario.m.js")(sequelize, Sequelize);
db.role = require("./role.m.js")(sequelize, Sequelize);

db.building = require("./building.m.js")(sequelize, Sequelize);
db.floor = require("./floor.m.js")(sequelize, Sequelize);
db.member = require("./member.m.js")(sequelize, Sequelize);
db.vecino = require("./vecino.m.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
