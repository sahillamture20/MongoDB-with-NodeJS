// Querying collection using NodeJS

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const docs_to_find = {"grade":'A'}

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        
        let cursor = students_collection.find(docs_to_find);
        let count =  students_collection.countDocuments(docs_to_find);
        
        for await (const doc of cursor)
            console.log(doc)
        
        console.log(`Total documents found: ${await count}`);
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Connection to server closed');
    }
}

main().catch(console.error).finally(client.close());