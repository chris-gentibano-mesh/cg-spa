export default async function handler(req, res) {
    const { authToken, type } = req.body;
  
    try {
      const response = await fetch(`${process.env.MESH_URL}/api/v1/holdings/get`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-client-id': process.env.MESH_CLIENTID,
          'x-client-secret': process.env.MESH_APIKEY,
        },
        body: JSON.stringify({ authToken, type }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch holdings');
      }
  
      const data = await response.json();
      res.status(200).json({ content: data.content });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }