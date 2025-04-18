const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://whymynameisaflah:Aflah210@readit.srjmofw.mongodb.net/yourdbname?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// Establish MongoDB connection
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
