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
app.use(express.static("public"));

// HTML routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// // API routes
const notesFile = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

// Retrieve saved notes
app.get("/api/notes", (req, res) => {
    return res.json(notesFile);
});

app.post("/api/notes", (req, res) => {
    notesFile.push(req.body);
    notesFile.forEach((element, i) => {
        element.id = i + 1;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(notesFile));
    res.json(notesFile);
});
// Starter server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
