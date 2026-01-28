import SignatureCanvas from 'react-signature-canvas';
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

interface SimpleSignatureCanvasProps {
  onEnd?: () => void;
  penColor?: string;
  canvasProps?: {
    width: number;
    height: number;
    className?: string;
    backgroundColor?: string;
  };
  backgroundColor?: string;
}

export interface SignatureCanvasHandle {
  getTrimmedCanvas: () => HTMLCanvasElement;
  clear: () => void;
}

export const SimpleSignatureCanvas = forwardRef<SignatureCanvasHandle, SimpleSignatureCanvasProps>(
  ({ onEnd, penColor = '#000', canvasProps = { width: 500, height: 200 }, backgroundColor = '#f5f5f5' }, ref) => {
    const sigPadRef = useRef<SignatureCanvas>(null);

    useImperativeHandle(ref, () => ({
      getTrimmedCanvas: () => {
        if (!sigPadRef.current) {
          throw new Error('Canvas not found');
        }
        return sigPadRef.current.getCanvas();
      },
      clear: () => {
        sigPadRef.current?.clear();
      },
    }), []);

    return (
      <SignatureCanvas
        ref={sigPadRef}
        canvasProps={{
          className: canvasProps.className || 'signature-canvas',
          width: canvasProps.width,
          height: canvasProps.height,
        }}
        backgroundColor={backgroundColor}
        penColor={penColor}
        onEnd={onEnd}
      />
    );
  }
);

SimpleSignatureCanvas.displayName = 'SimpleSignatureCanvas';
