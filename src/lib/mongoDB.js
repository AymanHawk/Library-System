import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://fanged-shadow:7BdyIP9hqlIjjyHZ@librarydeliverycluster.o8ory.mongodb.net/"
const options = {};

let client, clientPromise;

if(!global._mongoClientPromise){
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;