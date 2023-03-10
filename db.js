const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    // function to connect to the database
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/bookstore')
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch(err => {
            console.log(err);
            return cb();
        });
    },
    // function to return the database connection
    getDb: () => dbConnection
};