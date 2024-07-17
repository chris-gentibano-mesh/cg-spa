export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
  
      const response = await fetch(`${process.env.MESH_URL}/api/v1/transfers/managed/networks`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/*+json',
          'x-client-id': process.env.MESH_CLIENTID,
          'x-client-secret': process.env.MESH_APIKEY,
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to obtain networks from Mesh');
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error obtaining networks:', error);
      res.status(500).json({ error: 'Error obtaining networks' });
    }
}
