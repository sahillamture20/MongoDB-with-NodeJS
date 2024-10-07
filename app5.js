// Replace document using NodeJS

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const docs_to_find = {"age":25}

const update = {"$set": {"age":28}};

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        
        let result = await students_collection.updateMany(docs_to_find, update);
        // let result = await students_collection.updateOne({"studentid": 101}, {"$set": {"age": 23}});
        console.log("Matched count: ", result.matchedCount);
        console.log("Modified count: ", result.modifiedCount);
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Connection to server closed');
    }
}

main().catch(console.error).finally(client.close());