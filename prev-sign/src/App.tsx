import React, { useState } from 'react';
import PDFUpload from './components/PDFUpload';
import PDFViewer, { SignatureItem } from './components/PDFViewer';
import SignaturePad from './components/SignatureCanvas';
import { signPDF, downloadPDF } from './utils/pdfSigner';
import './App.css';

const App: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [signatures, setSignatures] = useState<SignatureItem[]>([]);
  const [placementMode, setPlacementMode] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [pdfScale, setPdfScale] = useState<number>(1.2);
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [canvasOffset, setCanvasOffset] = useState<{ x: number; y: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null);

  const handleFileSelect = (file: File) => {
    setPdfFile(file);
    setSignatureData(null); // Reset signature when new file is uploaded
    setSignatures([]);
    setPlacementMode(false);
  };

  const handleSignatureComplete = (signature: string) => {
    setSignatureData(signature);
    setPlacementMode(true); // Enable placement mode after signature is created
  };

  const handleClearSignature = () => {
    setSignatureData(null);
    setPlacementMode(false);
  };

  const handleRemoveSignature = (signatureId: string) => {
    setSignatures(signatures.filter(sig => sig.id !== signatureId));
  };

  const handleDownloadSignedPDF = async () => {
    if (!pdfFile || signatures.length === 0) {
      alert('Please upload a PDF, create at least one signature, and place it on the PDF first');
      return;
    }

    setIsSigning(true);
    try {
      const signedPdfBytes = await signPDF(pdfFile, signatures, pdfScale, pageDimensions, canvasOffset, canvasSize);
      const originalName = pdfFile.name.replace('.pdf', '');
      const newFilename = `${originalName}_signed.pdf`;
      downloadPDF(signedPdfBytes, newFilename);
    } catch (error) {
      console.error('Error downloading signed PDF:', error);
      alert('Failed to create signed PDF. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>PDF Signature App</h1>
          <p>Upload, view, sign, and download your PDF documents</p>
        </header>

        <div className="app-content">
          <div className="upload-section">
            <PDFUpload onFileSelect={handleFileSelect} />
          </div>

          {pdfFile && (
            <>
              <div className="viewer-section">
                <PDFViewer
                  file={pdfFile}
                  signatureData={signatureData}
                  signatures={signatures}
                  onSignaturesChange={setSignatures}
                  placementMode={placementMode}
                  onPlacementModeChange={setPlacementMode}
                  onScaleChange={setPdfScale}
                  onPageDimensionsChange={setPageDimensions}
                  onCanvasOffsetChange={setCanvasOffset}
                  onCanvasSizeChange={setCanvasSize}
                />
              </div>

              <div className="signature-section">
                <SignaturePad
                  onSignatureComplete={handleSignatureComplete}
                  onClear={handleClearSignature}
                />
                {signatureData && (
                  <div className="placement-instruction">
                    <p>✓ Signature created! Click on the PDF above to place it.</p>
                    {!placementMode && (
                      <button
                        onClick={() => setPlacementMode(true)}
                        className="place-signature-button"
                      >
                        Place Signature on PDF
                      </button>
                    )}
                    {placementMode && (
                      <p className="placement-hint-text">Click anywhere on the PDF to place this signature</p>
                    )}
                  </div>
                )}
                {signatures.length > 0 && (
                  <div className="signatures-list">
                    <h4>Placed Signatures ({signatures.length})</h4>
                    <div className="signatures-list-items">
                      {signatures.map((sig, index) => (
                        <div key={sig.id} className="signature-list-item">
                          <span>Signature {index + 1} - Page {sig.position.pageNumber}</span>
                          <button
                            onClick={() => handleRemoveSignature(sig.id)}
                            className="remove-signature-button"
                            title="Remove signature"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setPlacementMode(true)}
                      className="add-signature-button"
                      disabled={!signatureData}
                    >
                      + Add Another Signature
                    </button>
                  </div>
                )}
              </div>

              <div className="download-section">
                <button
                  onClick={handleDownloadSignedPDF}
                  disabled={signatures.length === 0 || isSigning}
                  className="download-button"
                >
                  {isSigning ? (
                    <>
                      <span className="spinner"></span>
                      Signing PDF...
                    </>
                  ) : (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Signed PDF ({signatures.length} signature{signatures.length !== 1 ? 's' : ''})
                    </>
                  )}
                </button>
                {signatures.length > 0 && (
                  <p className="signature-status">
                    ✓ {signatures.length} signature{signatures.length !== 1 ? 's' : ''} ready. Click download to get your signed PDF.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

