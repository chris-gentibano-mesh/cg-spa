import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TransfersButton = ({ authToken }) => {
  const [transfers, setTransfers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [assets, setAssets] = useState([]);
  const router = useRouter();

  const fetchTransfers = async () => {
    console.log("fetching transfers");
    if (!authToken) {
      setError("Auth token is not available");
      return;
    }

    setLoading(true);
    setError(null);
    console.log('Fetching transfers');
    console.log(authToken);

    try {
      const accessToken = authToken?.accountTokens?.[0]?.accessToken;

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(`/api/transfers`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'authToken': accessToken,
          'type': 'Coinbase',
          'network': selectedNetwork,
          'asset': selectedAsset,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transfers, try to reconnect to a Broker');
      }

      const data = await response.json();
      setTransfers(data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    console.log('in click');
    fetchTransfers();
   
    // router.push('/transfers');
  };

  useEffect(() => {
    const fetchAssets = () => {
      switch (selectedNetwork) {
        case 'Solana':
        case 'Polygon':
          setAssets(['USDC', 'SOL', 'USDT']);
          break;
        case 'Ethereum':
          setAssets(['ETH', 'LEO', 'TUSD', 'GRT','SHIB', 'MATIC', 'QNT', 'WBTC', 'AAVE', 'UNI', 'SNX', 'CRO','RNDR']);
          break;
        default:
          setAssets([]);
      }
      setSelectedAsset(''); // Reset selected asset when network changes
    };

    fetchAssets();
  }, [selectedNetwork]);

  return (
    <div style={styles.container}>
      <div style={styles.dropdownContainer}>
        <label style={styles.label}>Select Network:</label>
        <select 
          value={selectedNetwork} 
          onChange={(e) => setSelectedNetwork(e.target.value)} 
          style={styles.select}
        >
          <option value="">Select Network</option>
          <option value="Solana">Solana</option>
          <option value="Polygon">Polygon</option>
          <option value="Ethereum">Ethereum</option>
        </select>
      </div>

      <div style={styles.dropdownContainer}>
        <label style={styles.label}>Select Asset:</label>
        <select 
          value={selectedAsset} 
          onChange={(e) => setSelectedAsset(e.target.value)} 
          style={styles.select}
          disabled={!selectedNetwork}
        >
          <option value="">Select Asset</option>
          {assets.map((asset, index) => (
            <option key={index} value={asset}>{asset}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={handleButtonClick} 
        style={selectedNetwork && selectedAsset ? styles.button : styles.buttonDisabled} 
        disabled={!authToken || loading || !selectedNetwork || !selectedAsset}
      >
        {loading ? 'Loading...' : 'Fetch Transfers'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {transfers && <pre style={styles.transfers}>{JSON.stringify(transfers, null, 2)}</pre>}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    textAlign: 'center',
  },
  dropdownContainer: {
    margin: '10px 0',
  },
  label: {
    marginRight: '10px',
    fontSize: '1rem',
  },
  select: {
    padding: '5px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  buttonDisabled: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#d3d3d3',
    color: 'white',
    cursor: 'not-allowed',
  },
  message: {
    marginTop: '10px',
    fontSize: '1rem',
  },
  error: {
    marginTop: '10px',
    fontSize: '1rem',
    color: 'red',
  },
  transfers: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    textAlign: 'left',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};

export default TransfersButton;
