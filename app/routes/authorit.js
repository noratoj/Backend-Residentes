const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/authorit");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",
    [
      verifySignUp.checkDuplicateUsernameOrCorreo,
      verifySignUp.checkRolesExisted
    ],
    controller.register
  );

  app.post("/api/auth/login", controller.login);
};