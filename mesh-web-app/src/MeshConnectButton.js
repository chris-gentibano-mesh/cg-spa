import React from 'react';
import { createLink } from '@meshconnect/web-link-sdk';
import { mesh_clientId } from './utility/config';

const MeshConnectButton = () => {
  const handleButtonClick = () => {
    const linkConnection = createLink({
      clientId: mesh_clientId,
      onIntegrationConnected: (data) => {
        // Use broker account data
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

    // If you need to perform additional actions with linkConnection
    console.log('Link connection created:', linkConnection);
    if (linkToken) {
      linkConnection?.openLink(linkToken)
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
