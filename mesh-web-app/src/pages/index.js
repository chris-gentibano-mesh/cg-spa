// src/pages/index.js
import React, { useState } from 'react';
import MeshConnectButton from '../components/MeshConnectButton';
import BrokerConnectButton from '../components/BrokerConnectButton';
import HoldingsButton from '../components/HoldingsButton';
import NetworksList from '../components/NetworksList';
import TransfersButton from '../components/TransfersButton';
import BrokerDropDown from '../components/BrokerDropDown';
import LinkRequestBody from '../components/LinkRequestBody';
import TabNavigation from '../components/TabNavigation';
import styles from '../App.module.css'; // Import the CSS module

const App = () => {
  const [integrationId, setIntegrationId] = useState('34aeb688-decb-485f-9d80-b66466783394');
  const [authToken, setAuthToken] = useState(null);
  const [authLink, setAuthLink] = useState(null);
  const [linkToken, setLinkToken] = useState(null);
  const [activeTab, setActiveTab] = useState('connect');
  const [customRequestBody, setCustomRequestBody] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRequestBodyChange = (value) => {
    setCustomRequestBody(value);
  };

  const handleLinkTokenReceived = (token) => {
    setLinkToken(token); // Update the state with the received token
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Try Mesh Below</h1>

      <TabNavigation activeTab={activeTab} handleTabChange={handleTabChange} />

      {activeTab === 'Link' && (
        <div className={styles.contentContainer}>
          <BrokerDropDown integrationId={integrationId} onIntegrationChange={setIntegrationId} />

          <LinkRequestBody initialRequestBody={customRequestBody} onRequestBodyChange={handleRequestBodyChange} />

          <div className={styles.buttonContainer}>
            <BrokerConnectButton
              setAuthLink={setAuthLink}
              integrationId={integrationId}
              customRequestBody={customRequestBody}
              onLinkTokenReceived={handleLinkTokenReceived} // Pass the callback function
            />
          </div>

          <div className={styles.buttonContainer}>
            <MeshConnectButton
              authLink={authLink}
              setAuthToken={setAuthToken}
              onLinkTokenReceived={handleLinkTokenReceived} // Pass the callback function
            />
          </div>

          <div className={styles.holdingsContainer}>
            Below is the button to review the User Holdings
            {authToken ? (
              <HoldingsButton authToken={authToken} />
            ) : (
              <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>Auth token is not set. Please use Catalog or Specified Broker first</p>
              </div>
            )}
          </div>

          {linkToken && (
            <div className={styles.responseBox}>
              <h2>Link Token Response</h2>
              <pre>{JSON.stringify({ linkToken }, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {activeTab === 'networks' && (
        <div className={styles.contentContainer}>
          <h2>Networks</h2>
          <NetworksList />
        </div>
      )}

      {activeTab === 'transfers' && (
        <div className={styles.contentContainer}>
          <h2>Transfers</h2>
          <TransfersButton />
        </div>
      )}
    </div>
  );
};

export default App;
