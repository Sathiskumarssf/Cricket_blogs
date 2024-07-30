import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';


// POST method for user registration and authentication
export async function POST(req) {
  try {
    const { action, name, email, password } = await req.json();

    // Establish connection
    const client = await clientPromise;
    if (!client || typeof client.db !== 'function') {
      throw new Error('Failed to get MongoClient instance');
    }

    // Access database and collection
    const db = client.db('Cricket-blogs');
    const collection = db.collection('blog_User');

    if (action === 'register') {
      // Handle user registration
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await collection.insertOne({ name, email, password: hashedPassword });

      if (result.insertedId) {
        console.log('User inserted with ID:', result.insertedId);
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
      } else {
        return NextResponse.json({ message: 'User registration failed' }, { status: 500 });
      }
    } else if (action === 'login') {
      // Handle user login/authentication
      const user = await collection.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ message: 'Invalid credentials' } );
      }

      // Authentication successful
      return NextResponse.json({ message: 'User authenticated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error during processing:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
