import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

// middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// health check
app.get("/health", (req, res) => {
  res.send("✅ Health OK");
});

// fetch commands
app.get("/commands", async (req, res) => {
  try {
    const { data, error } = await supabase.from("voice_commands").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// run server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
