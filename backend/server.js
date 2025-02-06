const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // ✅ Load environment variables from .env file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get MongoDB connection string from environment variables or default to local Docker service
const MONGO_URI = process.env.MONGO_URL || "mongodb://mongodb:27017/quicknotes";

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit process if MongoDB fails
    });

// Define the Note schema and model
const NoteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Note = mongoose.model("Note", NoteSchema);

// 📝 Create a new note
app.post("/notes", async (req, res) => {
    try {
        const { content } = req.body;
        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "Note content is required" });
        }

        const newNote = new Note({ content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error("❌ Error creating note:", error);
        res.status(500).json({ error: "Failed to create a new note" });
    }
});

// 📜 Fetch all notes (sorted newest first)
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        console.error("❌ Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

// 🗑 Delete a note by ID
app.delete("/notes/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json({ message: "✅ Note Deleted", deletedNote });
    } catch (error) {
        console.error("❌ Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete the note" });
    }
});

// 🔍 Health check endpoint (useful for Railway, Kubernetes, etc.)
app.get("/health", (req, res) => {
    res.json({ status: "✅ API is running", timestamp: new Date().toISOString() });
});

// Start the server on a dynamic port (Railway, Docker) or 5001 locally
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
