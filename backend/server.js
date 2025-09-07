
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Schema & Model
const linkSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  url: { type: String, required: true },
  expiry: { type: Date, required: true },
});
const Link = mongoose.model("Link", linkSchema);

// ✅ Debug route
app.get("/api/debug", (req, res) => {
  res.json({
    mongoUri: process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing",
    baseUrl: process.env.BASE_URL || "❌ Missing",
    mongoStatus: mongoose.connection.readyState, // 1 = connected
  });
});

// ✅ Shorten URL API
app.post("/api/shorten", async (req, res) => {
  try {
    console.log("📩 Body received:", req.body);

    const { url, timeLimit } = req.body;

    if (!url || !timeLimit) {
      return res.status(400).json({ error: "URL and timeLimit are required" });
    }

    const limit = Number(timeLimit);
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: "timeLimit must be a positive number" });
    }

    const shortId = nanoid(6);
    const expiry = new Date(Date.now() + limit * 60 * 1000);

    const newLink = new Link({ shortId, url, expiry });
    await newLink.save();

    console.log("✅ Link saved:", newLink);

    res.json({ shortUrl: `${process.env.BASE_URL}/s/${shortId}` });
  } catch (err) {
    console.error("❌ Error in /api/shorten:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Redirect
app.get("/s/:id", async (req, res) => {
  try {
    const link = await Link.findOne({ shortId: req.params.id });

    if (!link) return res.status(404).send("Link not found");
    if (new Date() > link.expiry) return res.status(410).send("Link expired");

    res.redirect(link.url);
  } catch (err) {
    console.error("❌ Error in /s/:id:", err.message);
    res.status(500).send("Server error");
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
