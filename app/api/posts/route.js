import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    if (!client || typeof client.db !== 'function') {
      throw new Error('Failed to get MongoClient instance');
    }
    const db = client.db('Cricket-blogs'); // Ensure the database name is correct
    const posts = await db.collection('users').find({}).toArray();
    console.log('Posts:', posts); // Add logging here
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
