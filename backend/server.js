import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const linkSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  url: String,
  expiry: Date,
});

const Link = mongoose.model("Link", linkSchema);

// ✅ Shorten URL
app.post("/api/shorten", async (req, res) => {
  const { url, timeLimit } = req.body;
  const shortId = nanoid(6);
  const expiry = new Date(Date.now() + timeLimit * 60 * 1000);

  const newLink = new Link({ shortId, url, expiry });
  await newLink.save();

  res.json({ shortUrl: `http://hariurl/s/${shortId}` });
});

// ✅ Redirect
app.get("/s/:id", async (req, res) => {
  const link = await Link.findOne({ shortId: req.params.id });

  if (!link) return res.status(404).send("Link not found");
  if (new Date() > link.expiry) return res.status(410).send("Link expired");

  res.redirect(link.url);
});

app.listen(5000, () => console.log("✅ Backend running at http://localhost:5000"));