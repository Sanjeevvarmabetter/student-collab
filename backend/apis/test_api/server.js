const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Connect to MongoDB
mongoose.connect('mongodb+srv://hack:hack@cluster0.oxqrslb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Define API routes
const routes = require('./routes');
app.use('/api', routes);

// Start the server
const port = 3300;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});