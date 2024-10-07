// Insert multiple documents into collection using NodeJS

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbname = "University";

const collection_name = "students";

const students_collection = client.db(dbname).collection(collection_name);

const docs_to_insert = [
    {
      studentid: 110,
      name: 'Ravi',
      age: 22,
      grade: 'B',
      marks: [ { Eng: 85 }, { Maths: 88 }, { Science: 90 }, { SST: 89 } ]
    },
    {
      studentid: 111,
      name: 'Meera',
      age: 25,
      grade: 'A',
      marks: [ { Eng: 92 }, { Maths: 94 }, { Science: 95 }, { SST: 93 } ]
    },
    {
      studentid: 112,
      name: 'Arjun',
      age: 23,
      grade: 'C',
      marks: [ { Eng: 75 }, { Maths: 70 }, { Science: 68 }, { SST: 72 } ]
    },
    {
      studentid: 113,
      name: 'Leela',
      age: 21,
      grade: 'B',
      marks: [ { Eng: 88 }, { Maths: 86 }, { Science: 84 }, { SST: 87 } ]
    },
    {
      studentid: 114,
      name: 'Raj',
      age: 24,
      grade: 'A',
      marks: [ { Eng: 95 }, { Maths: 98 }, { Science: 97 }, { SST: 96 } ]
    }
  ]
  

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        
        let result = await students_collection.insertMany(docs_to_insert);
        console.log(`Inserted document count: ${result.insertedCount}`);
        
        // result = await students_collection.findOne({ studentid: 109 });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Connection to server closed');
    }
}

main().catch(console.error).finally(client.close());