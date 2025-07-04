import React from 'react';
import styles from './DesktopIcon.module.css';

const DesktopIcon = ({
  icon,
  label,
  onDoubleClick,
  onSelect,
  isSelected,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnter,
  onDragLeave,
  isDragging,
  isDragOver,
  position,
}) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent desktop click from deselecting
    onSelect();
  };

  const containerClasses = [
    styles.iconContainer,
    isSelected ? styles.selected : '',
    isDragging ? styles.dragging : '',
    isDragOver ? styles.dragOver : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Jika parent menggunakan position: fixed, jangan set position: absolute
  const style =
    position && position.x !== undefined && position.y !== undefined
      ? { left: position.x, top: position.y }
      : {};

  const IconComponent = icon;

  return (
    <div
      className={containerClasses}
      style={style}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <div className={styles.icon}>{IconComponent && <IconComponent />}</div>
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default DesktopIcon;
