import React, { useState, useEffect, useCallback } from 'react';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Terminal from './components/apps/Terminal';
import AboutMe from './components/apps/AboutMe';
import CV from './components/apps/CV';
import FolderWindow from './components/apps/FolderWindow';
import TextViewer from './components/apps/TextViewer';
import ImageViewer from './components/apps/ImageViewer';
import ImageGalleryViewer from './components/apps/ImageGalleryViewer';
import Settings from './components/apps/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import { initialDesktopIcons, getIconComponent } from './config/desktop.js';
import { useWindows } from './context/WindowContext.jsx';
import { criticalAssets } from './config/assets.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const {
    windows,
    focusedWindow,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    dragWindow,
    resizeWindow,
  } = useWindows();
  const [wallpaper, setWallpaper] = useState(null);

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [draggedIcon, setDraggedIcon] = useState({
    id: null,
    offset: { x: 0, y: 0 },
  });

  const [desktopIcons, setDesktopIcons] = useState(initialDesktopIcons);

  useEffect(() => {
    const totalAssets = criticalAssets.length;
    if (totalAssets === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;

    const handleAssetLoad = () => {
      loadedCount++;
      const newProgress = (loadedCount / totalAssets) * 100;
      setProgress(newProgress);

      if (loadedCount === totalAssets) {
        // Wait for the progress bar to hit 100% before fading
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // A delay for the fade-out transition
      }
    };

    criticalAssets.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = handleAssetLoad;
      img.onerror = handleAssetLoad; // Count errors as loaded to not block the app
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (wallpaper === null) {
      document.body.style.background = ''; // Reset to default CSS wallpaper
      return;
    }

    // Handle color strings
    if (typeof wallpaper === 'string' && wallpaper.startsWith('#')) {
      document.body.style.background = wallpaper;
    }
    // Handle wallpaper objects with a URL
    else if (typeof wallpaper === 'object' && wallpaper.url) {
      document.body.style.background = `var(--background-color) url('${wallpaper.url}') no-repeat center center`;
      document.body.style.backgroundSize = 'cover';
    }
  }, [wallpaper, isLoading]);

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null);
  }, []);

  const handleDragStart = (e, iconId) => {
    const rect = e.target.getBoundingClientRect();
    setDraggedIcon({
      id: iconId,
      offset: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDropOnDesktop = (e) => {
    e.preventDefault();
    if (draggedIcon.id) {
      const desktopRect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - desktopRect.left - draggedIcon.offset.x;
      const newY = e.clientY - desktopRect.top - draggedIcon.offset.y;
      setDesktopIcons((icons) =>
        icons.map((icon) =>
          icon.id === draggedIcon.id
            ? { ...icon, position: { x: newX, y: newY } }
            : icon,
        ),
      );
    }
    setDraggedIcon({ id: null, offset: { x: 0, y: 0 } });
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={progress} />
      <div
        className="App"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in',
        }}
        onDragOver={handleDragOver}
        onDrop={handleDropOnDesktop}
        onClick={handleDesktopClick}
      >
        <TopBar />
        <Dock />
        <div className="desktop-icons-container">
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              position={icon.position}
              icon={getIconComponent(icon)}
              onDoubleClick={() => openWindow(icon)}
              onSelect={() => setSelectedIcon(icon.id)}
              isSelected={selectedIcon === icon.id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, icon.id)}
            />
          ))}
        </div>
        {Object.values(windows).map((win) => {
          if (win.isMinimized) return null;

          const getWindowContent = () => {
            const props = {
              ...win.content,
              windowId: win.id,
              onClose: () => closeWindow(win.id),
              setWallpaper: setWallpaper,
              openWindow: openWindow,
              desktopIcons: desktopIcons, // Pass for terminal's ls command
              onOpenCv: () =>
                openWindow(desktopIcons.find((i) => i.id === 'cv')),
              onOpenAbout: () =>
                openWindow(desktopIcons.find((i) => i.id === 'about')),
            };

            switch (win.type) {
              case 'folder':
                return (
                  <FolderWindow folder={win.content} onOpenFile={openWindow} />
                );
              case 'file':
                return <TextViewer content={win.content.content} />;
              case 'image':
                return (
                  <ImageViewer
                    src={win.content.src}
                    label={win.content.label}
                    projectUrl={win.content.projectUrl}
                  />
                );
              case 'gallery':
                return <ImageGalleryViewer sources={win.content.sources} />;
              case 'app':
                switch (win.appId) {
                  case 'terminal':
                    return <Terminal {...props} />;
                  case 'about':
                    return <AboutMe {...props} />;
                  case 'cv':
                    return <CV {...props} />;
                  case 'settings':
                    return <Settings {...props} />;
                  default:
                    return <div>Unknown App: {win.appId}</div>;
                }
              default:
                return <div>Unknown window type: {win.type}</div>;
            }
          };

          return (
            <ErrorBoundary key={win.id}>
              <Window
                id={win.id}
                title={win.title}
                content={getWindowContent()}
                size={win.size}
                position={win.position}
                zIndex={win.zIndex}
                onClose={() => closeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                onDrag={(e, data) => dragWindow(win.id, data)}
                onResize={(id, size) => resizeWindow(id, size)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                isMaximized={win.isMaximized}
                isFocused={focusedWindow === win.id}
              />
            </ErrorBoundary>
          );
        })}
      </div>
    </>
  );
}

export default App;
