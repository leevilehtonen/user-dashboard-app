const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');
const passport = require('passport');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('./config/database');


// Route requires
const users = require('./routes/users');

// Constants
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csurf({
    key : 'XSRF-TOKEN',
    cookie : true,
    
}));
app.use(cors());
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