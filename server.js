const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// ✅ Correct Non-SRV MongoDB URI
const mongoURI = "mongodb://nidhiwankhede5:Nidhi%40%21123@ac-xce4bvy-shard-00-00.0yuu4dv.mongodb.net:27017,ac-xce4bvy-shard-00-01.0yuu4dv.mongodb.net:27017,ac-xce4bvy-shard-00-02.0yuu4dv.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-4dw04b-shard-0&authSource=admin&retryWrites=true&w=majority";

// ✅ Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Route to handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.send('<h2>✅ User successfully saved to MongoDB!</h2><a href="/form.html">Back to form</a>');
  } catch (err) {
    res.status(500).send('❌ Error saving user: ' + err.message);
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
