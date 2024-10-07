// finding and deleting document in NodeJS

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const doc_to_find = { "studentid": 110 };

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const result = await students_collection.findOne(doc_to_find);
    console.log('Oroginal Document: ', result);

    await students_collection.findOneAndDelete(doc_to_find);

    const updated_result = await students_collection.findOne(doc_to_find);  
    console.log('Updated Document: ', updated_result);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection to server closed");
  }
}

main().catch(console.error).finally(client.close());
