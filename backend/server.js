// import express from "express";
// import cors from "cors";
// import { nanoid } from "nanoid";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// // ✅ Schema & Model
// const linkSchema = new mongoose.Schema({
//   shortId: { type: String, unique: true },
//   url: String,
//   expiry: Date,
// });

// const Link = mongoose.model("Link", linkSchema);

// // ✅ Shorten URL
// app.post("/api/shorten", async (req, res) => {
//   const { url, timeLimit } = req.body;
//   const shortId = nanoid(6);
//   const expiry = new Date(Date.now() + timeLimit * 60 * 1000);

//   const newLink = new Link({ shortId, url, expiry });
//   await newLink.save();

//   res.json({ shortUrl: `http://hariurl/s/${shortId}` });
// });

// // ✅ Redirect
// app.get("/s/:id", async (req, res) => {
//   const link = await Link.findOne({ shortId: req.params.id });

//   if (!link) return res.status(404).send("Link not found");
//   if (new Date() > link.expiry) return res.status(410).send("Link expired");

//   res.redirect(link.url);
// });

// app.listen(5000, () => console.log("✅ Backend running at http://localhost:5000"));






import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const linkSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  url: String,
  expiry: Date,
});

const Link = mongoose.model("Link", linkSchema);

// ✅ Shorten URL API
app.post("/api/shorten", async (req, res) => {
  try {
    const { url, timeLimit } = req.body;

    if (!url || !timeLimit) {
      return res.status(400).json({ error: "URL and timeLimit are required" });
    }

    const shortId = nanoid(6);
    const expiry = new Date(Date.now() + timeLimit * 60 * 1000);

    const newLink = new Link({ shortId, url, expiry });
    await newLink.save();

    res.json({ shortUrl: `${process.env.BASE_URL}/s/${shortId}` });
  } catch (err) {
    console.error("❌ Error in /api/shorten:", err);
    res.status(500).json({ error: "Server error" });
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
    console.error("❌ Error in /s/:id:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Serve React Frontend (Single Deployment)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
