import React, { useState, useEffect } from 'react';
import styles from './TopBar.module.css';
import { FiWifi, FiVolume2, FiPower } from 'react-icons/fi';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <img
          src="/assets/images/header.svg"
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.center}>
        <span>{formatTime(time)}</span>
      </div>
      <div className={styles.right}>
        <FiWifi />
        <FiVolume2 />
        <FiPower />
        <span>▼</span>
      </div>
    </div>
  );
};

export default TopBar;
