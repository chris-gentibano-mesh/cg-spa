export default async function handler(req, res) {
    const { MESH_APIKEY, MESH_CLIENTID, MESH_URL, MESH_USERID } = process.env;
  
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { integrationId } = req.body;
  
      const response = await fetch(`${MESH_URL}/api/v1/linktoken`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/*+json',
          'x-client-id': MESH_CLIENTID,
          'x-client-secret': MESH_APIKEY,
        },
        body: JSON.stringify({
          userId: MESH_USERID,
          integrationId: integrationId
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to obtain linkToken from Mesh');
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error obtaining link token:', error);
      res.status(500).json({ error: 'Error obtaining link token' });
    }
  }