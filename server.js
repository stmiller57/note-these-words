// Require in express and path, choose a port for connection
const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");


// Parse data with the Express app
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());





// Route definitions
app.get("/")


// Listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
