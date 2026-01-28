import { useState } from 'react';

import {
    Box,
    Alert,
    Container,
    TextField,
    Typography,
    InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { ContractCard } from './components/contract-card';

// Mock language context
const mockLang = {
    signatured: 'Signed Contracts',
    search: 'Search',
    noContracts: 'No signed contracts available',
    contractname: 'Contract Name',
    uploaded: 'Uploaded',
    signed: 'Signed',
    signedby: 'Signed By',
    viewcontract: 'View Contract',
    deletecontract: 'Delete Contract',
    sharecontract: 'Share Contract',
};

// Mock signed contract data
const mockSignedContracts = [
    {
        id: 2,
        contractname: 'Service Agreement',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
        signed: 1,
        signedAt: new Date(Date.now() - 3600000).toISOString(),
        contractfile: '/sample.pdf',
        usersignaturedfile: '/sample-signed.pdf',
        signedBy: 'John Doe',
    },
    {
        id: 3,
        contractname: 'NDA Agreement',
        uploadedAt: new Date(Date.now() - 172800000).toISOString(),
        signed: 1,
        signedAt: new Date(Date.now() - 86400000).toISOString(),
        contractfile: '/sample2.pdf',
        usersignaturedfile: '/sample2-signed.pdf',
        signedBy: 'John Doe',
    },
];

export function SignaturedContractsView() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContracts = mockSignedContracts.filter((contract) =>
        contract.contractname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleShare = (contractId: number) => {
        console.log('Share contract:', contractId);
    };

    const handleDelete = (contractId: number) => {
        console.log('Delete contract:', contractId);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {mockLang.signatured}
            </Typography>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder={`${mockLang.search} ${mockLang.contractname}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" width={20} />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    size="small"
                />
            </Box>

            {filteredContracts.length === 0 ? (
                <Alert severity="info">{mockLang.noContracts}</Alert>
            ) : (
                <Box>
                    {filteredContracts.map((contract) => (
                        <ContractCard
                            key={contract.id}
                            contractName={contract.contractname}
                            date={contract.uploadedAt}
                            signed={contract.signed}
                            signedAt={contract.signedAt || undefined}
                            originalFile={contract.contractfile}
                            signaturedFile={contract.usersignaturedfile}
                            lang={mockLang}
                            language="en"
                            onShare={() => handleShare(contract.id)}
                            onDelete={() => handleDelete(contract.id)}
                        />
                    ))}
                </Box>
            )}
        </Container>
    );
}
