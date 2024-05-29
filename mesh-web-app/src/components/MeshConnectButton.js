import React, { useEffect, useState } from 'react';
import { createLink } from '@meshconnect/web-link-sdk';

const MeshConnectButton = ({ authLink, setAuthToken }) => {
  const [linkConnection, setLinkConnection] = useState(null);
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const link = createLink({
      clientId: process.env.NEXT_PUBLIC_MESH_CLIENTID,
      onIntegrationConnected: (data) => {
        console.log('Integration connected:', data);
        if (data && data.accessToken) {
          setAuthToken(data.accessToken);
        }
      },
      onExit: (error) => {
        if (error) {
          console.error('Link exited with error:', error);
        } else {
          console.log('Link exited successfully');
        }
      }
    });
    setLinkConnection(link);
  }, [setAuthToken]);

  useEffect(() => {
    if (linkConnection && authLink) {
      linkConnection.openLink(linkToken);
    }
  }, [linkConnection, authLink, linkToken]);

  const fetchLinkToken = async () => {
    try {
      const response = await fetch('/api/linktoken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to obtain linkToken');
      }

      const data = await response.json();
      console.log(data);
      setLinkToken(data.content.linkToken);
    } catch (error) {
      console.error('Error obtaining link token:', error);
    }
  };

  const handleButtonClick = async () => {
    await fetchLinkToken();
    console.log("fetch done");
    console.log(linkConnection);
    console.log("link token:");
    console.log(linkToken);
    if (linkConnection && linkToken) {
      console.log("opening link");
      linkConnection.openLink(linkToken);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} style={styles.button}>
        Open Mesh Catalogue
      </button>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }
};

export default MeshConnectButton;
