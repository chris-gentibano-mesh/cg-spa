import React from 'react';

const BrokerDropDown = ({ integrationId, onIntegrationChange }) => {
  const handleIntegrationChange = (event) => {
    onIntegrationChange(event.target.value);
  };

  const copyIntegrationId = () => {
    navigator.clipboard.writeText(integrationId)
      .then(() => console.log(`Integration ID ${integrationId} copied to clipboard`))
      .catch((err) => console.error('Failed to copy integration ID:', err));
  };

  return (
    <div style={styles.dropdownContainer}>
      <label htmlFor="integrationId">Select Broker / Wallet: </label>
      <select
        id="integrationId"
        value={integrationId}
        onChange={handleIntegrationChange}
        style={styles.dropdown}
      >
        <option value="34aeb688-decb-485f-9d80-b66466783394">Metamask</option>
        <option value="47624467-e52e-4938-a41a-7926b6c27acf">Coinbase</option>
        <option value="514a1d69-dd01-463a-9b72-997a9a4c45a9">Public</option>
        <option value="ec84111c-0ff2-4033-94a4-eedb5ba8770e">WeBull</option>
      </select>
      <div style={styles.integrationIdContainer}>
        {integrationId && (
          <>
            <p>Integration ID: {integrationId}</p>
            <button onClick={copyIntegrationId} style={styles.copyButton}>Copy to Clipboard</button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
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
  integrationIdContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  copyButton: {
    marginLeft: '10px',
    padding: '8px 12px',
    fontSize: '0.9rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default BrokerDropDown;
