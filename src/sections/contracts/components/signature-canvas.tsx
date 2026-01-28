import './SignatureCanvas.css';

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignatureCanvasProps {
  onSignatureComplete: (signatureData: string) => void;
  onClear: () => void;
}

export const SignaturePad: React.FC<SignatureCanvasProps> = ({
  onSignatureComplete,
  onClear,
}) => {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    sigPadRef.current?.clear();
    setIsEmpty(true);
    onClear();
  };

  const handleSave = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      // Get the canvas element
      const canvas = sigPadRef.current.getCanvas();
      
      // Create a new canvas with transparent background
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext('2d', { willReadFrequently: false });
      
      if (ctx) {
        // First, draw the original canvas to the temp canvas
        ctx.drawImage(canvas, 0, 0);
        
        // Get image data from the temp canvas
        const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        // Make white pixels transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // If pixel is white (or very close to white), make it transparent
          if (r > 250 && g > 250 && b > 250) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
        
        // Put the modified image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Get signature with transparent background
        const signatureData = tempCanvas.toDataURL('image/png');
        onSignatureComplete(signatureData);
        setIsEmpty(false);
      } else {
        // Fallback: try to get PNG which should preserve some transparency
        const signatureData = sigPadRef.current.toDataURL('image/png');
        onSignatureComplete(signatureData);
        setIsEmpty(false);
      }
    } else {
      alert('Please draw a signature first');
    }
  };

  const handleEnd = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      setIsEmpty(false);
    }
  };

  return (
    <div className="signature-canvas-container">
      <h3>Draw Your Signature</h3>
      <div className="signature-wrapper">
        <SignatureCanvas
          ref={sigPadRef}
          canvasProps={{
            className: 'signature-canvas',
            width: 600,
            height: 200,
          }}
          backgroundColor="#ffffff"
          penColor="#000000"
          onEnd={handleEnd}
        />
      </div>
      <div className="signature-controls">
        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
        <button onClick={handleSave} className="save-button" disabled={isEmpty}>
          Save Signature
        </button>
      </div>
    </div>
  );
};
