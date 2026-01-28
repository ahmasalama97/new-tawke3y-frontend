import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Simple Tawke3y home screen inspired by the old Home.js structure

export function HomeView() {
  return (
    <Box sx={{ bgcolor: '#f7fafd', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Tawke3y
          </Typography>
          <Typography sx={{ maxWidth: 640, mx: 'auto', color: 'text.secondary', mb: 4 }}>
            Secure, digital contract management and identity verification platform.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="inherit"
              sx={{ textTransform: 'none', px: 4, bgcolor: '#042f36', '&:hover': { bgcolor: '#06424a' } }}
              href="https://play.google.com/store/apps/details?id=com.tawke3y"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Android app
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ textTransform: 'none', px: 4, borderColor: '#042f36', color: '#042f36' }}
              href="https://apps.apple.com/us/app/tawke3y/id6443518840"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get iOS app
            </Button>
          </Box>
        </Box>

        {/* Features */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            {
              title: 'Secure e-signatures',
              desc: 'Legally binding signatures with advanced face verification.',
            },
            {
              title: 'Contract lifecycle',
              desc: 'Upload, sign, track, and archive all contracts in one place.',
            },
            {
              title: 'For users & companies',
              desc: 'Support for individuals, admins, and company accounts.',
            },
            {
              title: 'Real-time status',
              desc: 'Know exactly who signed, pending approvals, and history.',
            },
          ].map((item) => (
            <Grid key={item.title} xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* About */}
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              About Tawke3y
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              Tawke3y digitizes your contracts and identity verification in a secure and compliant way.
              Manage all your documents, approvals, and signatures from web and mobile.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Designed for both individuals and companies, Tawke3y reduces paperwork, speeds up approvals,
              and provides a full audit trail of every action taken on each contract.
            </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 3,
                bgcolor: '#042f36',
                color: 'common.white',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Key highlights
              </Typography>
              <Typography variant="body2">• End-to-end digital contract flow</Typography>
              <Typography variant="body2">• Face comparison between ID and live selfie</Typography>
              <Typography variant="body2">• Role-based access for users, admins, and companies</Typography>
              <Typography variant="body2">• PDF signing with drag-and-drop signatures</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

