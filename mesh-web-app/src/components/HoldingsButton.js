import React, { useState } from 'react';
import { MESH_CLIENTID, MESH_APIKEY, MESH_URL } from '../utility/config';

const HoldingsButton = ({ authToken }) => {
  const [holdings, setHoldings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHoldings = async () => {
    if (!authToken) {
      setError("Auth token is not available");
      return;
    }

    setLoading(true);
    setError(null);
    console.log('Fetching holdings');
    console.log(authToken)
    try {
        const accessToken = authToken?.accountTokens?.[0]?.accessToken;

        if (!accessToken) {
            throw new Error('No access token found');
        }
      const response = await fetch(`${MESH_URL}/api/v1/holdings/get`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/*+json',
          'x-client-id': MESH_CLIENTID,
          'x-client-secret': MESH_APIKEY,
          'type': 'Coinbase'
        },
        body: JSON.stringify({
            'authToken': accessToken,
            'type': 'Coinbase',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch holdings');
      }

      const data = await response.json();
      setHoldings(data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={fetchHoldings} style={styles.button} disabled={!authToken || loading}>
        {loading ? 'Loading...' : 'Review User Holdings'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {holdings && <pre style={styles.holdings}>{JSON.stringify(holdings, null, 2)}</pre>}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    textAlign: 'center',
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
  message: {
    marginTop: '10px',
    fontSize: '1rem',
  },
  error: {
    marginTop: '10px',
    fontSize: '1rem',
    color: 'red',
  },
  holdings: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    textAlign: 'left',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};

export default HoldingsButton;
