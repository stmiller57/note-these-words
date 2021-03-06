// Require in Express, path, fs
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 4340;


// Parse data with the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML route for notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// API route for retrieving saved notes
app.get("/api/notes", (req, res) => {
    return res.json(JSON.parse(fs.readFileSync("db/db.json")));
});
let notesFile = [];

// API route to write new notes to db.json file
app.post("/api/notes", (req, res) => {
    let newNote = req.body
    notesFile.push(newNote);
    notesFile.forEach((element, i) => {
        element.id = i + 1;
    });
    console.log(notesFile, "This is the notes file");
    fs.writeFileSync("db/db.json", JSON.stringify(notesFile));
    res.json(notesFile);
});

// API delete route
app.delete("/api/notes/:id", (req, res) => {
    let idNumber = req.params.id;
    notesFile = notesFile.filter((newNote) => {
        return newNote.id != idNumber;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(notesFile));
    return res.json(notesFile);
});

// HTML get route for loading the index page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});
// Start server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});