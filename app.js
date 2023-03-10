const express = require('express');
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db');
const app = express();

app.use(express.json());

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
    const page = req.query.p || 0;
    const booksPerPage = 3;

    let books = [];
    db.collection('books')
    .find()
    .sort({author: 1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch(() => {
        res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;

 if(ObjectId.isValid(id)) {
    db.collection('books').findOne( {_id: new ObjectId(id)} )
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: "Could not fetch the document"});
        });
    } else {
        res.status(200).json({ error: "Not a valid doc ID"});
    }
});

app.post('/books', (req, res) => {
    const book = req.body;
    db.collection('books').insertOne(book)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not create a new document"});
    })
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;

    if(ObjectId.isValid(id)) {
        db.collection('books').deleteOne( {_id: new ObjectId(id)} )
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: "Could not delete the document"});
            });
        } else {
            res.status(200).json({ error: "Not a valid doc ID"});
    }
});

app.patch('/books/:id', (req, res) => {
    const updates = req.body;
    const id = req.params.id;
    
    if(ObjectId.isValid(id)) {
        db.collection('books').updateOne( {_id: new ObjectId(id)}, {$set: updates})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: "Could not update the document"});
            });
        } else {
            res.status(200).json({ error: "Not a valid doc ID"});
    }
});

