const express = require('express');
const app = express();

// routes
app.get('/books', (req, res) => {
    res.json({ msg: "Welcome to the API." });
});

app.listen(3000, () => { console.log('Listening on port 3000.')});