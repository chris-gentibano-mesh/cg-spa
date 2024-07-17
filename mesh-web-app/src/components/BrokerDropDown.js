import React from 'react';

const BrokerDropdown = ({ integrationId, handleIntegrationChange }) => {
  return (
    <div style={styles.dropdownContainer}>
      <label htmlFor="integrationId">Select Broker: </label>
      <select
        id="integrationId"
        value={integrationId}
        onChange={handleIntegrationChange}
        style={styles.dropdown}
      >
        <option value="34aeb688-decb-485f-9d80-b66466783394">Metamask</option>
        <option value="47624467-e52e-4938-a41a-7926b6c27acf">Coinbase</option>
        {/* Add more options as needed */}
      </select>
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
};

export default BrokerDropdown;
