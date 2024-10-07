// finding and replacing document in NodeJS

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const doc_to_find = { "studentid": 111 };

const doc_to_replace = { "studentid": 111, "name": "John", "age": 20, "grade": 'C', "marks": [  { Eng: 75 }, { Maths: 71 }, { Science: 65 }, { SST: 70 } ] };
// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const result = await students_collection.findOne(doc_to_find);
    console.log('Oroginal result: ', result);

    await students_collection.findOneAndReplace(doc_to_find, doc_to_replace);

    const updated_result = await students_collection.findOne(doc_to_find);  
    console.log('Updated result: ', updated_result);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection to server closed");
  }
}

main().catch(console.error).finally(client.close());



/* */