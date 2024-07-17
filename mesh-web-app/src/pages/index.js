import React, { useState } from 'react';
import MeshConnectButton from '../components/MeshConnectButton';
import BrokerConnectButton from '../components/BrokerConnectButton';
import HoldingsButton from '../components/HoldingsButton';
import NetworksList from '../components/NetworksList';
import TransfersButton from '../components/TransfersButton';
import BrokerDropDown from '../components/BrokerDropDown';

const App = () => {
  const [integrationId, setIntegrationId] = useState('34aeb688-decb-485f-9d80-b66466783394'); // hard coded Metamask since this is the first choice
  const [authToken, setAuthToken] = useState(null);
  const [authLink, setAuthLink] = useState(null);
  const [linkToken, setLinkToken] = useState(null);
  const [activeTab, setActiveTab] = useState('connect');
  const [customRequestBody, setCustomRequestBody] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRequestBodyChange = (event) => {
    setCustomRequestBody(event.target.value);
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
          style={activeTab === 'networks' ? styles.activeTabButton : styles.tabButton}
          onClick={() => handleTabChange('networks')}
        >
          Fetch Networks
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
          <BrokerDropDown integrationId={integrationId} onIntegrationChange={setIntegrationId} />

          <div style={styles.inputContainer}>
            <label htmlFor="requestBody">Request Body:</label>
            <textarea
              id="requestBody"
              value={customRequestBody}
              onChange={handleRequestBodyChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.buttonContainer}>
            <BrokerConnectButton
              setAuthLink={setAuthLink}
              integrationId={integrationId}
              customRequestBody={customRequestBody}
            />
          </div>

          <div style={styles.buttonContainer}>
            <MeshConnectButton
              setAuthLink={setAuthLink}
              setLinkToken={setLinkToken}
              setAuthToken={setAuthToken}
              customRequestBody={customRequestBody}
            />
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

      {activeTab === 'networks' && (
        <div style={styles.contentContainer}>
          <h2>Networks</h2>
          <NetworksList />
        </div>
      )}

      {activeTab === 'transfers' && (
        <div style={styles.contentContainer}>
          <h2>Transfers</h2>
          <TransfersButton />
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
  inputContainer: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
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
