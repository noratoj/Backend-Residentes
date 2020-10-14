const db = require("../models");
var sequelize = db.sequelize;
const Vecino = db.vecino;

exports.create = (req, res) => {
  // Crear registro nuevo tabla Vecinos
  // data
  const { nro_cedula, nombre1, nombre_2, apellido_1, apellido_2, id_miembro, telefono_1, telefono_2, correo_elec, id_torre, id_piso, apto, fecha_nac, profesion, grupo_fam, orden_fam  } = req.body;

  Vecino.create({

    nro_cedula: nro_cedula,
    nombre1: nombre1,
    nombre_2: nombre_2,
    apellido_1: apellido_1,
    apellido_2: apellido_2,
    id_miembro: id_miembro,
    telefono_1: telefono_1,
    telefono_2: telefono_2,
    correo_elec: correo_elec,
    id_torre: id_torre,
    id_piso: id_piso,
    apto: apto,
    fecha_nac: fecha_nac,
    profesion: profesion,
    grupo_fam: grupo_fam, 
    orden_fam: orden_fam
  })
  .then(data => {
      res.status(200).send({ success: true, data: data, message: "Registrado satisfactoriamente!" });
    })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.select = async (req, res) => {
  // Seleccionar todos los vecinos o residentes
  await Vecino.findAll({
    
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
  const { nro_cedula, nombre1, nombre_2, apellido_1, apellido_2, id_miembro, telefono_1, telefono_2, correo_elec, id_torre, id_piso, apto, fecha_nac, profesion, sexo  } = req.body;

  await Vecino.update({
    nro_cedula: nro_cedula,
    nombre1: nombre1,
    nombre_2: nombre_2,
    apellido_1: apellido_1,
    apellido_2: apellido_2,
    id_miembro: id_miembro,
    telefono_1: telefono_1,
    telefono_2: telefono_2,
    correo_elec: correo_elec,
    id_torre: id_torre,
    id_piso: id_piso,
    apto: apto,
    fecha_nac: fecha_nac,
    profesion: profesion,
    sexo: sexo
  },
  {
    where: { id: id}
  })
  .then(data => {
    res.status(200).send({ success: true, data: data, message: "Actualizado satisfactoriamente!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};


exports.torres = async (req, res) => {
  // Seleccionar todos los vecinos o residentes
  const data = await sequelize.query("SELECT count(*) as nro_hab, b.* FROM `vecinos` a, buildings b where a.id_torre=b.id group by a.id_torre", {
    type: sequelize.QueryTypes.SELECT
  });
      res.status(200).send({ data: data });
  
};

exports.dettor = async (req, res) => {

  const data = await sequelize.query("SELECT count(*) as nro_hab, a.id_torre as torre, b.* FROM `vecinos` a, floors b where a.id_piso=b.id and a.id_torre= (:id) group by a.id_piso  ", {
    replacements: {id: req.params.id},
    type: sequelize.QueryTypes.SELECT
  });
  
  res.json({success : true, data : data});
  
}


exports.detpiso = async (req, res) => {
  // Seleccionar todos los vecinos o residentes
  const { id } = req.params;
  const { id_tor } = req.params;
  
  await Vecino.findAll({
    where: { id_piso: id, id_torre: id_tor },
    order: ['apto'],  
  })
  .then(data => {
      res.status(200).send({ data: data });
    })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
    
exports.get = async (req, res) => {
  const { id } = req.params;

  await Vecino.findAll({
    where: { id: id}
  })
  .then(data => {
    res.status(200).send({ success: true, data: data });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

// se podrá traer de una vez los datos de los del grupo familiar?
exports.grupo = async (req,res) => {
  const { id } = req.params;
  
  await Vecino.findAll({
      where: { grupo_fam: id }
  })
  .then(data => {
    res.status(200).send({ success: true, data: data });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

