import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(
  cors({
    origin: "*", // you can replace "*" with your Netlify frontend URL later
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Health check route
app.get("/health", (req, res) => {
  res.send("✅ Backend is healthy!");
});

// Get all commands
app.get("/commands", async (req, res) => {
  const { data, error } = await supabase.from("voice_commands").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
