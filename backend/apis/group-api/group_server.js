const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();


const port = 5001;

//middleware
app.use(cors());
app.use(bodyparser.json);

// db connection

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/api/groups',require('./grouproute'));


app.listen(port, () => console.log(`Server is running in ${port}`));

