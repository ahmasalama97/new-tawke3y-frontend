import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';

import { compareFaces } from './utils/face-comparison';

interface Step4ViewProps {
  idCard: File | null;
  profileImage: string | null;
  onComparisonComplete: (isMatch: boolean) => void;
}

export function Step4View({ idCard, profileImage, onComparisonComplete }: Step4ViewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading models...');
  const [comparisonResult, setComparisonResult] = useState<{
    isMatch: boolean;
    distance: number;
    confidence: number;
  } | null>(null);

  useEffect(() => {
    const performComparison = async () => {
      if (!idCard || !profileImage) {
        setIsLoading(false);
        setComparisonResult({
          isMatch: false,
          distance: Infinity,
          confidence: 0,
        });
        onComparisonComplete(false);
        return;
      }

      try {
        setIsLoading(true);
        setLoadingMessage('Loading face recognition models...');
        console.log('Comparing faces - ID Card:', idCard.name || 'data URL', 'Profile Image:', profileImage.substring(0, 50) + '...');
        
        setLoadingMessage('Detecting faces in images...');
        const result = await compareFaces(idCard, profileImage);
        console.log('Comparison result:', result);
        
        setComparisonResult(result);
        onComparisonComplete(result.isMatch);
      } catch (error) {
        console.error('Face comparison error:', error);
        setComparisonResult({
          isMatch: false,
          distance: Infinity,
          confidence: 0,
        });
        onComparisonComplete(false);
      } finally {
        setIsLoading(false);
        setLoadingMessage('Comparing images...');
      }
    };

    performComparison();
  }, [idCard, profileImage, onComparisonComplete]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '45vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          {loadingMessage}
        </Typography>
      </Box>
    );
  }

  if (comparisonResult?.isMatch) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '45vh',
          gap: 2,
        }}
      >
        <VerifiedIcon sx={{ fontSize: 150, color: 'success.main' }} />
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          Profile Completed Successfully!
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Face match confidence: {comparisonResult.confidence.toFixed(1)}%
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '45vh',
        gap: 2,
      }}
    >
      <ErrorIcon sx={{ fontSize: 150, color: 'error.main' }} />
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'text.primary',
        }}
      >
        Images Do Not Match
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        The ID card image and profile image do not appear to be the same person.
        <br />
        Please try again with clearer images.
      </Typography>
      {comparisonResult && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
          Distance: {comparisonResult.distance.toFixed(3)} | Confidence:{' '}
          {comparisonResult.confidence.toFixed(1)}%
        </Typography>
      )}
    </Box>
  );
}
