import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';
import { VerifyEmail_API, ResendCode_API } from 'src/APIs/API';

// ----------------------------------------------------------------------

export function VerifyOtpView() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('register_email') || '';
    const storedUserId = sessionStorage.getItem('register_user_id') || '';

    setEmail(storedEmail);
    setUserId(storedUserId || storedEmail); // fallback to email as id if backend id not available

    if (!storedEmail) {
      // If no email in storage, send user back to register
      router.push('/register');
    }
  }, [router]);

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 4);
    setCode(value);
    setError(null);
  };

  const handleVerify = useCallback(async () => {
    if (code.length !== 4) {
      setError('Please enter the 4-digit code.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = { email, code };
      const response = await VerifyEmail_API(payload);
      const anyResponse: any = response;
      const status = anyResponse.data?.status;

      if (status) {
        sessionStorage.removeItem('register_email');
        sessionStorage.removeItem('register_user_id');

        const targetId = encodeURIComponent(userId || email);
        router.push(`/complete-profile/${targetId}`);
      } else {
        setError(anyResponse.data?.reason || 'Invalid code. Please try again.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('OTP verify error:', err);
      setError('Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [code, email, userId, router]);

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 500, color: 'text.primary' }}>
          Verify your email
        </Typography>
        {email && (
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            We sent a 4-digit code to <strong>{email}</strong>. Enter it below to continue.
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          label="4-digit code"
          value={code}
          onChange={handleChangeCode}
          inputProps={{
            maxLength: 4,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          sx={{ mb: 3, maxWidth: 280 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          error={!!error}
          helperText={error || 'Enter the code from your email'}
        />

        <Button
          fullWidth
          size="large"
          type="button"
          color="inherit"
          variant="contained"
          onClick={handleVerify}
          disabled={isLoading || code.length !== 4}
          sx={{ mb: 2, maxWidth: 280 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Verify & Continue'}
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 1, color: 'text.secondary', cursor: 'pointer' }}
          onClick={async () => {
            if (!email) return;
            try {
              setIsLoading(true);
              setError(null);
              await ResendCode_API({ email });
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error('Resend OTP error:', err);
              setError('Failed to resend code. Please try again.');
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Didn&apos;t receive the code? Resend
        </Typography>
      </Box>
    </>
  );
}

