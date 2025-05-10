const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemsRoutes = require('./routes/items');

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Use the items routes
app.use('/api/items', itemsRoutes);

// Simple route to verify server is running
app.get('/', (req, res) => {
  res.send('Campus Lost & Found System Backend is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
