import React from 'react';
import MeshConnectButton from './MeshConnectButton';

const App = () => {
  const authLink = 'some-auth-link';
  const linkToken = 'some-link-token';

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Try Mesh Below</h1>

      <div style={styles.dropdownContainer}>
        <label htmlFor="integrationType">Select Integration Type:</label>
        <select id="integrationType" style={styles.dropdown}>
          <option value="Type 1">Type 1</option>
          <option value="Type 2">Type 2</option>
          <option value="Type 3">Type 3</option>
        </select>
      </div>

      <MeshConnectButton authLink={authLink} linkToken={linkToken} />
      {/* <MeshConnectButton2 authLink={authLink} linkToken={linkToken} integrationType={integrationType} /> */}
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
    padding: '20px'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px'
  }
};

export default App;
