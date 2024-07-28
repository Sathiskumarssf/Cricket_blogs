import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Establish connection
    const client = await clientPromise;
    if (!client || typeof client.db !== 'function') {
      throw new Error('Failed to get MongoClient instance');
    }

    // Access database and collection
    const db = client.db('Cricket-blogs'); // Ensure the database name is correct
    const collection = db.collection('blog_User'); // Ensure the collection name is correct

    // Insert the document
    const result = await collection.insertOne({ name, email, password: hashedPassword });
    if (result.insertedId) {
      console.log('User inserted with ID:', result.insertedId);
      return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'User registration failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}