const { authJwt } = require("../middlewares");
const controller = require("../controllers/pisos");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.post(
    "/api/torres/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  app.get(
      "/api/pisos/list",
      [authJwt.verifyToken],
      controller.select
    );
  
  app.put(
    "/api/torres/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );  

/*

  app.get(
    "/api/torres/select/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.torres
  );

  app.delet(
    "/api/torres/delet/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.torres
  );

 */ 
};
