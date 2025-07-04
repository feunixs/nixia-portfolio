import React from 'react';
import styles from './ImageViewer.module.css';

const ImageViewer = ({ src, label, projectUrl }) => {
  if (!src) {
    return <div className={styles.viewerContainer}>Image not found.</div>;
  }

  const handleLaunch = () => {
    window.open(projectUrl, '_blank');
  };

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.imageContainer}>
        <img src={src} alt={label} className={styles.image} />
      </div>
      {projectUrl && (
        <div className={styles.buttonContainer}>
          <button onClick={handleLaunch} className={styles.launchButton}>
            Launch Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
