const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get MongoDB connection string from environment variables or default to Docker Compose service
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongodb:27017/quicknotes"; // ✅ Fixed

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

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
        console.error("❌ Error creating note:", error);
        res.status(500).json({ error: "Failed to create a new note" });
    }
});

// API endpoint to fetch all notes
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.error("❌ Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

// API endpoint to delete a note
app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "✅ Note Deleted" });
    } catch (error) {
        console.error("❌ Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete the note" });
    }
});

// Start the server on port 5001
const PORT = process.env.PORT || 5001; // ✅ Allows flexibility if deployed elsewhere
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));