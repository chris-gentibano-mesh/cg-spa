export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Extract the body from the incoming request
    const requestBody = req.body;
    console.log("in the req")
    console.log(req.body)
    // Ensure the necessary fields are present in the request body
    if (!requestBody || !requestBody.UserId || !requestBody.TransferOptions) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const response = await fetch(`${process.env.MESH_URL}/api/v1/linktoken`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-client-id': process.env.MESH_CLIENTID,
        'x-client-secret': process.env.MESH_APIKEY,
      },
      body: JSON.stringify(requestBody), // Pass the incoming request body to the Mesh API
    });

    if (!response.ok) {
      throw new Error('Failed to obtain linkToken from Mesh');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error obtaining link token:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
