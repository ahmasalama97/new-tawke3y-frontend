import { Box, Zoom, Stack, Paper, Tooltip, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface ContractCardProps {
    contractName: string;
    date: string;
    signed: string | number;
    signedAt?: string;
    originalFile?: string;
    signaturedFile?: string;
    lang: Record<string, string>;
    language: string;
    setOpenModal?: () => void;
    onShare?: () => void;
    onDelete?: () => void;
    viewContractUrl?: string;
}

export function ContractCard({
    contractName,
    date,
    signed,
    signedAt,
    originalFile,
    signaturedFile,
    lang,
    language,
    setOpenModal,
    onShare,
    onDelete,
    viewContractUrl,
}: ContractCardProps) {
    const fileUrl = signed === 1 || signed === '1' ? signaturedFile : originalFile;
    const formattedDate = date ? new Date(date).toLocaleDateString() : '';

    return (
        <Paper sx={styles.singleCard}>
            <Stack direction="row" spacing={2} sx={{ flex: 1, alignItems: 'center' }}>
                {/* Contract Name */}
                <Box sx={{ flex: 0.5, minWidth: 0 }}>
                    <Typography variant="caption" sx={styles.label}>
                        {lang?.contractname || 'Contract Name'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {contractName}
                    </Typography>
                </Box>

                {/* Uploaded Date */}
                <Box sx={{ flex: 0.5, minWidth: 0 }}>
                    <Typography variant="caption" sx={styles.label}>
                        {lang?.uploaded || 'Uploaded'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formattedDate}
                    </Typography>
                </Box>

                {/* Signed Date */}
                {signed === 1 || signed === '1' ? (
                    <Box sx={{ flex: 0.5, minWidth: 0 }}>
                        <Typography variant="caption" sx={styles.label}>
                            {lang?.signed || 'Signed'}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {signedAt ? new Date(signedAt).toLocaleDateString() : '-'}
                        </Typography>
                    </Box>
                ) : null}

                {/* Actions */}
                <Stack direction="row" spacing={1} sx={{ ml: 'auto', flex: 0.4, justifyContent: 'flex-end' }}>
                    {/* Sign Button */}
                    {(signed === 0 || signed === '0') && setOpenModal && (
                        <Tooltip title={lang?.signcontract || 'Sign Contract'} TransitionComponent={Zoom}>
                            <IconButton
                                onClick={setOpenModal}
                                size="small"
                                sx={{
                                    backgroundColor: '#042f36',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#031f24' },
                                }}
                            >
                                <Iconify icon="solar:pen-bold" width={20} />
                            </IconButton>
                        </Tooltip>
                    )}

                    {/* Share Button */}
                    {onShare && (
                        <Tooltip title={lang?.sharecontract || 'Share Contract'} TransitionComponent={Zoom}>
                            <IconButton
                                onClick={onShare}
                                size="small"
                                sx={{
                                    backgroundColor: '#042f36',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#031f24' },
                                }}
                            >
                                <Iconify icon="solar:share-bold" width={20} />
                            </IconButton>
                        </Tooltip>
                    )}

                    {/* Status Indicator */}
                    <Tooltip
                        title={signed === 0 || signed === '0' ? (lang?.notsigned || 'Not Signed') : lang?.signed || 'Signed'}
                        TransitionComponent={Zoom}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Iconify
                                icon="solar:check-circle-bold"
                                width={24}
                                sx={{ color: signed === 0 || signed === '0' ? '#ccc' : '#018601' }}
                            />
                        </Box>
                    </Tooltip>

                    {/* View Button */}
                    {fileUrl && (
                        <Tooltip title={lang?.viewcontract || 'View Contract'} TransitionComponent={Zoom}>
                            <IconButton
                                component="a"
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{
                                    backgroundColor: '#042f36',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#031f24' },
                                }}
                            >
                                <Iconify icon="solar:chat-round-dots-bold" width={20} />
                            </IconButton>
                        </Tooltip>
                    )}

                    {/* Delete Button */}
                    {onDelete && (
                        <Tooltip title={lang?.deletecontract || 'Delete Contract'} TransitionComponent={Zoom}>
                            <IconButton
                                onClick={onDelete}
                                size="small"
                                sx={{
                                    backgroundColor: '#ff0000',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#cc0000' },
                                }}
                            >
                                <Iconify icon="solar:trash-bin-trash-bold" width={20} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </Stack>
        </Paper>
    );
}

const styles = {
    singleCard: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
        margin: '12px 0',
        borderRadius: '8px',
        boxShadow: 1,
    },
    label: {
        display: 'block',
        opacity: 0.7,
        marginBottom: '4px',
        color: '#666',
        fontWeight: 500,
    },
};
