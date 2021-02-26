//Requiring NPM Express and file save to be used.
const express = require("express");
const fs = require("fs");

//standard set express to variable app and Port to either whatever is in the environmental variable port or local host 8014
var app = express();
var PORT = process.env.PORT || 8014;

//Set middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./"));

//require the routes that we have set up in our routing folder.
require("./Develop/db/routing/html-routes")(app);
require("./Develop/db/routing/api")(app);

//Starts the server listening and creates a console log message that the app is listening at PORT 8014 or the environmental variable port.
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
