const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('./config/database');
const csrf = require('csurf');


// Route requires
const users = require('./routes/users');

// Constants
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser(config.cookieSecret));
app.use(csrf({cookie:true}));
app.use(function (req, res, next) {
    res.cookie("XSRF-TOKEN",req.csrfToken());
    return next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Connect database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`);
});
mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});



//Routes
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid');
});

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});


