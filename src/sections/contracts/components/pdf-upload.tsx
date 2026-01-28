import './PDFUpload.css';

import React, { useRef, useState } from 'react';

interface PDFUploadProps {
  onFileSelect: (file: File) => void;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const validateAndSelectFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please select a valid PDF file');
      return;
    }
    
    // Check file size (1GB = 1073741824 bytes)
    const maxSize = 1073741824;
    if (file.size > maxSize) {
      alert('File size exceeds 1GB limit. Please select a smaller file.');
      return;
    }
    
    onFileSelect(file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pdf-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div
        className={`pdf-upload-area ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Document Icons */}
        <div className="document-icons">
          <div className="document-icon document-icon-left" />
          <div className="document-icon document-icon-center" />
          <div className="document-icon document-icon-right" />
        </div>

        {/* Text Content */}
        <div className="upload-text">
          <span className="upload-instruction">
            Drag and drop your PDF&apos;S here or{' '}
            <button type="button" className="browse-link" onClick={handleBrowseClick}>
              Browse
            </button>
          </span>
          <span className="file-size-limit">(max. 1gb)</span>
        </div>
      </div>
    </div>
  );
};
