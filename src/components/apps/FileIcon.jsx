import React from 'react';
import styles from './FileIcon.module.css';

const FileIcon = ({ label, icon, onDoubleClick, onSelect, isSelected }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent folder click from deselecting
    onSelect();
  };

  return (
    <div
      className={`${styles.fileIcon} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default FileIcon;
