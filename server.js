const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Sample API
app.get('/tasks', (req, res) => {
  res.json([{ id: 1, title: 'Task 1' }]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
