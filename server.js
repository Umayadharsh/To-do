const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use(cors());
app.use(express.json());

// Dummy tasks (replace with DB or dynamic logic in future)
const tasks = [
  { id: 1, task: "Buy milk", status: false, updatedat: Date.now() },
  { id: 2, task: "Do homework", status: true, updatedat: Date.now() }
];

// GET /tasks route
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Root route (just to confirm it works)
app.get('/', (req, res) => {
  res.send('Backend is working! Try GET /tasks');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
