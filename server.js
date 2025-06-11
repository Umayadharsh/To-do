import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const dbFile = "db.json";

app.get("/tasks", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbFile));
  res.json(data.tasks);
});

app.post("/tasks", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbFile));
  const newTask = { id: Date.now(), ...req.body };
  data.tasks.push(newTask);
  fs.writeFileSync(dbFile, JSON.stringify(data));
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbFile));
  const taskIndex = data.tasks.findIndex((t) => t.id == req.params.id);
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });
  data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...req.body };
  fs.writeFileSync(dbFile, JSON.stringify(data));
  res.json(data.tasks[taskIndex]);
});

app.delete("/tasks/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbFile));
  data.tasks = data.tasks.filter((t) => t.id != req.params.id);
  fs.writeFileSync(dbFile, JSON.stringify(data));
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
