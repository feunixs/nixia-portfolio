import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiDownload } from 'react-icons/fi';
import styles from './CV.module.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker, which is essential for react-pdf to work with Vite
// This imports the worker from the pdfjs-dist package
// Point to the worker file that was copied to the public folder
pdfjs.GlobalWorkerOptions.workerSrc = '/assets/libs/pdf.worker.min.js';

const CV = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfFile = '/assets/documents/Muhamad_Zaki_CV_2025.pdf';

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Reset to the first page on new document load
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  const goToPreviousPage = () => changePage(-1);
  const goToNextPage = () => changePage(1);

  return (
    <div className={styles.cvContainer}>
      <div className={styles.controls}>
        <a
          href={pdfFile}
          download="Muhamad_Zaki_CV_2025.pdf"
          className={styles.downloadButton}
        >
          <FiDownload />
          Download
        </a>
        <div className={styles.pageControls}>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={goToPreviousPage}
            className={styles.controlButton}
          >
            Previous
          </button>
          <p className={styles.pageInfo}>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={goToNextPage}
            className={styles.controlButton}
          >
            Next
          </button>
        </div>
      </div>
      <div className={styles.documentContainer}>
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className={styles.loading}>Loading CV...</div>}
        >
          <Page pageNumber={pageNumber} renderTextLayer={false} />
        </Document>
      </div>
    </div>
  );
};

export default CV;
