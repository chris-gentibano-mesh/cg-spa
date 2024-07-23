import React, { useState, useEffect } from 'react';
import { createLink } from '@meshconnect/web-link-sdk';
import styles from './TransfersButton.module.css';

const TransfersButton = ({ authToken }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [linkToken, setLinkToken] = useState(null);
  const [linkConnection, setLinkConnection] = useState(null);
  const [addresses, setAddresses] = useState([{ network: '', asset: '', address: '' }]);
  const [submittedAddresses, setSubmittedAddresses] = useState([]);
  const [amountInFiat, setAmountInFiat] = useState('');
  const [submittedAmountInFiat, setSubmittedAmountInFiat] = useState(null);

  const userId = process.env.MESH_USERID;
  const transactionId = 'TransactionId'; // Replace with actual transactionId if necessary

  // Map network names to IDs (Replace these with actual network IDs)
  const networkIdMap = {
    'Solana': '0291810a-5947-424d-9a59-e88bb33e999d',
    'Polygon': '7436e9d0-ba42-4d2b-b4c0-8e4e606b2c12',
    'Ethereum': 'e3c7fdd8-b1fc-4e51-85ae-bb276e075611'
  };

  // Prepare the request body
  const prepareRequestBody = () => {
    const toAddresses = submittedAddresses.map(({ network, asset, address }) => ({
      networkId: networkIdMap[network] || '',
      symbol: asset,
      address,
    }));

    return {
      UserId: userId,
      TransferOptions: {
        toAddresses: toAddresses,
        amountInFiat: parseFloat(submittedAmountInFiat) || 0,
        transactionId: transactionId,
        fundingOptions: {
          enabled: true
        },
      },
    };
  };

  // Function to fetch the link token
  const fetchLinkToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const requestBody = prepareRequestBody();
      console.log('Request body:', requestBody);

      const response = await fetch('/api/transfersLinkToken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to obtain linkToken');
      }

      const data = await response.json();
      console.log('LinkToken response:', data);

      const token = data.content.linkToken;
      setLinkToken(token);
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

  useEffect(() => {
    if (linkToken && linkConnection) {
      linkConnection.openLink(linkToken);
    }
  }, [linkToken, linkConnection]);

  useEffect(() => {
    const link = createLink({
      clientId: process.env.NEXT_PUBLIC_MESH_CLIENTID,
      onIntegrationConnected: (data) => {
        console.log('Integration connected:', data);
        // if (data && data.accessToken) {
        //   // Handle access token setup or further actions here
        // }
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

  const fetchAssets = (network) => {
    switch (network) {
      case 'Solana':
        return ['USDC', 'SOL', 'USDT'];
      case 'Polygon':
        return ['MATIC', 'USDC', 'USDT'];
      case 'Ethereum':
        return ['ETH', 'LEO', 'TUSD', 'GRT', 'SHIB', 'MATIC', 'QNT', 'WBTC', 'AAVE', 'UNI', 'SNX', 'CRO', 'RNDR'];
      default:
        return [];
    }
  };

  const handleNetworkChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].network = value;
    updatedAddresses[index].asset = ''; // Reset asset when network changes
    setAddresses(updatedAddresses);
  };

  const handleAssetChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].asset = value;
    setAddresses(updatedAddresses);
  };

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].address = value;
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { network: '', asset: '', address: '' }]);
  };

  const handleSubmitAddress = (index) => {
    const addressToSubmit = addresses[index];
    if (addressToSubmit.network && addressToSubmit.asset && addressToSubmit.address) {
      setSubmittedAddresses(prev => [
        ...prev,
        addressToSubmit
      ]);
      setAddresses(prev =>
        prev.map((addr, i) =>
          i === index ? { ...addr, network: '', asset: '', address: '' } : addr
        )
      );
    } else {
      setError('Please fill out all fields for the address before submitting.');
    }
  };

  const handleRemoveSubmittedAddress = (index) => {
    setSubmittedAddresses(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitAmountInFiat = () => {
    if (amountInFiat <= 0) {
      setError('Please enter a valid amount in fiat.');
    } else {
      setError(null);
      setSubmittedAmountInFiat(amountInFiat);
      console.log('Amount in Fiat submitted:', amountInFiat);
    }
  };

  // Function to check if the submit button should be disabled
  const isSubmitButtonDisabled = () => {
    return submittedAddresses.length === 0 || !submittedAmountInFiat || parseFloat(submittedAmountInFiat) <= 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.amountContainer}>
        <label className={styles.label}>Amount in Fiat:</label>
        <input
          type="number"
          value={amountInFiat}
          onChange={(e) => setAmountInFiat(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSubmitAmountInFiat} className={styles.submitButton}>Submit Amount</button>
      </div>

      {submittedAmountInFiat !== null && (
        <div className={styles.submittedAmountContainer}>
          <h3>Submitted Amount in Fiat: ${submittedAmountInFiat}</h3>
        </div>
      )}

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
          </div>
        </div>
      ))}

      <button onClick={handleAddAddress} className={styles.addButton}>
        Add Another Address
      </button>

      <button 
        onClick={handleButtonClick} 
        className={styles.button}
        disabled={isSubmitButtonDisabled()} // Disable button if addresses are empty or amount is invalid
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
