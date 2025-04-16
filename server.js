const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Read the database file
const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// API Routes
app.get('/api/v1/memes', (req, res) => {
  res.json(db.memes);
});

app.get('/api/v1/memes/:id', (req, res) => {
  const meme = db.memes.find(m => m.id === parseInt(req.params.id));
  if (!meme) return res.status(404).json({ error: 'Meme not found' });
  res.json(meme);
});

app.put('/api/v1/memes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.memes.findIndex(m => m.id === id);
  
  if (index === -1) return res.status(404).json({ error: 'Meme not found' });
  
  // Validate input
  const { name, image, likes } = req.body;
  
  if (!name || name.length < 3 || name.length > 100) {
    return res.status(400).json({ error: 'Name must be between 3 and 100 characters' });
  }
  
  if (!image || !isValidUrl(image) || !image.match(/\.(jpg|jpeg)$/i)) {
    return res.status(400).json({ error: 'Image must be a valid JPG URL' });
  }
  
  if (likes === undefined || likes < 0 || likes > 99 || !Number.isInteger(likes)) {
    return res.status(400).json({ error: 'Likes must be an integer between 0 and 99' });
  }
  
  // Update meme
  db.memes[index] = { ...db.memes[index], name, image, likes };
  
  // In a real app, you would write this back to the file
  // For this example, changes will only persist in memory during the session
  // fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  
  res.json(db.memes[index]);
});

// Helper function to validate URLs
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// For any other GET request, send back the React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});