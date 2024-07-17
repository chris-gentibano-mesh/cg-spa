// src/pages/_app.js
import '../App.module.css'; // Import the global CSS

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;