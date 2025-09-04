import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => res.send("Server is running..."));

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
