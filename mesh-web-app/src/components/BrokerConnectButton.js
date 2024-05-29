import React, { useEffect, useState } from 'react';
import { createLink } from '@meshconnect/web-link-sdk';

const BrokerConnectButton = ({ authLink, integrationId }) => {
  const [linkConnection, setLinkConnection] = useState(null);
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const link = createLink({
      clientId: process.env.NEXT_PUBLIC_MESH_CLIENTID,
      onIntegrationConnected: (data) => {
        console.log('Integration connected:', data);
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
  }, []);

  useEffect(() => {
    if (linkConnection && authLink) {
      linkConnection.openLink(linkToken);
    }
  }, [linkConnection, authLink, linkToken]);

  const fetchLinkToken = async () => {
    try {
      const response = await fetch('/api/brokerlinktoken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ integrationId }),
      });

      if (!response.ok) {
        throw new Error('Failed to obtain linkToken');
      }

      const data = await response.json();
      setLinkToken(data.content.linkToken);
    } catch (error) {
      console.error('Error obtaining link token:', error);
    }
  };

  const handleButtonClick = async () => {
    await fetchLinkToken();
    if (linkConnection && linkToken) {
      linkConnection.openLink(linkToken);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} style={styles.button}>
        Open Specified Broker
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

export default BrokerConnectButton;