const { authJwt } = require("../middlewares");
const controller = require("../controllers/vecinos");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post(
    "/api/vecinos/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  app.get(
      "/api/vecinos/list",
      [authJwt.verifyToken],
      controller.select
    );
    
  app.post(
    "/api/vecinos/update/:id",
    [authJwt.verifyToken],
    controller.update
  );  

  //select id_torre as name, count(distinct id) as description from vecinos group by id_torre
  app.get(
    "/api/vecinos/torres",
    [authJwt.verifyToken],
    controller.torres
  );  

  app.get(
    "/api/vecinos/dettor/:id",
    [authJwt.verifyToken],
    controller.dettor
  );  

  app.get(
    "/api/vecinos/detpiso/:id_tor/:id",
    [authJwt.verifyToken],
    controller.detpiso
  );  

  //Obtener los datos del residente solicitado
  app.get(
    "/api/vecinos/get/:id",
    [authJwt.verifyToken],
    controller.get
  );  

  //Obtener los datos del residente solicitado
  app.get(
    "/api/vecinos/grupo/:id",
    [authJwt.verifyToken],
    controller.grupo
  );  
    
};
