import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PDFViewer.css';

import React, { useRef, useState } from 'react';
import { Page, pdfjs, Document } from 'react-pdf';

import DraggableSignature from './draggable-signature';

// Set up PDF.js worker
// Use local worker file from public folder for better reliability
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export interface SignaturePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
}

export interface SignatureItem {
  id: string;
  signatureData: string;
  position: SignaturePosition;
}

interface PDFViewerProps {
  file: File | null;
  signatureData: string | null;
  signatures: SignatureItem[];
  onSignaturesChange: (signatures: SignatureItem[]) => void;
  placementMode: boolean;
  onPlacementModeChange: (mode: boolean) => void;
  onScaleChange?: (scale: number) => void;
  onPageDimensionsChange?: (dimensions: { width: number; height: number } | null) => void;
  onCanvasOffsetChange?: (offset: { x: number; y: number } | null) => void;
  onCanvasSizeChange?: (size: { width: number; height: number } | null) => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  file,
  signatureData,
  signatures,
  onSignaturesChange,
  placementMode,
  onPlacementModeChange,
  onScaleChange,
  onPageDimensionsChange,
  onCanvasOffsetChange,
  onCanvasSizeChange,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [, setPageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [, setCanvasOffset] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onDocumentLoadSuccess = ({ numPages: totalPages }: { numPages: number }) => {
    setNumPages(totalPages);
    setPageNumber(1);
  };

  const onPageLoadSuccess = (page: any) => {
    // Get actual PDF page dimensions in points
    const { width, height } = page;
    const dimensions = { width, height };
    setPageDimensions(dimensions);
    if (onPageDimensionsChange) {
      onPageDimensionsChange(dimensions);
    }
    
        // Store reference to the canvas element and calculate offset and size
        if (pageRef.current) {
          const canvas = pageRef.current.querySelector('canvas');
          if (canvas) {
            canvasRef.current = canvas;
            // Calculate offset of canvas within page wrapper
            const pageRect = pageRef.current.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();
            const offset = {
              x: canvasRect.left - pageRect.left,
              y: canvasRect.top - pageRect.top,
            };
            const canvasSize = {
              width: canvasRect.width,
              height: canvasRect.height,
            };
            setCanvasOffset(offset);
            if (onCanvasOffsetChange) {
              onCanvasOffsetChange(offset);
            }
            if (onCanvasSizeChange) {
              onCanvasSizeChange(canvasSize);
            }
          }
        }
  };

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    if (onScaleChange) {
      onScaleChange(newScale);
    }
    // Recalculate canvas offset and size after scale change
    setTimeout(() => {
      if (pageRef.current && canvasRef.current) {
        const pageRect = pageRef.current.getBoundingClientRect();
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const offset = {
          x: canvasRect.left - pageRect.left,
          y: canvasRect.top - pageRect.top,
        };
        const canvasSize = {
          width: canvasRect.width,
          height: canvasRect.height,
        };
        setCanvasOffset(offset);
        if (onCanvasOffsetChange) {
          onCanvasOffsetChange(offset);
        }
        if (onCanvasSizeChange) {
          onCanvasSizeChange(canvasSize);
        }
      }
    }, 100);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!placementMode || !signatureData || !pageRef.current) return;
    
    // Don't place signature if clicking on the signature itself
    const target = e.target as HTMLElement;
    if (target.closest('.draggable-signature')) {
      return;
    }
    
    // Stop event propagation to prevent conflicts
    e.stopPropagation();

    // Get the actual PDF canvas element
    const pdfCanvas = canvasRef.current || pageRef.current.querySelector('canvas');
    
    if (!pdfCanvas || !pageRef.current) {
      return;
    }

    // Get positions relative to the page wrapper (where signature will be positioned)
    const pageRect = pageRef.current.getBoundingClientRect();
    const canvasRect = pdfCanvas.getBoundingClientRect();
    
    // Calculate offset of canvas within the page wrapper
    const canvasOffsetX = canvasRect.left - pageRect.left;
    const canvasOffsetY = canvasRect.top - pageRect.top;
    
    // Calculate click position relative to canvas
    const clickX = e.clientX - canvasRect.left;
    const clickY = e.clientY - canvasRect.top;
    
    // Convert to position relative to page wrapper (where signature is positioned)
    const x = canvasOffsetX + clickX - 100; // Offset so click is near center
    const y = canvasOffsetY + clickY - 40;

    const newPosition: SignaturePosition = {
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: 200,
      height: 80,
      pageNumber,
    };

    // Create new signature item with unique ID
    const newSignature: SignatureItem = {
      id: `sig-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      signatureData,
      position: newPosition,
    };

    // Add to signatures array
    onSignaturesChange([...signatures, newSignature]);
    onPlacementModeChange(false);
  };

  const handlePositionUpdate = (signatureId: string, position: { x: number; y: number; width: number; height: number }) => {
    const updatedSignatures = signatures.map(sig => {
      if (sig.id === signatureId) {
        return {
          ...sig,
          position: {
            ...position,
            pageNumber: sig.position.pageNumber,
          },
        };
      }
      return sig;
    });
    onSignaturesChange(updatedSignatures);
  };

  const handleRemoveSignature = (signatureId: string) => {
    const updatedSignatures = signatures.filter(sig => sig.id !== signatureId);
    onSignaturesChange(updatedSignatures);
  };

  if (!file) {
    return (
      <div className="pdf-viewer-empty">
        <p>No PDF uploaded. Please upload a PDF file to get started.</p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <div className="page-controls">
          <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
            Next
          </button>
        </div>
        <div className="zoom-controls">
          <button onClick={() => handleScaleChange(Math.max(0.5, scale - 0.2))}>
            -
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => handleScaleChange(Math.min(2, scale + 0.2))}>
            +
          </button>
        </div>
      </div>
      <div className="pdf-container" ref={containerRef}>
        <div
          className={`pdf-page-wrapper ${placementMode ? 'placement-mode' : ''}`}
          onClick={handlePageClick}
          ref={pageRef}
        >
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="loading">Loading PDF...</div>}
            error={
              <div className="error">
                Failed to load PDF. Please try another file.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
              onLoadSuccess={onPageLoadSuccess}
            />
          </Document>
          {signatures
            .filter(sig => sig.position.pageNumber === pageNumber)
            .map(sig => (
              <DraggableSignature
                key={sig.id}
                signatureId={sig.id}
                signatureData={sig.signatureData}
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
                pageRef={pageRef as React.RefObject<HTMLDivElement>}
                scale={scale}
                onPositionChange={(pos) => handlePositionUpdate(sig.id, pos)}
                onRemove={() => handleRemoveSignature(sig.id)}
                initialPosition={sig.position}
              />
            ))}
        </div>
        {placementMode && (
          <div className="placement-hint">
            Click on the PDF to place your signature
          </div>
        )}
      </div>
    </div>
  );
};
