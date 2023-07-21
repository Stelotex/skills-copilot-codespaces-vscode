// create web server
const express = require('express');
const app = express();

// get comments from database
const db = require('./db');

// get comments from database
const comments = db.getComments();

// set up static files
app.use(express.static('public'));

// set up template engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// set up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// set up routes
app.get('/', (req, res) => {
    res.render('home', { comments: comments });
});

app.post('/add-comment', (req, res) => {
    const comment = req.body.comment;
    db.addComment(comment);
    res.redirect('/');
});

// start server
app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
});