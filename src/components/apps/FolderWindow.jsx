import React, { useState } from 'react';
import styles from './FolderWindow.module.css';
import FileIcon from './FileIcon';
import { FiFolder, FiFileText, FiImage, FiLink, FiGrid } from 'react-icons/fi';

const FolderWindow = ({ folder, onOpenFile }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  if (!folder || !folder.children) {
    return (
      <div className={styles.folderContainer}>
        Folder not found or is empty.
      </div>
    );
  }

  const getIcon = (item) => {
    switch (item.type) {
      case 'folder':
        return <FiFolder />;
      case 'file':
        return <FiFileText />;
      case 'gallery':
        return <FiImage />;
      case 'image': // This is now the launcher
        return <FiGrid />;
      case 'link':
        return <FiLink />;
      default:
        return <FiFileText />;
    }
  };

  const handleDoubleClick = (item) => {
    if (
      item.type === 'folder' ||
      item.type === 'file' ||
      item.type === 'image' ||
      item.type === 'gallery'
    ) {
      onOpenFile(item);
    } else if (item.type === 'link') {
      window.open(item.url, '_blank');
    }
  };

  const handleContainerClick = (e) => {
    // Deselect icon if clicking on the folder background
    if (e.target.classList.contains(styles.folderContainer)) {
      setSelectedIcon(null);
    }
  };

  return (
    <div className={styles.folderContainer} onClick={handleContainerClick}>
      {folder.children.map((item) => (
        <FileIcon
          key={item.id}
          label={item.label}
          icon={getIcon(item)}
          onDoubleClick={() => handleDoubleClick(item)}
          onSelect={() => setSelectedIcon(item.id)}
          isSelected={selectedIcon === item.id}
        />
      ))}
    </div>
  );
};

export default FolderWindow;
