// using $sort and $project aggregation stages in NodeJS

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const match = { $match: { "grade": "A" } };
/* $sort
1 = Sort ascending.
-1 = Sort descending.
*/
const sort = { $sort: { "totalMarks": -1 } };
const project = {
  $project: {
    "studentid": 1,
    "name": 1,
    "grade": 1,
    "_id": 0,
    "totalMarks": {
      $sum: [
           { $arrayElemAt: ["$marks.Eng", 0] },
           { $arrayElemAt: ["$marks.Maths", 0] },
           { $arrayElemAt: ["$marks.Science", 0] },
           { $arrayElemAt: ["$marks.SST", 0] }
         ],
    },
  },
};

const pipeline = [match, project, sort]
// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const result = await students_collection.aggregate(pipeline).toArray();
    console.table(result);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection to server closed");
  }
}

main().catch(console.error).finally(client.close());
