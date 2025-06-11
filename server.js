const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// In-memory tasks array (replace with DB in real apps)
let tasks = [
  { id: 1, task: "Buy milk", status: false, updatedat: Date.now() },
  { id: 2, task: "Do homework", status: true, updatedat: Date.now() },
];

// GET /tasks - get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// PUT /tasks/:id - toggle task status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Toggle status & update timestamp
  tasks[taskIndex].status = !tasks[taskIndex].status;
  tasks[taskIndex].updatedat = Date.now();

  res.json(tasks[taskIndex]);
});

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Backend is working! Try GET /tasks');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
