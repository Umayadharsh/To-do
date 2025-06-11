import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT) || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Correct file path to db.json
const dbFile = path.join(__dirname, "db", "db.json");

// Helper to read JSON
function readData() {
  const raw = fs.readFileSync(dbFile, "utf-8");
  return JSON.parse(raw);
}

// Helper to write JSON
function writeData(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

// Routes
app.get("/tasks", (req, res) => {
  try {
    const data = readData();
    res.json(data.tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to read tasks" });
  }
});

app.post("/tasks", (req, res) => {
  try {
    const data = readData();
    const newTask = { id: Date.now(), ...req.body };
    data.tasks.push(newTask);
    writeData(data);
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.put("/tasks/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });
    data.tasks[index] = { ...data.tasks[index], ...req.body };
    writeData(data);
    res.json(data.tasks[index]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    data.tasks = data.tasks.filter(t => t.id !== id);
    writeData(data);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});
app.get("/tasks/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    const task = data.tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to get task" });
  }
});


app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
