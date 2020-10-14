const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrCorreo = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Falla!. Username ya esta definido!"
      });
      return;
    }

    // Correo electronico o emaaaail
    User.findOne({
      where: {
        correo_elec: req.body.correo_elec
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Falla! Correo ya esta asignado!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrCorreo: checkDuplicateUsernameOrCorreo,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;