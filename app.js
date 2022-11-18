require('dotenv').config();
const express = require('express'),
    app = express(),
    mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use(express.json()); // instead - BodyParser

app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`));