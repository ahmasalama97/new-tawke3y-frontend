import { useRef, useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface Step3ViewProps {
  profileImage: string | null;
  onProfileImageChange: (image: string | null) => void;
}

export function Step3View({ profileImage, onProfileImageChange }: Step3ViewProps) {
  const [openModal, setOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (openModal) {
      // Wait for dialog to be fully rendered before accessing camera
      setIsLoading(true);
      const timer = setTimeout(() => {
        if (videoRef.current) {
          navigator.mediaDevices
            .getUserMedia({ 
              video: { 
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
              } 
            })
            .then((mediaStream) => {
              streamRef.current = mediaStream;
              const video = videoRef.current;
              if (video) {
                video.srcObject = mediaStream;
                video.play()
                  .then(() => {
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    console.error('Error playing video:', error);
                    setIsLoading(false);
                    alert('Error starting camera. Please try again.');
                  });
              }
            })
            .catch((error) => {
              console.error('Error accessing camera:', error);
              setIsLoading(false);
              let errorMessage = 'Unable to access camera. ';
              if (error.name === 'NotAllowedError') {
                errorMessage += 'Please allow camera permissions and try again.';
              } else if (error.name === 'NotFoundError') {
                errorMessage += 'No camera found. Please connect a camera and try again.';
              } else {
                errorMessage += 'Please check your camera settings and try again.';
              }
              alert(errorMessage);
              setOpenModal(false);
            });
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current?.srcObject) {
          const mediaStream = videoRef.current.srcObject as MediaStream;
          mediaStream.getTracks().forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
      };
    } else {
      // Clean up when modal closes
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current?.srcObject) {
        const mediaStream = videoRef.current.srcObject as MediaStream;
        mediaStream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [openModal]);

  const capture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL('image/jpeg');
        onProfileImageChange(imageData);
        
        // Stop the camera stream
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
          video.srcObject = null;
        }
        
        setOpenModal(false);
      } else {
        alert('Camera is not ready. Please wait a moment and try again.');
      }
    }
  }, [onProfileImageChange]);

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setOpenModal(false);
    setIsLoading(false);
  };

  return (
    <>
      <Box
        onClick={() => setOpenModal(true)}
        sx={{
          cursor: 'pointer',
          width: '100%',
          px: { xs: 2, md: 4, lg: 6 },
        }}
      >
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography
            sx={{
              fontSize: 20,
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            Capture Personal Image
          </Typography>
        </Box>

        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            width: '100%',
            mx: 'auto',
            borderRadius: 2,
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {!profileImage ? (
            <AddPhotoAlternateIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
          ) : (
            <Box
              component="img"
              src={profileImage}
              alt="Profile Image"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Box>

      <Dialog open={openModal} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Capture Personal Image</DialogTitle>
        <DialogContent>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mb: 2, 
              minHeight: '400px',
              backgroundColor: '#000',
              borderRadius: '8px',
              position: 'relative',
            }}
          >
            {isLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  zIndex: 1,
                }}
              >
                <Typography>Loading camera...</Typography>
              </Box>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                maxWidth: '620px',
                height: 'auto',
                borderRadius: '8px',
                display: isLoading ? 'none' : 'block',
              }}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                video.play().catch((error) => {
                  console.error('Error playing video:', error);
                });
              }}
              onPlay={() => {
                setIsLoading(false);
              }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={capture} variant="contained" disabled={isLoading}>
            Capture
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
