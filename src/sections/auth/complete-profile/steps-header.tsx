import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';

interface StepsHeaderProps {
  currentStep: number;
}

export function StepsHeader({ currentStep }: StepsHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 425);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stepSize = isMobile ? '50px' : 70;
  const stepWidth = isMobile ? '15%' : 70;

  const getStepStyle = (step: number) => {
    const isActive = currentStep === step;
    const isCompleted = currentStep > step;

    return {
      width: stepWidth,
      height: stepSize,
      border: isActive ? '1px solid #000' : isCompleted ? '0px solid #fff' : '1px solid #E0E0E0',
      borderColor: isActive || isCompleted ? '#000' : '#E0E0E0',
      backgroundColor: isCompleted ? '#018601' : isActive ? '#ffffff' : '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    };
  };

  const getLineStyle = (step: number) => {
    const isCompleted = currentStep > step;
    return {
      border: `1.5px solid ${isCompleted ? '#018601' : '#E0E0E0'}`,
      width: '10%',
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 6,
        mb: 6,
      }}
    >
      {/* Step 1 */}
      <Box sx={getStepStyle(1)}>
        {currentStep === 1 ? (
          <Typography sx={{ color: '#000', fontWeight: 'bold', fontSize: 30 }}>A</Typography>
        ) : currentStep > 1 ? (
          <CheckIcon sx={{ fontSize: 35, color: '#fff' }} />
        ) : (
          <Typography sx={{ color: '#E0E0E0', fontWeight: 'bold', fontSize: 30 }}>A</Typography>
        )}
      </Box>
      <Box sx={getLineStyle(1)} />

      {/* Step 2 */}
      <Box sx={getStepStyle(2)}>
        {currentStep === 2 ? (
          <Typography sx={{ color: '#000', fontWeight: 'bold', fontSize: 30 }}>B</Typography>
        ) : currentStep > 2 ? (
          <CheckIcon sx={{ fontSize: 35, color: '#fff' }} />
        ) : (
          <Typography sx={{ color: '#E0E0E0', fontWeight: 'bold', fontSize: 30 }}>B</Typography>
        )}
      </Box>
      <Box sx={getLineStyle(2)} />

      {/* Step 3 */}
      <Box sx={getStepStyle(3)}>
        {currentStep === 3 ? (
          <Typography sx={{ color: '#000', fontWeight: 'bold', fontSize: 30 }}>C</Typography>
        ) : currentStep > 3 ? (
          <CheckIcon sx={{ fontSize: 35, color: '#fff' }} />
        ) : (
          <Typography sx={{ color: '#E0E0E0', fontWeight: 'bold', fontSize: 30 }}>C</Typography>
        )}
      </Box>
      <Box sx={getLineStyle(3)} />

      {/* Step 4 */}
      <Box sx={getStepStyle(4)}>
        {currentStep === 4 ? (
          <Typography sx={{ color: '#000', fontWeight: 'bold', fontSize: 30 }}>D</Typography>
        ) : (
          <Typography sx={{ color: '#E0E0E0', fontWeight: 'bold', fontSize: 30 }}>D</Typography>
        )}
      </Box>
    </Box>
  );
}
