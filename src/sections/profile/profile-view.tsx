import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { Me_API, GetContracts_API } from 'src/APIs/API';

type UserInfo = {
  name?: string;
  email?: string;
  mobile?: string;
  address?: string;
  role?: string;
};

export function ProfileView() {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState<UserInfo>({});
  const [contractsCount, setContractsCount] = useState(0);
  const [signedCount, setSignedCount] = useState(0);

  const username = localStorage.getItem('username') || '';

  useEffect(() => {
    const load = async () => {
      try {
        const meRes = await Me_API();
        const anyMe: any = meRes;
        const u = anyMe.data?.data || anyMe.data?.user || anyMe.data;
        if (u) {
          setUser({
            name: u.name,
            email: u.email,
            mobile: u.mobile,
            address: u.address,
            role: u.role,
          });
        }
      } catch {
        // ignore
      }

      if (username) {
        try {
          const res = await GetContracts_API({
            username,
            page: 1,
            search: '',
            signed: 0,
          });
          const anyRes: any = res;
          const list: any[] = anyRes.data?.data || anyRes.data?.contracts || [];
          setContractsCount(list.length);
          setSignedCount(list.filter((c) => c.signed === 1).length);
        } catch {
          // ignore
        }
      }
    };

    load();
  }, [username]);

  const displayName = user.name || username || 'User';
  const initials = displayName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <DashboardContent maxWidth="lg" sx={{ py: 0 }}>
      {/* Cover + header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'common.white',
          borderRadius: 3,
          mb: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: 180,
            backgroundImage: 'url(/assets/background/overlay.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            pb: 3,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2,
            mt: -8,
          }}
        >
          <Avatar
            sx={{
              width: 96,
              height: 96,
              border: '4px solid #fff',
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {displayName}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {user.role || 'Tawke3y user'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ px: { xs: 1, md: 4 }, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            sx={{
              minHeight: 48,
              '& .MuiTab-root': {
                minHeight: 48,
                color: 'rgba(255,255,255,0.8)',
              },
              '& .Mui-selected': {
                color: '#fff',
              },
            }}
          >
            <Tab label="Profile" />
            <Tab label="Contracts" />
            <Tab label="Security" />
          </Tabs>
        </Box>
      </Box>

      <Container maxWidth="lg" disableGutters>
        <Grid container spacing={3}>
          {/* Left column: stats + about */}
          <Grid xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Overview
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total contracts
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {contractsCount}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Signed contracts
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {signedCount}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  About
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Email
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {user.email || '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Mobile
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {user.mobile || '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Address
                </Typography>
                <Typography variant="body2">{user.address || '-'}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: tab content */}
          <Grid xs={12} md={8}>
            <Card>
              <CardContent>
                {tab === 0 && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                      Profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage your Tawke3y account details, contact information, and visibility.
                    </Typography>
                  </Box>
                )}
                {tab === 1 && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                      Contracts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      You have {contractsCount} contracts in Tawke3y, with {signedCount} already signed.
                      Use the Contracts section from the sidebar to view and sign documents.
                    </Typography>
                  </Box>
                )}
                {tab === 2 && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                      Security
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email OTP verification and face comparison are enabled in Tawke3y to protect your
                      identity and signed contracts. Keep your email and password secure.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardContent>
  );
}

