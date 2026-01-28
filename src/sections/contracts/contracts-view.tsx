import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Alert, Button, Container, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { GetContracts_API, GetPersonalContracts_API, ShareContract_API, DeleteContract_API } from 'src/APIs/API';

import { ContractCard } from './components/contract-card';

const lang = {
  contracts: 'Contracts',
  noContracts: 'No contracts available',
  contractname: 'Contract Name',
  uploaded: 'Uploaded',
  signed: 'Signed',
  signcontract: 'Sign Contract',
  sharecontract: 'Share Contract',
  viewcontract: 'View Contract',
  deletecontract: 'Delete Contract',
  notsigned: 'Not Signed',
  clear: 'Clear',
  signature: 'Signature',
  errorcontracts: 'Error loading contracts',
};

type ContractItem = {
  id: number;
  contractname: string;
  uploadedAt: string;
  signed: number;
  signedAt?: string | null;
  contractfile: string;
  usersignaturedfile?: string | null;
};

export function ContractsView() {
  const navigate = useNavigate();

  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareUsername, setShareUsername] = useState('');
  const [shareSubmitting, setShareSubmitting] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [shareContractMeta, setShareContractMeta] = useState<{
    id: number;
    contractname: string;
    contractfile: string;
  } | null>(null);

  const username = localStorage.getItem('username') || '';
  const role = (localStorage.getItem('role') || 'user').toLowerCase();
  const canGenerate = role === 'admin' || role === 'company';

  useEffect(() => {
    const fetchContracts = async () => {
      if (!username) {
        navigate('/sign-in');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res =
          role === 'company'
            ? await GetPersonalContracts_API({
                page: 1,
                search: '',
              })
            : await GetContracts_API({
                username,
                page: 1,
                search: '',
                signed: 0,
              });
        const anyRes: any = res;
        const payload = anyRes.data;

        // Support multiple backend shapes:
        // - { contracts: { data: [...] } }
        // - { contracts: [...] }
        // - { data: { contracts: { data: [...] } } }
        // - { data: [...] }
        let rawList: any =
          payload?.contracts?.data ??
          payload?.contracts ??
          payload?.data?.contracts?.data ??
          payload?.data?.contracts ??
          payload?.data ??
          payload;

        if (!Array.isArray(rawList) && Array.isArray(rawList?.data)) {
          rawList = rawList.data;
        }

        const list: any[] = Array.isArray(rawList) ? rawList : [];

        const mapped: ContractItem[] = list.map((item) => {
          // Normalize signed flag to 0/1
          const rawSigned = item.signed;
          const normalizedSigned =
            rawSigned === 1 ||
            rawSigned === '1' ||
            rawSigned === true
              ? 1
              : 0;

          return {
            id: item.id,
            contractname: item.contractname,
            uploadedAt: item.created_at || item.uploadedAt || new Date().toISOString(),
            signed: normalizedSigned,
            signedAt: item.signedAt ?? item.signed_at ?? null,
            contractfile: item.contractfile || item.file || '',
            usersignaturedfile: item.usersignaturedfile || item.signaturedfile || null,
          };
        });

        setContracts(mapped);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading contracts', err);
        setError(lang.errorcontracts);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [navigate, username]);

  const handleSignClick = (contract: ContractItem) => {
    navigate(`/sign-contract/${contract.id}`, {
      state: {
        contractId: contract.id,
        fileUrl: contract.contractfile,
        contractName: contract.contractname,
      },
    });
  };

  const handleShare = (contract: ContractItem) => {
    setShareContractMeta({
      id: contract.id,
      contractname: contract.contractname,
      contractfile: contract.contractfile,
    });
    setShareUsername('');
    setShareError(null);
    setOpenShareModal(true);
  };

  const handleConfirmShare = async () => {
    if (!shareContractMeta || !shareUsername) {
      setShareError('Please enter a username.');
      return;
    }

    setShareSubmitting(true);
    setShareError(null);

    try {
      const payload: any = {
        contractid: shareContractMeta.id,
        username: shareUsername,
        contractname: shareContractMeta.contractname,
        contractfile: shareContractMeta.contractfile,
      };

      await ShareContract_API(payload);
      setOpenShareModal(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Share contract error', err);
      setShareError('Failed to share contract. Please try again.');
    } finally {
      setShareSubmitting(false);
    }
  };

  const handleDelete = async (contractId: number) => {
    try {
      await DeleteContract_API({ contractid: contractId });
      setContracts((prev) => prev.filter((c) => c.id !== contractId));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Delete contract error', err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{lang.contracts}</Typography>
        {canGenerate && (
          <Button
            variant="contained"
            sx={{ backgroundColor: '#042f36' }}
            startIcon={<Iconify icon="solar:pen-bold" width={18} />}
            onClick={() => navigate('/generate-contract')}
          >
            Generate Contract
          </Button>
        )}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && contracts.length === 0 && (
        <Alert severity="info">{lang.noContracts}</Alert>
      )}

      {!loading && !error && contracts.length > 0 && (
        <Box>
          {contracts.map((contract) => (
            <ContractCard
              key={contract.id}
              contractName={contract.contractname}
              date={contract.uploadedAt}
              signed={contract.signed}
              signedAt={contract.signedAt || undefined}
              originalFile={contract.contractfile}
              signaturedFile={contract.usersignaturedfile || undefined}
              lang={lang}
              language="en"
              setOpenModal={() => handleSignClick(contract)}
              onShare={() => handleShare(contract)}
              onDelete={() => handleDelete(contract.id)}
            />
          ))}
        </Box>
      )}

      {/* Share Contract Modal */}
      <Dialog open={openShareModal} onClose={() => setOpenShareModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{lang.sharecontract}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter the username of the user you want to send this contract to.
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {shareContractMeta?.contractname}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Username
            </Typography>
            <input
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.23)',
              }}
              value={shareUsername}
              onChange={(e) => {
                setShareUsername(e.target.value);
                setShareError(null);
              }}
              placeholder="Enter username"
            />
            {shareError && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {shareError}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareModal(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmShare}
            variant="contained"
            disabled={!shareUsername || shareSubmitting}
            sx={{ backgroundColor: '#042f36' }}
          >
            {shareSubmitting ? <CircularProgress size={20} /> : lang.sharecontract}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
