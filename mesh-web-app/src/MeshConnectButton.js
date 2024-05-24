import React, { useEffect, useState } from 'react';
import { createLink } from '@meshconnect/web-link-sdk';
import { MESH_CLIENTID, MESH_APIKEY, MESH_USERID, MESH_URL } from './utility/config';

const MeshConnectButton = ({ authLink }) => {
  const [linkConnection, setLinkConnection] = useState(null);
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const link = createLink({
      clientId: MESH_CLIENTID,
      onIntegrationConnected: (data) => {

        console.log('Integration connected:', data);
      },
      onExit: (error) => {
        if (error) {
          // Handle error
          console.error('Link exited with error:', error);
        } else {
          // Handle successful exit without error
          console.log('Link exited successfully');
        }
      }
    });
    setLinkConnection(link);
  }, []);

  useEffect(() => {
    if (linkConnection && authLink) {
      linkConnection.openLink(linkToken);
    }
  }, [linkConnection, authLink, linkToken]);
  
  const fetchLinkToken = async () => {
    try {
      const response = await fetch(MESH_URL + '/api/v1/linktoken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/*+json',
          'x-client-id': MESH_CLIENTID,
          'x-client-secret': MESH_APIKEY, 
        },
        body: JSON.stringify({
          userId: MESH_USERID,
          // integrationId: "34aeb688-decb-485f-9d80-b66466783394", metamask integration id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to obtain linkToken');
      }

      const data = await response.json();
      console.log(data)
      setLinkToken(data.content.linkToken);
    } catch (error) {
      console.error('Error obtaining link token:', error);
    }
  };

  const handleButtonClick = async () => {
    await fetchLinkToken(); // Fetch the link token when the button is clicked
    console.log("fetch done")
    console.log(linkConnection)
    console.log("link token:")
    console.log(linkToken)
    if (linkConnection && linkToken) {
      console.log("opening link")
      linkConnection.openLink(linkToken);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        Connect to Mesh
      </button>
    </div>
  );
};

export default MeshConnectButton;
