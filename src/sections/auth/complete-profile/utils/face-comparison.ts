/**
 * Face Comparison Utility using face-api.js
 * Uses pre-trained deep learning models for accurate face recognition
 */

import * as faceapi from 'face-api.js';

interface FaceComparisonResult {
  distance: number;
  isMatch: boolean;
  confidence: number;
}

let modelsLoaded = false;
let isLoadingModels = false;

/**
 * Load face-api.js models (only once)
 */
async function loadModels(): Promise<void> {
  if (modelsLoaded) return;
  if (isLoadingModels) {
    // Wait for ongoing load
    while (isLoadingModels) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return;
  }

  isLoadingModels = true;
  try {
    // Load models from CDN (jsdelivr)
    // Using the official face-api.js models from jsdelivr
    const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights';
    
    console.log('Loading face-api.js models from CDN...');
    
    // Load required models for face detection and recognition
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    
    console.log('Face-api.js models loaded successfully');
    modelsLoaded = true;
  } catch (error) {
    console.error('Error loading face-api models from CDN:', error);
    // Try alternative CDN
    try {
      console.log('Trying alternative CDN...');
      const ALT_MODEL_URL = 'https://cdn.jsdelivr.net/gh/cgarciagl/face-api.js@0.22.2/weights';
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(ALT_MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(ALT_MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(ALT_MODEL_URL),
      ]);
      console.log('Models loaded from alternative CDN');
      modelsLoaded = true;
    } catch (altError) {
      console.error('Failed to load from alternative CDN:', altError);
      throw new Error('Failed to load face recognition models. Please check your internet connection.');
    }
  } finally {
    isLoadingModels = false;
  }
}

/**
 * Load image from source (URL or File)
 */
function loadImage(src: string | File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => resolve(img);
    img.onerror = reject;

    if (typeof src === 'string') {
      img.src = src;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(src);
    }
  });
}

/**
 * Extract face descriptor using face-api.js
 */
async function extractFaceDescriptor(imageSrc: string | File): Promise<Float32Array | null> {
  try {
    await loadModels();
    
    const img = await loadImage(imageSrc);
    
    // Detect face with landmarks and descriptor
    const detection = await faceapi
      .detectSingleFace(img, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      console.warn('No face detected in image');
      return null;
    }

    return detection.descriptor;
  } catch (error) {
    console.error('Error extracting face descriptor:', error);
    return null;
  }
}

/**
 * Compare two images to determine if they contain the same person
 * Uses face-api.js with deep learning models for accurate face recognition
 */
export async function compareFaces(
  image1: string | File,
  image2: string | File
): Promise<FaceComparisonResult> {
  try {
    console.log('Starting face comparison with face-api.js...');
    
    // Extract face descriptors
    const descriptor1 = await extractFaceDescriptor(image1);
    const descriptor2 = await extractFaceDescriptor(image2);

    if (!descriptor1 || !descriptor2) {
      console.warn('Failed to extract descriptors from one or both images');
      return {
        distance: Infinity,
        isMatch: false,
        confidence: 0,
      };
    }

    // Calculate Euclidean distance between descriptors
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
    console.log('Face distance:', distance);

    // Threshold for matching
    // face-api.js typically uses 0.6 as threshold, but we'll be more lenient
    // Lower distance = more similar (0 = identical, higher = different)
    const matchThreshold = 0.6;
    const isMatch = distance <= matchThreshold;

    // Calculate confidence (0-100)
    // Normalize distance to 0-1 range, then convert to percentage
    const normalizedDistance = Math.min(distance / matchThreshold, 1);
    const confidence = Math.max(0, Math.min(100, (1 - normalizedDistance) * 100));

    console.log('Comparison result:', { distance, isMatch, confidence });

    return {
      distance,
      isMatch,
      confidence,
    };
  } catch (error) {
    console.error('Error comparing faces:', error);
    return {
      distance: Infinity,
      isMatch: false,
      confidence: 0,
    };
  }
}
