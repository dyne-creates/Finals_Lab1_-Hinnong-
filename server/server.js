const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose
    .connect("mongodb+srv://dyne:dyne@cluster0.i3mwai0.mongodb.net/finals?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch(console.error);
// Schema + Model
const feedbackSchema = new mongoose.Schema({
    studentName: String,
    course: String,
    rating: Number,
    comments: String,
});
const Feedback = mongoose.model("feedback", feedbackSchema, "feedback");
// Routes 
app.post("/feedback", async (req, res) => {
    try {
        const { studentName, course, rating, comments } = req.body;

        const feedbackData = {
            studentName,
            course,
            rating: Number(rating), 
            comments
        };

        const feedback = await Feedback.create(feedbackData);
        res.json({ message: "Feedback sent successfully", feedback });
    } catch (err) {
        console.error("ERROR:", err);  
        res.status(500).json({ error: err.message });
    }
});
// Start server
app.listen(5000, () => console.log("Server running on port 5000"));