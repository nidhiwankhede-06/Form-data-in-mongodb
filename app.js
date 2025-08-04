// new.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 2000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB Atlas connection — Make sure your IP is whitelisted in Atlas
mongoose.connect(
  'mongodb+srv://nidhiwankhede5:Nidhi%40%21123@cluster0.0yuu4dv.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

// Render form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Save form data to MongoDB
app.post('/submit', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.send('✅ User saved successfully!');
  } catch (err) {
    res.status(500).send('❌ Failed to save user');
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
