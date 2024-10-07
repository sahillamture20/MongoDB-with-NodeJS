// Code to insert single document into collection using NodeJS
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const doc_to_insert = { "studentid":109, "name":"Shree", "age": 26, "grade": 'A', "marks": [{ "Eng": 90 }, { "Maths": 93 }, { "Science": 94 }, { "SST": 95 }] };

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        
        let result = await students_collection.insertOne(doc_to_insert);
        console.log(`Inserted document: ${result.insertedId}`);
        
        // result = await students_collection.findOne({ studentid: 109 });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Connection to server closed');
    }
}

main().catch(console.error).finally(client.close());