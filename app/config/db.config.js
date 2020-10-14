module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "3875",
    DB: "condo",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };