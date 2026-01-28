import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';
import { Register_API } from 'src/APIs/API';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function RegisterView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [registerPayload, setRegisterPayload] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    confirmpassword: '',
    role: 'user',
    emailvalidation: 0,
    signvalidation: 0,
    userstatus: 'Pending',
  });

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{6,}$/;
  const regexPhone = /^\d{11}$/;

  useEffect(() => {
    if (
      registerPayload.name &&
      registerPayload.username &&
      registerPayload.email &&
      registerPayload.password &&
      registerPayload.confirmpassword &&
      registerPayload.password === registerPayload.confirmpassword &&
      regexPassword.test(registerPayload.password) &&
      regexPassword.test(registerPayload.confirmpassword)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    registerPayload.name,
    registerPayload.username,
    registerPayload.email,
    registerPayload.password,
    registerPayload.confirmpassword,
    regexPassword,
  ]);

  const handleRegister = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Register_API(registerPayload);
      const anyResponse: any = response;
      const createdUser =
        anyResponse.data?.data || anyResponse.data?.user || anyResponse.data;
      const generatedUserId =
        createdUser?.id?.toString() || registerPayload.username || registerPayload.email;

      sessionStorage.setItem('register_email', registerPayload.email);
      sessionStorage.setItem('register_user_id', generatedUserId);

      router.push('/verify-otp');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [registerPayload, router]);

  const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterPayload((prev) => ({ ...prev, [field]: e.target.value }));
  };

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
          Tawke3y
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <TextField
          fullWidth
          name="name"
          label="Full Name"
          type="text"
          value={registerPayload.name}
          onChange={handleFieldChange('name')}
          required
          sx={{ mb: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          fullWidth
          name="username"
          label="Username"
          type="text"
          value={registerPayload.username}
          onChange={handleFieldChange('username')}
          required
          sx={{ mb: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={registerPayload.email}
          onChange={handleFieldChange('email')}
          required
          sx={{ mb: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          fullWidth
          name="mobile"
          label="Mobile"
          type="tel"
          value={registerPayload.mobile}
          onChange={handleFieldChange('mobile')}
          error={registerPayload.mobile !== '' && !regexPhone.test(registerPayload.mobile)}
          helperText={
            registerPayload.mobile !== '' && !regexPhone.test(registerPayload.mobile)
              ? 'Invalid mobile number (11 digits required)'
              : ''
          }
          required
          sx={{ mb: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          fullWidth
          name="address"
          label="Address"
          type="text"
          value={registerPayload.address}
          onChange={handleFieldChange('address')}
          sx={{ mb: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={registerPayload.password}
          onChange={handleFieldChange('password')}
          error={registerPayload.password !== '' && !regexPassword.test(registerPayload.password)}
          helperText={
            registerPayload.password !== '' && !regexPassword.test(registerPayload.password) ? (
              <Box component="span" sx={{ display: 'block' }}>
                Password must contain: uppercase, lowercase, number, special character (@#$%), and be 6+ characters
              </Box>
            ) : (
              ''
            )
          }
          required
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="confirmpassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={registerPayload.confirmpassword}
          onChange={handleFieldChange('confirmpassword')}
          error={
            registerPayload.confirmpassword !== '' &&
            registerPayload.password !== registerPayload.confirmpassword
          }
          helperText={
            registerPayload.confirmpassword !== '' &&
            registerPayload.password !== registerPayload.confirmpassword
              ? 'Passwords do not match'
              : registerPayload.confirmpassword !== '' && !regexPassword.test(registerPayload.confirmpassword)
                ? 'Password must contain: uppercase, lowercase, number, special character (@#$%), and be 6+ characters'
                : ''
          }
          required
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <Iconify
                      icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={handleRegister}
          disabled={disabled || isLoading}
          sx={{ mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>

        <Typography variant="body2" sx={{ alignSelf: 'center' }}>
          Already have an account?{' '}
          <Link
            variant="subtitle2"
            sx={{ ml: 0.5 }}
            onClick={() => router.push('/sign-in')}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </>
  );
}
