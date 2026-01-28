import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface Step1ViewProps {
  email: string;
  idNumber: string;
  motherName: string;
  birthDate: Dayjs | null;
  onIdNumberChange: (value: string) => void;
  onMotherNameChange: (value: string) => void;
  onBirthDateChange: (value: Dayjs | null) => void;
}

export function Step1View({
  email,
  idNumber,
  motherName,
  birthDate,
  onIdNumberChange,
  onMotherNameChange,
  onBirthDateChange,
}: Step1ViewProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        px: { xs: 2, md: 4, lg: 6 },
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        name="idnumber"
        label="ID Number"
        type="number"
        value={idNumber}
        onChange={(e) => onIdNumberChange(e.target.value)}
        error={idNumber !== '' && idNumber.length !== 14}
        helperText={
          idNumber !== '' && idNumber.length !== 14 ? 'ID number must be exactly 14 digits' : ''
        }
        required
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="email"
        label="Email"
        type="email"
        value={email}
        disabled
        required
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="mothername"
        label="Mother Name"
        type="text"
        value={motherName}
        onChange={(e) => onMotherNameChange(e.target.value)}
        required
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Birth Date"
          value={birthDate}
          onChange={onBirthDateChange}
          disableFuture
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              slotProps: {
                inputLabel: { shrink: true },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
