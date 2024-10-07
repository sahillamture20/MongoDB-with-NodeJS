// using $sort and $project aggregation stages in NodeJS

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const match = { $match: { "grade": "C" } };

const group = { $group: {"_id": "age", "count": {$count:{}}}};

const pipeline = [match, group]
// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const result = await students_collection.aggregate(pipeline).toArray();
    
    for await (const doc of result) 
        console.log(doc);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection to server closed");
  }
}

main().catch(console.error).finally(client.close());
