import React, { useState } from 'react';
import MeshConnectButton from '../components/MeshConnectButton';
import BrokerConnectButton from '../components/BrokerConnectButton';
import HoldingsButton from '../components/HoldingsButton';

const App = () => {
  const [integrationId, setIntegrationId] = useState('34aeb688-decb-485f-9d80-b66466783394'); // hard coded Metamask since this is the first choice
  const [authLink, setAuthLink] = useState(null); 
  const [linkToken, setLinkToken] = useState(null); 
  const [authToken, setAuthToken] = useState(null);

  const handleIntegrationChange = (event) => {
    setIntegrationId(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Try Mesh Below</h1>

      <div style={styles.dropdownContainer}>
        <label htmlFor="integrationId">Select Broker: </label>
        <select id="integrationId" value={integrationId} onChange={handleIntegrationChange} style={styles.dropdown}>
          <option value="34aeb688-decb-485f-9d80-b66466783394">Metamask</option>
          <option value="47624467-e52e-4938-a41a-7926b6c27acf">Coinbase</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div style={styles.buttonContainer}>
        <BrokerConnectButton setAuthLink={setAuthLink} setLinkToken={setLinkToken} integrationId={integrationId} />
      </div>

      <div style={{ ...styles.buttonContainer, marginTop: '20px' }}>
        <MeshConnectButton setAuthLink={setAuthLink} setLinkToken={setLinkToken} setAuthToken={setAuthToken}/>
      </div>

      <div style={styles.spacing} />
      <div>
        Below is the button to review the User Holdings
        {authToken ? (
          <HoldingsButton authToken={authToken} />
        ) : (
          <div style={styles.errorContainer}>
            <p style={styles.errorMessage}>Auth token is not set. Please use Catalog or Specified Broker first</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    padding: '20px'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px'
  },
  dropdownContainer: {
    marginBottom: '20px'
  },
  dropdown: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer'
  },
  buttonContainer: {
    display: 'flex',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    marginRight: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }
};

export default App;
