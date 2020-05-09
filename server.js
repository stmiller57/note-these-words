// Require in Express and path
const express = require("express");
const path = require("path");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 8080;


// Parse data with the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname, "/public"));

// HTML routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "assets/js/index.html"))

});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "assets/js/notes.html"))

});

// API routes
app.get("/api/notes", (req, res) => {
    res.readFile(db.JSON);
});

// Listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
