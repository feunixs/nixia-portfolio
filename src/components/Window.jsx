import React, { memo, useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable'; // Migrated to re-resizable
import styles from './Window.module.css';
// 'react-resizable/css/styles.css' is no longer needed
import { FiX, FiSquare, FiMinus } from 'react-icons/fi';

const Window = ({
  id,
  title,
  content,
  zIndex,
  onFocus,
  onClose,
  onResize,
  onDrag,
  size,
  position,
  onMinimize,
  onMaximize,
  isMaximized,
  isFocused,
}) => {
  const nodeRef = useRef(null);

  const handleFocus = () => {
    if (onFocus) onFocus(id);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".title-bar"
      position={position}
      onStart={handleFocus}
      onDrag={onDrag}
      cancel={`.${styles.controls}`}
      disabled={isMaximized}
    >
      <div
        ref={nodeRef}
        className={`${styles.window} ${isMaximized ? styles.maximized : ''} ${isFocused ? styles.focused : ''}`}
        style={{ width: size.width, height: size.height, zIndex }}
        onMouseDown={handleFocus}
      >
        <Resizable
          size={
            isMaximized
              ? { width: '100%', height: '100%' }
              : { width: size.width, height: size.height }
          }
          minWidth={300}
          minHeight={200}
          onResizeStop={(e, direction, ref, d) => {
            onResize(id, {
              width: size.width + d.width,
              height: size.height + d.height,
            });
          }}
          className={styles.fadeIn}
          enable={!isMaximized}
        >
          <div
            className={styles.window}
            style={{ width: '100%', height: '100%' }}
          >
            <div
              className={`${styles.titleBar} title-bar`}
              onDoubleClick={() => onMaximize(id)}
            >
              <span className={styles.title}>{title}</span>
              <div className={styles.controls}>
                <button
                  className={styles.control}
                  onClick={() => onMinimize(id)}
                  aria-label="Minimize"
                >
                  <FiMinus />
                </button>
                <button
                  className={styles.control}
                  onClick={() => onMaximize(id)}
                  aria-label="Maximize"
                >
                  <FiSquare />
                </button>
                <button
                  className={`${styles.control} ${styles.close}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(id);
                  }}
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>
            </div>
            <div className={styles.content}>{content}</div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default memo(Window);
