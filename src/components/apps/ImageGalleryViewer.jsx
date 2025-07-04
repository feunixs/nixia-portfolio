import React, { useState } from 'react';
import styles from './ImageGalleryViewer.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageGalleryViewer = ({ sources }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!sources || sources.length === 0) {
    return <div className={styles.galleryContainer}>No images found.</div>;
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? sources.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === sources.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.mainImageContainer}>
        <button
          onClick={goToPrevious}
          className={`${styles.navButton} ${styles.left}`}
        >
          <FiChevronLeft />
        </button>
        <img
          src={sources[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className={styles.mainImage}
        />
        <button
          onClick={goToNext}
          className={`${styles.navButton} ${styles.right}`}
        >
          <FiChevronRight />
        </button>
      </div>
      <div className={styles.thumbnailContainer}>
        {sources.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className={`${styles.thumbnail} ${currentIndex === index ? styles.active : ''}`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryViewer;
