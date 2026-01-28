import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import dayjs, { Dayjs } from 'dayjs';

import { StepsHeader } from './steps-header';
import { Step1View } from './step1-view';
import { Step2View } from './step2-view';
import { Step3View } from './step3-view';
import { Step4View } from './step4-view';

export function CompleteProfileView() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    idNumber: '',
    email: location.state?.email || '',
    motherName: '',
    birthDate: null as Dayjs | null,
    idCard: null as File | null,
    profileImage: null as string | null,
  });

  const [disabled, setDisabled] = useState({
    step1: true,
    step2: true,
    step3: true,
  });

  // Validate step 1
  useEffect(() => {
    if (
      formData.idNumber &&
      formData.idNumber.length === 14 &&
      formData.motherName &&
      formData.birthDate
    ) {
      setDisabled((prev) => ({ ...prev, step1: false }));
    } else {
      setDisabled((prev) => ({ ...prev, step1: true }));
    }
  }, [formData.idNumber, formData.motherName, formData.birthDate]);

  // Validate step 2
  useEffect(() => {
    setDisabled((prev) => ({ ...prev, step2: !formData.idCard }));
  }, [formData.idCard]);

  // Validate step 3
  useEffect(() => {
    setDisabled((prev) => ({ ...prev, step3: !formData.profileImage }));
  }, [formData.profileImage]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComparisonComplete = async (isMatch: boolean) => {
    if (isMatch) {
      setIsSubmitting(true);
      try {
        // TODO: Replace with actual API call
        // await SubmitProfile_API(params.id, formData);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        navigate('/contracts');
      } catch (error) {
        console.error('Submit profile error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getStepDisabled = () => {
    switch (step) {
      case 1:
        return disabled.step1;
      case 2:
        return disabled.step2;
      case 3:
        return disabled.step3;
      default:
        return false;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4, width: '100%', maxWidth: '100%', mx: 0 }}>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: 'text.primary',
          textAlign: 'center',
          pt: 2,
          mb: 2,
        }}
      >
        Complete Profile
      </Typography>

      <StepsHeader currentStep={step} />

      {step === 1 && (
        <Step1View
          email={formData.email}
          idNumber={formData.idNumber}
          motherName={formData.motherName}
          birthDate={formData.birthDate}
          onIdNumberChange={(value) => setFormData((prev) => ({ ...prev, idNumber: value }))}
          onMotherNameChange={(value) => setFormData((prev) => ({ ...prev, motherName: value }))}
          onBirthDateChange={(value) => setFormData((prev) => ({ ...prev, birthDate: value }))}
        />
      )}

      {step === 2 && (
        <Step2View
          idCard={formData.idCard}
          onIdCardChange={(file) => setFormData((prev) => ({ ...prev, idCard: file }))}
        />
      )}

      {step === 3 && (
        <Step3View
          profileImage={formData.profileImage}
          onProfileImageChange={(image) => setFormData((prev) => ({ ...prev, profileImage: image }))}
        />
      )}

      {step === 4 && (
        <Step4View
          idCard={formData.idCard}
          profileImage={formData.profileImage}
          onComparisonComplete={handleComparisonComplete}
        />
      )}

      {step !== 4 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2, flexWrap: 'wrap' }}>
          {step !== 1 && (
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={isLoading || isSubmitting}
              sx={{
                width: 200,
                textTransform: 'capitalize',
                bgcolor: '#fff',
                color: '#042f36',
                '&:hover': {
                  bgcolor: '#fff',
                  opacity: 0.8,
                },
              }}
            >
              Back
            </Button>
          )}
          {step !== 4 && (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLoading || isSubmitting || getStepDisabled()}
              sx={{
                width: 200,
                textTransform: 'capitalize',
                bgcolor: '#fff',
                color: '#042f36',
                '&:hover': {
                  bgcolor: '#fff',
                  opacity: 0.8,
                },
                '&:disabled': {
                  bgcolor: '#fff',
                  opacity: 0.5,
                  color: '#042f36',
                },
              }}
            >
              Next
            </Button>
          )}
        </Box>
      )}

      {isSubmitting && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
