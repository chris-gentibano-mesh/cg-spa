import React, { useState, useEffect } from 'react';
import styles from './TransfersButton.module.css'; // Import the CSS module

const TransfersButton = ({ authToken }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [assets, setAssets] = useState([]);
  const [addresses, setAddresses] = useState([{ network: '', asset: '', address: '' }]);
  const [submittedAddresses, setSubmittedAddresses] = useState([]);

  // Map network names to IDs (Replace these with actual network IDs)
  const networkIdMap = {
    'Solana': 'solana-network-id',
    'Polygon': 'polygon-network-id',
    'Ethereum': 'ethereum-network-id'
  };

  // Prepare the request body
  const prepareRequestBody = () => {
    const toAddresses = addresses.map(({ network, asset, address }) => ({
      networkId: networkIdMap[network] || '', // Map network to ID
      symbol: asset,
      address,
    }));

    return {
      transferOptions: {
        toAddresses,
      },
      restrictMultipleAccounts: true,
      userId: '123456', // Replace with actual userId if necessary
      enableTransfers: true // Add enableTransfers parameter
    };
  };

  // Function to fetch the link token
  const fetchLinkToken = async () => {
    if (!authToken) {
      setError("Auth token is not available");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requestBody = prepareRequestBody();
      console.log('Request body:', requestBody);

      const response = await fetch('/api/linktoken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Client-Id': process.env.NEXT_PUBLIC_MESH_CLIENTID,
          'X-Client-Secret': process.env.NEXT_PUBLIC_MESH_APIKEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to obtain linkToken');
      }

      const data = await response.json();
      console.log('LinkToken response:', data);

      // Handle the response as needed
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    console.log('Handling button click');
    fetchLinkToken();
  };

  const fetchAssets = (network) => {
    switch (network) {
      case 'Solana':
      case 'Polygon':
        return ['USDC', 'SOL', 'USDT'];
      case 'Ethereum':
        return ['ETH', 'LEO', 'TUSD', 'GRT', 'SHIB', 'MATIC', 'QNT', 'WBTC', 'AAVE', 'UNI', 'SNX', 'CRO', 'RNDR'];
      default:
        return [];
    }
  };

  useEffect(() => {
    const updatedAddresses = addresses.map(address => ({
      ...address,
      asset: fetchAssets(address.network).includes(address.asset) ? address.asset : '',
    }));
    setAddresses(updatedAddresses);
  }, [selectedNetwork]);

  const handleNetworkChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].network = value;
    updatedAddresses[index].asset = ''; // Reset asset when network changes
    setAddresses(updatedAddresses);
    setSelectedNetwork(value);
  };

  const handleAssetChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].asset = value;
    setAddresses(updatedAddresses);
    setSelectedAsset(value);
  };

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].address = value;
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { network: '', asset: '', address: '' }]);
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const handleSubmitAddress = (index) => {
    // Add address to the submitted list
    const addressToSubmit = addresses[index];
    if (addressToSubmit.network && addressToSubmit.asset && addressToSubmit.address) {
      setSubmittedAddresses([...submittedAddresses, addressToSubmit]);
      // Optionally, clear the address field after submission
      const updatedAddresses = addresses.map((addr, i) =>
        i === index ? { ...addr, network: '', asset: '', address: '' } : addr
      );
      setAddresses(updatedAddresses);
    } else {
      setError('Please fill out all fields for the address before submitting.');
    }
  };

  const handleRemoveSubmittedAddress = (index) => {
    const updatedSubmittedAddresses = submittedAddresses.filter((_, i) => i !== index);
    setSubmittedAddresses(updatedSubmittedAddresses);
  };

  const isSubmitDisabled = () => {
    return addresses.some(a => !a.network || !a.asset || !a.address);
  };

  return (
    <div className={styles.container}>
      {addresses.map((address, index) => (
        <div key={index} className={styles.addressContainer}>
          <div className={styles.dropdownContainer}>
            <label className={styles.label}>Select Network:</label>
            <select 
              value={address.network} 
              onChange={(e) => handleNetworkChange(index, e.target.value)} 
              className={styles.select}
            >
              <option value="">Select Network</option>
              {['Solana', 'Polygon', 'Ethereum'].map((network) => (
                <option key={network} value={network}>{network}</option>
              ))}
            </select>
          </div>

          <div className={styles.dropdownContainer}>
            <label className={styles.label}>Select Asset:</label>
            <select 
              value={address.asset} 
              onChange={(e) => handleAssetChange(index, e.target.value)} 
              className={styles.select}
              disabled={!address.network}
            >
              <option value="">Select Asset</option>
              {fetchAssets(address.network).map((asset, idx) => (
                <option key={idx} value={asset}>{asset}</option>
              ))}
            </select>
          </div>

          <div className={styles.dropdownContainer}>
            <label className={styles.label}>Destination Address:</label>
            <input
              type="text"
              value={address.address}
              onChange={(e) => handleAddressChange(index, e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={() => handleSubmitAddress(index)} className={styles.submitButton}>
              Submit
            </button>
            <button onClick={() => handleRemoveAddress(index)} className={styles.removeButton}>
              Remove Address
            </button>
          </div>
        </div>
      ))}

      <button onClick={handleAddAddress} className={styles.addButton}>
        Add Another Address
      </button>

      <button 
        onClick={handleButtonClick} 
        className={styles.button} 
        disabled={!authToken || loading || isSubmitDisabled()}
      >
        {loading ? 'Loading...' : 'Submit Transfer Request'}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {submittedAddresses.length > 0 && (
        <div className={styles.submittedContainer}>
          <h3>Submitted Addresses</h3>
          {submittedAddresses.map((address, index) => (
            <div key={index} className={styles.submittedAddressItem}>
              <span>{address.network} - {address.asset} - {address.address}</span>
              <button 
                onClick={() => handleRemoveSubmittedAddress(index)} 
                className={styles.removeSubmittedButton}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransfersButton;
