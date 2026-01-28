import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface Step2ViewProps {
  idCard: File | null;
  onIdCardChange: (file: File | null) => void;
}

export function Step2View({ idCard, onIdCardChange }: Step2ViewProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      const file = files[0];
      onIdCardChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <Box
        onClick={handleClick}
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
            Capture ID Card
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
          {!idCard ? (
            <AddPhotoAlternateIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
          ) : (
            <Box
              component="img"
              src={preview || URL.createObjectURL(idCard)}
              alt="ID Card"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
