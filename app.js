const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

// Connecting to MongoDB Atlas Cluster with NodeJS Application
async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        
        // list all databases
        const dbs = await client.db().admin().listDatabases();
        console.table(dbs.databases);

        // For each database, list collections
        // for (let dbInfo of dbs.databases) {
        //     const dbName = dbInfo.name;
        //     const db = client.db(dbName);
        //     const collections = await db.listCollections().toArray();
        //     console.log(`Collections in ${dbName}:`);
        //     collections.forEach(col => console.log(col.name));
        // }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Connection to server closed');
    }
}

main().catch(console.error).finally(client.close());