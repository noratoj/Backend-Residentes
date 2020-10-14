const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3001"
  };

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenidos al manejo de Residentes" });
  });


const db = require("./app/models");

//In development, you may need to drop existing tables and 
//re-sync database. Just use force: true as following code:
//fuente de estudio: https://bezkoder.com/node-js-express-sequelize-mysql/

 db.sequelize.sync({force: false}).then(() => {
    console.log('No se borran las tablas');
});
 

 // routes
require('./app/routes/authorit')(app);
require('./app/routes/torres')(app);
require('./app/routes/pisos')(app);
require('./app/routes/miembros')(app);
require('./app/routes/vecinos')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
