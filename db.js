const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    // function to connect to the database
    connectToDb: (cb) => {
        MongoClient.connect('mongodb+srv://EvanilsonP:88813091a@cluster0.rq4v2yp.mongodb.net/?retryWrites=true&w=majority')
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