// Imports

const express = require('express');
const index = require('./routes/index');
const mysql = require('mysql');
const post = require('./routes/post')
// Set hosting information
const hostname = '127.0.0.1';
const port = 3000;

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Sardines16-17',
    database: 'blog'
}

// Create the database using the config
const db = mysql.createConnection(dbConfig);

// Function to run on connect
function connectCallback (error) {
    if (error) {
        throw error;
    }

    console.log('Successfully connected to the database');

    // test
    db.query('SELECT * FROM articles', function (error, results) {
        console.log(results);
    });
}

// Open the connection to the database
db.connect(connectCallback);

// Set global db variable
global.db = db;

// Initialize app
let app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Set routes
app.get('/', index.getHomePage);
app.get('/add', post.addPostPage);
app.get('/edit/:id', post.editPostPage);
app.post('/add', post.addPost);
app.get('/delete/:id', post.deletePost);
app.post('/edit/:id', post.editPostPage);
function listenCallback() {
    console.log(`Listening on http://${hostname}:${port}`);
}

app.listen(port, hostname, listenCallback);