const db = require("../models");
const Member = db.member;

exports.create = (req, res) => {
  // Crear registro nuevo tabla Maestra: Torres a la BD
  Member.create({

    descripcion: req.body.descripcion,
    orden: req.body.orden,
    imagen: req.body.imagen
  })
  .then(data => {
      res.status(200).send({ data: data, message: "Registrado satisfactoriamente!" });
    })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.select = async (req, res) => {
  // Crear registro nuevo tabla Maestra: Torres a la BD
  await Member.findAll({
    
  })
  .then(data => {
      res.status(200).send({ data: data });
    })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;

  await Member.update({
    descripcion: req.body.descripcion,
    orden: req.body.orden,
    imagen: req.body.imagen
  },
  {
    where: { id: id}
  })
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};


