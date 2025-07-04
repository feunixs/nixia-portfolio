import React from 'react';
import { useWindows } from '../context/WindowContext.jsx';
import styles from './Dock.module.css';
import { mainApps, utilityApps } from '../config/dock.js';
import { FiFolder, FiFileText, FiImage } from 'react-icons/fi';

const Dock = () => {
  const { windows, openWindow } = useWindows();

  const staticAppsMap = new Map();
  mainApps.forEach((app) => staticAppsMap.set(app.id, app));
  utilityApps.forEach((app) => staticAppsMap.set(app.id, app));

  const dynamicDockItems = Object.values(windows)
    .filter((win) => !staticAppsMap.has(win.appId))
    .map((win) => {
      let icon,
        isImgSrc = false;
      switch (win.type) {
        case 'folder':
          icon = FiFolder;
          break;
        case 'file':
          icon = FiFileText;
          break;
        case 'image':
          icon = win.content.src;
          isImgSrc = true;
          break;
        case 'gallery':
          icon = FiImage;
          break;
        default:
          icon = FiFileText;
      }
      return {
        id: win.appId,
        label: win.title,
        icon: icon,
        isImgSrc: isImgSrc,
        type: win.type,
        children: win.content?.children,
        content: win.content?.content,
        src: win.content?.src,
        projectUrl: win.content?.projectUrl,
        sources: win.content?.sources,
      };
    });

  const combinedMainApps = [...mainApps, ...dynamicDockItems];

  const handleIconClick = (app) => {
    openWindow(app);
  };

  const renderDockIcon = (app) => {
    const isOpen = Object.values(windows).some(
      (win) => win.appId === app.id && !win.isMinimized,
    );
    const IconComponent = !app.isImgSrc ? app.icon : null;

    return (
      <div
        key={app.id}
        className={styles.dockIconContainer}
        title={app.label}
        onClick={() => handleIconClick(app)}
      >
        {isOpen && <div className={styles.activePip}></div>}
        <div className={styles.dockIcon}>
          {app.isImgSrc ? (
            <img src={app.icon} alt={app.label} className={styles.iconImage} />
          ) : (
            IconComponent && <IconComponent className={styles.icon} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dock}>
      <div className={styles.mainApps}>
        {combinedMainApps.map(renderDockIcon)}
      </div>
      <div className={styles.utilityApps}>
        <div className={styles.separator}></div>
        {utilityApps.map(renderDockIcon)}
      </div>
    </div>
  );
};

export default Dock;
