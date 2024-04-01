
const express = require("express");
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const MONGODB_URI =
 "mongodb+srv://Sohail:Sohail%40786@cluster0.h1rnz3h.mongodb.net/messages?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 5000;

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/UrlShortner";

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status).send(err.message);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
