// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;

// async function clientPromise() {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();
//     console.log('Successfully connected to MongoDB');
//     const db = client.db('Cricket-blogs'); // Replace with your database name
//     const posts = await db.collection('users').find({}).toArray();
//     console.log('Posts:', posts);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     console.error(error.stack);
//   } finally {
//     await client.close();
//   }
// }

// clientPromise();
// export default clientPromise;
// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent multiple connections
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, use a separate client promise
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
