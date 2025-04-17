
const express = require("express")

const app= express();

app.use(express.json())




app.use(express.json());

// Import controllers
const { createNewUser } = require("./controller/DataController");
const { searchImages, SavePhoto, AddTagsTophoto, SerchBytags, getSerchhistorey } = require("./controller/iteinaycontroll");

// Define Routes
app.post("/api/users", createNewUser);
app.get("/search/photos", searchImages);
app.post("/save/photo", SavePhoto);
app.post("/api/photos/:photoId/tags", AddTagsTophoto);
app.get("/api/photos/tag/search", SerchBytags);
app.get("/api/search-history", getSerchhistorey);

module.exports = app;  // Export only the app instance
