// Creating MongoDB Transactions in NodeJS

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
const sender_acc_id = 1000;
const receiver_acc_id = 1001;

const accounts = client.db('bank').collection('accounts');

const session = client.startSession();

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
  try {

    await client.connect();
    console.log("Connected successfully to server");

    let cursor = await accounts.find({account_id:{$in:[sender_acc_id, receiver_acc_id]}})
    for await (const doc of cursor)
        console.log(doc)
    
        await session.withTransaction( async () => {
            await accounts.updateOne({account_id:sender_acc_id}, {$inc:{"balance":-100}})
            await accounts.updateOne({account_id:receiver_acc_id}, {$inc:{"balance":100}})

        })

        console.log("Committing transaction")

    cursor = await accounts.find({account_id:{$in:[sender_acc_id, receiver_acc_id]}})
    for await (const doc of cursor)
        console.log(doc)
} catch (err) {
    console.error("Transaction aborted ",err);
  } finally {
    await session.endSession();
    await client.close();
    console.log("Connection to server closed");
  }
}

main().catch(console.error).finally(client.close());
