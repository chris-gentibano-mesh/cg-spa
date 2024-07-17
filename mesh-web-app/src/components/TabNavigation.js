// src/components/TabNavigation.js
import React from 'react';
import styles from '../App.module.css'; // Assuming you want to use the same styles

const TabNavigation = ({ activeTab, handleTabChange }) => {
  return (
    <div className={styles.tabContainer}>
      <button
        className={activeTab === 'Link' ? styles.activeTabButton : styles.tabButton}
        onClick={() => handleTabChange('Link')}
      >
        Link
      </button>
      <button
        className={activeTab === 'networks' ? styles.activeTabButton : styles.tabButton}
        onClick={() => handleTabChange('networks')}
      >
        Fetch Networks
      </button>
      <button
        className={activeTab === 'transfers' ? styles.activeTabButton : styles.tabButton}
        onClick={() => handleTabChange('transfers')}
      >
        Transfers
      </button>
    </div>
  );
};

export default TabNavigation;
