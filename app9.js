// finding and updating the document in NodeJS

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const doc_to_find = { "studentid": 113 };

const update = {$set: {"grade":'C', "marks":[{ Eng: 70 }, { Maths: 65 }, { Science: 65 }, { SST: 75 }]}}

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const result = await students_collection.findOne(doc_to_find);
    console.log('Oroginal Document: ', result);

    await students_collection.findOneAndUpdate(doc_to_find, update);

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
