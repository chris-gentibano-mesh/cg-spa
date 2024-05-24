import React from 'react';
import MeshConnectButton from './MeshConnectButton';

const App = () => {
  const authLink = 'some-auth-link';
  const linkToken = 'some-link-token';

  return (
    <div>
      <h1>Try Mesh below</h1>
      <MeshConnectButton authLink={authLink} linkToken={linkToken} />
    </div>
  );
};

export default App;