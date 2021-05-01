const express = require("./node_modules/express");
const bodyParser = require("./node_modules/body-parser");
const cors = require("./node_modules/cors");

const app = express();
const db = require("./app/models");
/*
var corsOptions = {
  origin: "*",
  methods: "GET, PUT,POST, DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  preflightContinue: false,
};

app.use(cors(corsOptions));
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync();