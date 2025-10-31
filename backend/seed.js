import mongoose from "mongoose";
import dotenv from "dotenv";
import menuData from "./seedData.js"; // aapka seedData.js

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/menucard";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  img: String,
});

const Product = mongoose.model("Product", productSchema);

const seedDB = async () => {
  try {
    // Existing products delete karenge
    await Product.deleteMany({});
    console.log("Existing products removed");

    // Seed data insert karenge
    await Product.insertMany(menuData);
    console.log("Seed data inserted successfully!");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error seeding DB:", err);
  }
};

seedDB();
