// create web server
// run this in the terminal: node comments.js
// then go to localhost:8080 in your web browser

// load the express module
const express = require('express');

// create an express application
const app = express();

// load the body-parser module
const bodyParser = require('body-parser');

// load the mysql module
const mysql = require('mysql');

// load the express-session module
const session = require('express-session');

// load the path module
const path = require('path');

// load the bcrypt module
const bcrypt = require('bcrypt');

// load the multer module
const multer = require('multer');

// load the fs module
const fs = require('fs');

// load the nodemailer module
const nodemailer = require('nodemailer');

// load the dotenv module
const dotenv = require('dotenv');

// load the dotenv module
dotenv.config();

// create a connection to our Cloud9 server
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // ip address of server running mysql
    user: process.env.DB_USER, // user name to your mysql database
    password: process.env.DB_PASSWORD, // corresponding password
    database: process.env.DB_NAME // use the specified database
});

// use express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// use multer
app.use(multer({
    dest: './static/img/uploads'
}).single('imageFile'));

// use express
app.use(express.static('static'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the views folder
app.set('views', path.join(__dirname, 'views'));

// set the server port
app.set('port', process.env.PORT || 8080);

// set the server listen port
app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
});

// set the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// create a function to send the email
function sendEmail(to, subject, message) {
    // set the mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: message
    };

    // send the email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:' + info.response);
        }
    });
}
