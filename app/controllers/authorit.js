const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  // Save User to Database
  User.create({

    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    nro_cedula: req.body.nro_cedula,
    celular: req.body.celular,
    correo_elec: req.body.correo_elec,
    username: req.body.username,
    estatus: req.body.estatus,
    contrasena: bcrypt.hashSync(req.body.contrasena, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuario registrado satisfactoriamente!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Usuario registrado satisfactoriamente!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      correo_elec: req.body.correo_elec
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no esta registrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.contrasena,
        user.contrasena
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Contraseña invalida!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 28800 //8 hrs    86400 = 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          correo_elec: user.correo_elec,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
