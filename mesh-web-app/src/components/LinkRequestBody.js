// src/components/LinkRequestBody.js
import React, { useState, useEffect } from 'react';

const LinkRequestBody = ({ initialRequestBody, onRequestBodyChange }) => {
  const [requestBody, setRequestBody] = useState(initialRequestBody);

  // Update local state if initialRequestBody changes externally
  useEffect(() => {
    setRequestBody(initialRequestBody);
  }, [initialRequestBody]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setRequestBody(value);
    onRequestBodyChange(value); // Notify parent component of the change
  };

  return (
    <div style={styles.inputContainer}>
      <label htmlFor="linkRequestBody">Request Body:</label>
      <textarea
        id="linkRequestBody"
        value={requestBody}
        onChange={handleInputChange}
        style={styles.textarea}
      />
    </div>
  );
};

const styles = {
  inputContainer: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
};

export default LinkRequestBody;
