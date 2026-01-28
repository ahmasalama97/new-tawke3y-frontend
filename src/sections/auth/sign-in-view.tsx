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
import { Login_API, Me_API } from 'src/APIs/API';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginPayload, setLoginPayload] = useState({
    email: '',
    password: '',
  });

  const regexMail = /\S+@\S+\.\w{2,}/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{6,}$/;

  useEffect(() => {
    if (
      loginPayload.email &&
      loginPayload.password &&
      regexMail.test(loginPayload.email) &&
      regexPassword.test(loginPayload.password)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loginPayload.email, loginPayload.password, regexMail, regexPassword]);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Login_API(loginPayload);
      const anyResponse: any = response;
      const token = anyResponse.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      // Try to fetch current user and store basic info
      try {
        const meResponse = await Me_API(token);
        const meAny: any = meResponse;
        const user = meAny.data?.data || meAny.data?.user || meAny.data;

        if (user) {
          localStorage.setItem('current_user', JSON.stringify(user));
          if (user.username) {
            localStorage.setItem('username', user.username);
          }
          if (user.role) {
            localStorage.setItem('role', user.role);
          }
        }
      } catch {
        // ignore user fetch failure, keep token only
      }

      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loginPayload, router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPayload((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPayload((prev) => ({ ...prev, password: e.target.value }));
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
          name="email"
          label="Email"
          type="email"
          value={loginPayload.email}
          onChange={handleEmailChange}
          error={loginPayload.email !== '' && !regexMail.test(loginPayload.email)}
          helperText={
            loginPayload.email !== '' && !regexMail.test(loginPayload.email)
              ? 'Incorrect email format'
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
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={loginPayload.password}
          onChange={handlePasswordChange}
          error={loginPayload.password !== '' && !regexPassword.test(loginPayload.password)}
          helperText={
            loginPayload.password !== '' && !regexPassword.test(loginPayload.password) ? (
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
          sx={{ mb: 2 }}
        />

        <Link
          variant="body2"
          color="inherit"
          sx={{ mb: 3, cursor: 'pointer' }}
          onClick={() => router.push('/forget-password')}
        >
          Forget password?
        </Link>

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={handleSignIn}
          disabled={disabled || isLoading}
          sx={{ mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sign in'}
        </Button>

        <Typography variant="body2" sx={{ alignSelf: 'center', cursor: 'pointer' }}>
          Don&apos;t have an account?{' '}
          <Link
            variant="subtitle2"
            sx={{ ml: 0.5 }}
            onClick={() => router.push('/register')}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </>
  );
}
