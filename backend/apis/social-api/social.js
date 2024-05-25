const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');  //for preventing xss
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const userroute = require('./routes/user');
const auth = require('./routes/auth');


dotenv.config();

const app = express();

const port = 5000;


// Middleware
app.use(express.json());
app.use(helmet()); 
app.use(morgan('common')); 
app.use(cors()); 


// Routes
app.use("/api/users", userroute);
app.use("/api/auth",auth);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });