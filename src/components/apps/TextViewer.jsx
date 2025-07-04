import React from 'react';
import styles from './TextViewer.module.css';

const TextViewer = ({ content }) => {
  return (
    <div className={styles.container}>
      <pre className={styles.content}>{content || ''}</pre>
    </div>
  );
};

export default TextViewer;
