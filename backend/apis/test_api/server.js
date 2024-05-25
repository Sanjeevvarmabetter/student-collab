const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Connect to MongoDB
mongoose.connect('mongodb+srv://shore:shore@cluster0.uubfvtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Define API routes
const routes = require('./routes');
app.use('/api', routes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});