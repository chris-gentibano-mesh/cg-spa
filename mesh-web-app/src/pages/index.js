import React, { useState } from 'react';
import MeshConnectButton from '../components/MeshConnectButton';
import BrokerConnectButton from '../components/BrokerConnectButton';
import HoldingsButton from '../components/HoldingsButton';

const App = () => {
  const [integrationId, setIntegrationId] = useState('34aeb688-decb-485f-9d80-b66466783394'); // hard coded Metamask since this is the first choice
  const [authLink, setAuthLink] = useState(null); 
  const [linkToken, setLinkToken] = useState(null); 
  const [authToken, setAuthToken] = useState(null);
  const [activeTab, setActiveTab] = useState('connect'); // 'connect' or 'transfers'

  const handleIntegrationChange = (event) => {
    setIntegrationId(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Try Mesh Below</h1>

      <div style={styles.tabContainer}>
        <button
          style={activeTab === 'Link' ? styles.activeTabButton : styles.tabButton}
          onClick={() => handleTabChange('Link')}
        >
          Link
        </button>
        <button
          style={activeTab === 'transfers' ? styles.activeTabButton : styles.tabButton}
          onClick={() => handleTabChange('transfers')}
        >
          Transfers
        </button>
      </div>

      {activeTab === 'Link' && (
        <div style={styles.contentContainer}>
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

          <div style={styles.buttonContainer}>
            <MeshConnectButton setAuthLink={setAuthLink} setLinkToken={setLinkToken} setAuthToken={setAuthToken} />
          </div>

          <div style={styles.holdingsContainer}>
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
      )}

      {activeTab === 'transfers' && (
        <div style={styles.contentContainer}>
          <h2>Transfers Tab Content</h2>
          {/* Example transfer component */}
          <div>
            <p>Transfer content goes here...</p>
          </div>
        </div>
      )}
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
    padding: '20px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tabButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    margin: '0 5px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  activeTabButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    margin: '0 5px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0056b3',
    color: 'white',
    cursor: 'pointer',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  dropdownContainer: {
    marginBottom: '20px',
  },
  dropdown: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  holdingsContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffc2c2',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px',
  },
  errorMessage: {
    color: '#ff0000',
    margin: '0',
  },
};

export default App;
