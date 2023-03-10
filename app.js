const express = require('express');
const { connectToDb, getDb } = require('./db');
const app = express();

// db connection // listening to requests after we are connected for the database
let db;
connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => { console.log('Listening on port 3000.')});
    }
    db = getDb();
});

// routes
app.get('/books', (req, res) => {
    res.json({ msg: "Welcome to the API." });
});
