import React from 'react';
import styles from './Settings.module.css';
import { wallpapers } from '../../config/wallpapers.js';

const Settings = ({ setWallpaper }) => {
  return (
    <div className={styles.settingsContainer}>
      <h2>Appearance Settings</h2>
      <p>Choose your desktop background.</p>
      <div className={styles.wallpaperGrid}>
        {wallpapers.map((wp) => (
          <div
            key={wp.name}
            className={styles.wallpaperChoice}
            onClick={() => setWallpaper(wp.value)}
          >
            <div
              className={styles.thumbnail}
              style={{
                background: wp.value && wp.value.startsWith('#')
                  ? wp.value
                  : `url(${wp.value})`,
                backgroundSize: 'cover',
              }}
            ></div>
            <span>{wp.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
