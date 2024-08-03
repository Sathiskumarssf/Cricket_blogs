import clientPromise from '../../../lib/mongodb';

export async function POST(req) {
  try {
    // Extract the teamName from the request body
    const { teamName,option,search } = await req.json(); 
    console.log(search)

    // Format the teamName for MongoDB collection naming
    const formattedTeamName = teamName.toLowerCase().replace(/\s+/g, '_');
    console.log('Formatted team name:', formattedTeamName);

    const client = await clientPromise;

    if (!client || typeof client.db !== 'function') {
      throw new Error('Failed to get MongoClient instance');
    }

    if(option =="players" && search==undefined){
      const db = client.db(formattedTeamName); // Ensure the database name is correct
      const collection = db.collection('team_players'); // Use formatted team name for the collection

      const teamData = await collection.find({}).toArray();

      if (teamData.length === 0) {
        return new Response(JSON.stringify({ message: 'No data found for this team' }), { status: 404 });
      }

    
      return new Response(JSON.stringify(teamData), { status: 200 });

    }else if (option === "players" && search !== undefined) {
      const db = client.db(formattedTeamName); // Ensure the database name is correct
      const collection = db.collection('team_players'); // Use formatted team name for the collection
    
      // Build the query to search for players whose names match the search term
      const query = { playerName: { $regex: search, $options: 'i' } };
    
      const teamData = await collection.find(query).toArray();
    
      if (teamData.length === 0) {
        return new Response(JSON.stringify({ message: 'No data found for this team' }), { status: 404 });
      }
    
      return new Response(JSON.stringify(teamData), { status: 200 });
    }
    else if(option =="about"){
          const db = client.db(formattedTeamName); // Ensure the database name is correct
          const collection = db.collection('about'); // Use formatted team name for the collection
      
          const teamData = await collection.find({}).toArray();
      
          if (teamData.length === 0) {
            return new Response(JSON.stringify({ message: 'No data found for this team' }), { status: 404 });
          }
      
           
           
          return new Response(JSON.stringify(teamData), { status: 200 });
      
    }

    return new Response('Internal Server Error', { status: 400 });
  } catch (error) {
    console.error('Error fetching team data:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
