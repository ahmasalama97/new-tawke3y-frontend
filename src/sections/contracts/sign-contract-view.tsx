import './App.css';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Box, CircularProgress, Typography } from '@mui/material';

import { PDFViewer } from './components/pdf-viewer';
import { SignaturePad } from './components/signature-canvas';
import { signPDF } from './utils/pdfSigner';

import { UploadSignaturedContract_API } from 'src/APIs/API';

import type { SignatureItem } from './components/pdf-viewer';

type SignContractLocationState = {
  contractId?: number;
  fileUrl?: string;
  contractName?: string;
};

export function SignContractView() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const location = useLocation() as { state?: SignContractLocationState };

  const routeId = params.id ? Number(params.id) : undefined;
  const contractId = location.state?.contractId ?? routeId;
  const fileUrl = location.state?.fileUrl;
  const contractName = location.state?.contractName || 'Contract';

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [signatures, setSignatures] = useState<SignatureItem[]>([]);
  const [placementMode, setPlacementMode] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [pdfScale, setPdfScale] = useState<number>(1.2);
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [canvasOffset, setCanvasOffset] = useState<{ x: number; y: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      if (!fileUrl || !contractId) {
        navigate('/contracts');
        return;
      }

      try {
        setLoadingPdf(true);
        setLoadError(null);

        const response = await fetch(fileUrl, { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Failed to load contract file');
        }

        const blob = await response.blob();
        const nameWithExt = contractName.toLowerCase().endsWith('.pdf') ? contractName : `${contractName}.pdf`;
        const file = new File([blob], nameWithExt, { type: 'application/pdf' });
        setPdfFile(file);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading contract PDF:', error);
        setLoadError('Failed to load contract. Please try again from the contracts list.');
      } finally {
        setLoadingPdf(false);
      }
    };

    loadPdf();
  }, [contractId, fileUrl, contractName, navigate]);

  const handleSignatureComplete = (signature: string) => {
    setSignatureData(signature);
    setPlacementMode(true);
  };

  const handleClearSignature = () => {
    setSignatureData(null);
    setPlacementMode(false);
    setSignatures([]);
  };

  const handleRemoveSignature = (signatureId: string) => {
    setSignatures((prev) => prev.filter((sig) => sig.id !== signatureId));
  };

  const handleSaveSignedContract = async () => {
    if (!pdfFile || signatures.length === 0 || !contractId) {
      alert('Please wait for the contract to load and place at least one signature on the document.');
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

      const originalName = contractName.replace(/\.pdf$/i, '');
      const newFilename = `${originalName}_signed.pdf`;
      const blob = new Blob([Uint8Array.from(signedPdfBytes)], { type: 'application/pdf' });
      const signedFile = new File([blob], newFilename, { type: 'application/pdf' });

      const currentUserRaw = localStorage.getItem('current_user');
      const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

      const formData = new FormData();
      formData.append('file', signedFile);
      formData.append('contractid', String(contractId));
      if (currentUser?.id) formData.append('userid', String(currentUser.id));
      if (currentUser?.username) formData.append('username', String(currentUser.username));
      if (currentUser?.name) formData.append('name', String(currentUser.name));
      if (currentUser?.address) formData.append('address', String(currentUser.address));

      await UploadSignaturedContract_API(formData);

      navigate('/contracts');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving signed contract:', error);
      alert('Failed to save signed contract. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };

  if (loadingPdf || !pdfFile) {
    return (
      <Box className="app">
        <Box className="app-container">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Sign Contract
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '40vh',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {loadError ? (
              <>
                <Typography color="error">{loadError}</Typography>
                <button
                  type="button"
                  className="download-button"
                  onClick={() => navigate('/contracts')}
                >
                  Back to Contracts
                </button>
              </>
            ) : (
              <>
                <CircularProgress />
                <Typography>Loading contract...</Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="app">
      <Box className="app-container">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Sign Contract
        </Typography>
        <Box className="app-content">
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
                        type="button"
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
                            type="button"
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
                      type="button"
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
                  type="button"
                  onClick={handleSaveSignedContract}
                  disabled={signatures.length === 0 || isSigning}
                  className="download-button"
                >
                  {isSigning ? (
                    <>
                      <span className="spinner" />
                      Saving signed contract...
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
                      Save Signed Contract
                    </>
                  )}
                </button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

