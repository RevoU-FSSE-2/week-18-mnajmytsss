const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");

const dbConnection = async () => {
    try {
        const client = await new MongoClient(process.env.DB_PROD).connect();
        const db = client.db('milestone');
        
        const listsCollection = db.collection('lists');
        const usersCollection = db.collection('users'); 
        
        return { db, listsCollection, usersCollection };
    } catch (error) {
        console.log(error, "<=================== error ==================");
        throw new Error("Database connection error");
    }
}

module.exports = dbConnection;