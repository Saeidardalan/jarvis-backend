import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// اتصال به Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// تست API
app.get("/", (req, res) => {
  res.send("🚀 Jarvis API is running!");
});

// گرفتن همه voice_commands
app.get("/commands", async (req, res) => {
  const { data, error } = await supabase.from("voice_commands").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// اضافه کردن command جدید
app.post("/commands", async (req, res) => {
  const { command_name, activation_phrase, action_type, action_content } = req.body;
  const { data, error } = await supabase
    .from("voice_commands")
    .insert([{ command_name, activation_phrase, action_type, action_content }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
