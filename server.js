// Require in Express, path, fs
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 8080;


// Parse data with the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// HTML routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// API routes
const data = JSON.parse(fs.readFileSync("db/db.json"));

app.get("/api/notes", (req, res) => {
    res.json(data);
});

app.post("/api/notes", (req, res) => {
    data.push(req.body);
    res.json(true);
});

app.delete("api/notes/:id");

// Listener
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
