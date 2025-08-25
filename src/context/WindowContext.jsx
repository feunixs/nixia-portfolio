import React, { createContext, useState, useCallback, useContext } from 'react';

const WindowContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWindows = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState({});
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(1);

  const focusWindow = useCallback(
    (id) => {
      if (id === focusedWindow) return;
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], zIndex: nextZIndex },
      }));
      setNextZIndex((prev) => prev + 1);
      setFocusedWindow(id);
    },
    [nextZIndex, focusedWindow],
  );

  const openWindow = useCallback(
    (icon) => {
      const existingWindow = Object.values(windows).find(
        (w) => w.appId === icon.id,
      );

      if (existingWindow) {
        if (existingWindow.isMinimized) {
          setWindows((prev) => ({
            ...prev,
            [existingWindow.id]: {
              ...prev[existingWindow.id],
              isMinimized: false,
              zIndex: nextZIndex,
            },
          }));
        } else {
          setWindows((prev) => ({
            ...prev,
            [existingWindow.id]: {
              ...prev[existingWindow.id],
              zIndex: nextZIndex,
            },
          }));
        }
        setNextZIndex((prev) => prev + 1);
        setFocusedWindow(existingWindow.id);
        return;
      }

      const newWindowId = Date.now();
      const newWindow = {
        id: newWindowId,
        appId: icon.id,
        title: icon.label,
        type: icon.type,
        content: icon, // Pass the whole icon object for context
        size: { width: 600, height: 400 },
        position: {
          x: 150 + Object.keys(windows).length * 30,
          y: 100 + Object.keys(windows).length * 30,
        },
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZIndex,
      };

      setWindows((prev) => ({ ...prev, [newWindowId]: newWindow }));
      setFocusedWindow(newWindowId);
      setNextZIndex((prev) => prev + 1);
    },
    [windows, nextZIndex],
  );

  const closeWindow = useCallback((id) => {
    setWindows((prev) => {
      const newWindows = { ...prev };
      delete newWindows[id];
      return newWindows;
    });
  }, []);

  const dragWindow = useCallback((id, data) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position: { x: data.x, y: data.y } },
    }));
  }, []);

  const resizeWindow = useCallback((id, newSize) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      const width =
        typeof newSize.width === 'string'
          ? parseInt(newSize.width.replace('px', ''), 10)
          : newSize.width;
      const height =
        typeof newSize.height === 'string'
          ? parseInt(newSize.height.replace('px', ''), 10)
          : newSize.height;
      return { ...prev, [id]: { ...win, size: { width, height } } };
    });
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    setFocusedWindow(null);
  }, []);

  const maximizeWindow = useCallback(
    (id) => {
      setWindows((prev) => {
        const win = prev[id];
        if (!win) return prev;
        const newWin = win.isMaximized
          ? {
              ...win,
              isMaximized: false,
              size: win.prevSize,
              position: win.prevPosition,
              zIndex: nextZIndex,
            }
          : {
              ...win,
              isMaximized: true,
              prevSize: win.size,
              prevPosition: win.position,
              position: { x: 0, y: 0 },
              zIndex: nextZIndex,
            };
        return { ...prev, [id]: newWin };
      });
      setNextZIndex((prev) => prev + 1);
      setFocusedWindow(id);
    },
    [nextZIndex],
  );

  const restoreWindow = useCallback(
    (id) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMinimized: false, zIndex: nextZIndex },
      }));
      setNextZIndex((prev) => prev + 1);
      setFocusedWindow(id);
    },
    [nextZIndex],
  );

  const value = {
    windows,
    focusedWindow,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    dragWindow,
    resizeWindow,
  };

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};
