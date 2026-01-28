import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

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

export const signPDF = async (
  pdfFile: File,
  signatures: SignatureItem[],
  scale: number = 1.2,
  pageDimensions: { width: number; height: number } | null = null,
  canvasOffset?: { x: number; y: number },
  canvasSize?: { width: number; height: number }
): Promise<Uint8Array> => {
  try {
    // Read the PDF file
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    // Process each signature
    for (const signatureItem of signatures) {
      const { signatureData, position } = signatureItem;
      
      // Get the page to sign (0-indexed, so subtract 1)
      if (position.pageNumber < 1 || position.pageNumber > pages.length) {
        console.warn(`Invalid page number ${position.pageNumber} for signature ${signatureItem.id}`);
        continue;
      }

      const pageToSign = pages[position.pageNumber - 1];
      const { width: pageWidth, height: pageHeight } = pageToSign.getSize();

      // Convert signature data URL to image
      const signatureImage = await pdfDoc.embedPng(signatureData);

      // Calculate the actual PDF coordinates
      let pdfX: number, pdfY: number, pdfWidth: number, pdfHeight: number;

      if (pageDimensions && canvasOffset) {
        // The position is relative to the page wrapper
        // We need to subtract the canvas offset to get position relative to canvas
        const canvasRelativeX = Math.max(0, position.x - canvasOffset.x);
        const canvasRelativeY = Math.max(0, position.y - canvasOffset.y);
        
        // Use actual canvas size if available, otherwise calculate from pageDimensions * scale
        const screenWidth = canvasSize?.width || (pageDimensions.width * scale);
        const screenHeight = canvasSize?.height || (pageDimensions.height * scale);
        
        // Convert screen coordinates to PDF coordinates (PDF uses points, 72 DPI)
        pdfX = (canvasRelativeX / screenWidth) * pageWidth;
        
        // For Y coordinate conversion:
        const screenYTop = canvasRelativeY;
        const pdfYTop = pageHeight - (screenYTop / screenHeight) * pageHeight;
        pdfHeight = (position.height / screenHeight) * pageHeight;
        pdfY = pdfYTop - pdfHeight;
        
        pdfWidth = (position.width / screenWidth) * pageWidth;
        
        // Ensure coordinates are within bounds
        pdfX = Math.max(0, Math.min(pdfX, pageWidth - pdfWidth));
        pdfY = Math.max(0, Math.min(pdfY, pageHeight - pdfHeight));
      } else {
        // Fallback: use approximate conversion
        const pdfScale = 72 / (96 * scale);
        const canvasRelativeX = canvasOffset ? position.x - canvasOffset.x : position.x;
        const canvasRelativeY = canvasOffset ? position.y - canvasOffset.y : position.y;
        pdfX = canvasRelativeX * pdfScale;
        pdfWidth = position.width * pdfScale;
        pdfHeight = position.height * pdfScale;
        const screenYTop = canvasRelativeY;
        const pdfYTop = pageHeight - screenYTop * pdfScale;
        pdfY = pdfYTop - pdfHeight;
      }

      // Add signature to the PDF
      pageToSign.drawImage(signatureImage, {
        x: pdfX,
        y: pdfY,
        width: pdfWidth,
        height: pdfHeight,
      });
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error signing PDF:', error);
    throw new Error('Failed to sign PDF');
  }
};

export const downloadPDF = (pdfBytes: Uint8Array, filename: string) => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

