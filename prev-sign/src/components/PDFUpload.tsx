import React, { useRef } from 'react';
import './PDFUpload.css';

interface PDFUploadProps {
  onFileSelect: (file: File) => void;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleButtonClick = () => {
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
      <button onClick={handleButtonClick} className="upload-button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Upload PDF
      </button>
    </div>
  );
};

export default PDFUpload;

