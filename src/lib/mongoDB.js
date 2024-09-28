import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

const uri = process.env.MONGODB_URI
const options = {};

let client, clientPromise;

if(process.env.NODE_ENV === 'development'){
    if(!global._mongoClientPromise){
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;