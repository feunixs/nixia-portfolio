import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ isLoading, progress }) => {
  return (
    <div
      className={styles.loadingScreen}
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'auto' : 'none',
      }}
    >
      <div className={styles.contentWrapper}>
        <img
          src="/assets/images/logo.svg"
          alt="Nixia OS Logo"
          className={styles.logo}
        />
        <div className={styles.loadingBarContainer}>
          <div
            className={styles.loadingBarProgress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
