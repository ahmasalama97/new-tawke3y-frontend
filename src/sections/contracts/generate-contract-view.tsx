import './App.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { PDFUpload } from './components/pdf-upload';
import { PDFViewer } from './components/pdf-viewer';
import { signPDF } from './utils/pdfSigner';
import { SignaturePad } from './components/signature-canvas';

import { UploadPersonalContract_API } from 'src/APIs/API';

import type { SignatureItem } from './components/pdf-viewer';

const mockLang = {
  generateContract: 'Generate Contract',
};

export function GenerateContractView() {
  const navigate = useNavigate();

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
      const signedPdfBytes = await signPDF(
        pdfFile,
        signatures,
        pdfScale,
        pageDimensions,
        canvasOffset ?? undefined,
        canvasSize ?? undefined,
      );

      // Create a Blob/File from the signed bytes
      const originalName = pdfFile.name.replace(/\.pdf$/i, '');
      const newFilename = `${originalName}_signed.pdf`;
      const blob = new Blob([Uint8Array.from(signedPdfBytes)], { type: 'application/pdf' });
      const signedFile = new File([blob], newFilename, { type: 'application/pdf' });

      // Prepare form data for backend upload (company personal contracts -> companycontracts table)
      const formData = new FormData();
      formData.append('file', signedFile);
      formData.append('contractname', originalName);

      await UploadPersonalContract_API(formData);

      // After successful upload, go back to contracts list (which refetches for company role)
      navigate('/contracts');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error uploading signed PDF:', error);
      alert('Failed to save signed PDF. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <Box className="app">
      <Box className="app-container">
        <Typography variant="h4" sx={{ mb: 3 }}>
          {mockLang.generateContract}
        </Typography>
        <Box className="app-content">
          <Box className="upload-section">
            <PDFUpload onFileSelect={handleFileSelect} />
          </Box>

          {pdfFile && (
            <>
              <Box className="viewer-section">
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
              </Box>

              <Box className="signature-section">
                <SignaturePad
                  onSignatureComplete={handleSignatureComplete}
                  onClear={handleClearSignature}
                />
                {signatureData && (
                  <Box className="placement-instruction">
                    <Typography component="p" sx={{ color: '#1e40af', fontWeight: 600, marginBottom: '10px' }}>
                      ✓ Signature created! Click on the PDF above to place it.
                    </Typography>
                    {!placementMode && (
                      <button
                        onClick={() => setPlacementMode(true)}
                        className="place-signature-button"
                      >
                        Place Signature on PDF
                      </button>
                    )}
                    {placementMode && (
                      <Typography component="p" className="placement-hint-text">
                        Click anywhere on the PDF to place this signature
                      </Typography>
                    )}
                  </Box>
                )}
                {signatures.length > 0 && (
                  <Box className="signatures-list">
                    <Typography variant="h4" component="h4" sx={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: 600 }}>
                      Placed Signatures ({signatures.length})
                    </Typography>
                    <Box className="signatures-list-items">
                      {signatures.map((sig, index) => (
                        <Box key={sig.id} className="signature-list-item">
                          <Typography component="span">
                            Signature {index + 1} - Page {sig.position.pageNumber}
                          </Typography>
                          <button
                            onClick={() => handleRemoveSignature(sig.id)}
                            className="remove-signature-button"
                            title="Remove signature"
                          >
                            ×
                          </button>
                        </Box>
                      ))}
                    </Box>
                    <button
                      onClick={() => setPlacementMode(true)}
                      className="add-signature-button"
                      disabled={!signatureData}
                    >
                      + Add Another Signature
                    </button>
                  </Box>
                )}
              </Box>

              <Box className="download-section">
                <button
                  onClick={handleDownloadSignedPDF}
                  disabled={signatures.length === 0 || isSigning}
                  className="download-button"
                >
                  {isSigning ? (
                    <>
                      <span className="spinner" />
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
                      Save Signed PDF
                    </>
                  )}
                </button>
                {signatures.length > 0 && (
                  <Typography component="p" className="signature-status">
                    ✓ {signatures.length} signature{signatures.length !== 1 ? 's' : ''} ready. Click download to get your signed PDF.
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
