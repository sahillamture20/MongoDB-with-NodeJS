// Replace document using NodeJS

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const docs_to_find = {"studentid":109}

const doc_to_replace = {"studentid": 109, "age": 25, "name": "Nischal", "grade":"B", "marks": [{ "Eng": 80 }, { "Maths": 80 }, { "Science": 84 }, { "SST": 55 }]}

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        
        let result = await students_collection.find(docs_to_find).toArray();
        console.log("Original document: ", result);
        
        await students_collection.replaceOne(docs_to_find, doc_to_replace);
        let updateResult = await students_collection.find(docs_to_find).toArray();
        console.log("Replaced document: ",updateResult);
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Connection to server closed');
    }
}

main().catch(console.error).finally(client.close());