const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/quicknotes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the Note schema and model
const NoteSchema = new mongoose.Schema({ content: String });
const Note = mongoose.model("Note", NoteSchema);

// API endpoint to create a new note
app.post("/notes", async (req, res) => {
    try {
        const newNote = new Note({ content: req.body.content });
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        res.status(500).json({ error: "Failed to create a new note" });
    }
});

// API endpoint to fetch all notes
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

// API endpoint to delete a note
app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the note" });
    }
});

// Start the server on port 5001
app.listen(5001, () => console.log("Server running on port 5001"));