const dbConnection = require('../db');

const databaseMiddleware = async (req, res, next) => {
    const { db, listsCollection, usersCollection } = await dbConnection();
    req.db = db;
    req.listsCollection = listsCollection; 
    req.usersCollection = usersCollection;
    next();
};

module.exports = databaseMiddleware;