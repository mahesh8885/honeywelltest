// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const DynamicModel =require('./RegistrationController/RegistrationSchema');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/honeywelltest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  

// Middleware
app.use(bodyParser.json());

app.use(cors("*"));

app.post('/register', async (req, res) => {
  try {
    const newRegistration = new DynamicModel(req.body);
    const savedRegistration = await newRegistration.save();
    res.json(savedRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/fetchAlldata', async (req, res) => {
    try {
      const getdata = await DynamicModel.find();
      res.json(getdata);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
