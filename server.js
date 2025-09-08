import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// اتصال به Supabase با متغیرهای Railway
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Route برای تست
app.get("/health", (req, res) => {
  res.send("✅ Backend is running!");
});

// Route برای گرفتن دستورات ذخیره‌شده
app.get("/commands", async (req, res) => {
  const { data, error } = await supabase.from("voice_commands").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// اجرای سرور
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
