require('dotenv').config();
const path = require('path');
const express = require('express'),
    app = express(),
    fileUpload = require('express-fileupload'),
    mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use(express.json()); // instead - BodyParser
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const catRoute = require('./route/category');
const authorRoute = require('./route/author');
const bookRoute = require('./route/book');


app.use('/categories', catRoute);
app.use('/authors', authorRoute);
app.use('/books', bookRoute);

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    res.status(err.status).json({
        con: false,
        msg: err.message
    });
});

app.use('*', (req, res, next) => res.status(200).json({
    msg: "Route not found",
}));

app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`));