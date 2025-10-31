// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Serve uploaded images
app.use("/uploads", express.static(uploadDir));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/menucard";
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  img: String,
});
const Product = mongoose.model("Product", productSchema);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ===== Routes =====

// ✅ GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST add new product
app.post("/products", upload.single("img"), async (req, res) => {
  try {
    console.log("📩 Incoming data:", req.body);
    console.log("🖼️ Uploaded file:", req.file);

    const { name, price, category } = req.body;

    // Validation checks
    if (!req.file) return res.status(400).json({ error: "Image required" });
    if (!name || !price || !category) {
      return res.status(400).json({ error: "All fields required" });
    }

    const img = `/uploads/${req.file.filename}`;

    // 🔹 Convert price to number
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return res.status(400).json({ error: "Invalid price format" });
    }

    // 🔹 Create document
    const newProduct = new Product({
      name,
      price: numericPrice,
      category,
      img,
    });

    // 🔹 Save with error tracking
    const saved = await newProduct.save();

    if (!saved || !saved._id) {
      console.error("❌ MongoDB insert failed, no document returned");
      return res.status(500).json({ error: "Failed to save in DB" });
    }

    console.log("✅ Saved to DB:", saved);
    res.json({ success: true, product: saved });
  } catch (err) {
    console.error("❌ Error saving product:", err);
    res.status(500).json({ error: err.message });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
