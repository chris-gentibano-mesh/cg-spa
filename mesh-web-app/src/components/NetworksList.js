import { useState } from 'react';

const NetworksList = () => {
    const [networks, setNetworks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchNetworks = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/networks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Response Error:', response);
                throw new Error('Network response Error');
            }

            const data = await response.json();
            setNetworks(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h3> Fetch using the endpoint: /api/v1/transfers/managed/networks</h3>
            <button onClick={fetchNetworks} style={styles.button} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Networks'}
            </button>
            {error && <p style={styles.error}>Error: {error}</p>}
            {networks && (
                 <div style={styles.scrollableBox}>
                 <pre style={styles.pre}>
                     {JSON.stringify(networks, null, 2)}
                 </pre>
             </div>
         )}
     </div>
 );
};

const styles = {
 container: {
     padding: '20px',
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
     marginBottom: '20px',
 },
 error: {
     color: 'red',
     marginTop: '20px',
 },
 scrollableBox: {
     maxHeight: '400px',
     overflowY: 'scroll',
     backgroundColor: '#f8f9fa',
     padding: '10px',
     borderRadius: '5px',
     textAlign: 'left',
 },
 pre: {
     margin: 0,
 }
};

export default NetworksList;