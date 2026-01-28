import { Typography } from '@mui/material'
import React from 'react'

const LogoBtn = () => (
  <Typography
    variant="h6"
    noWrap
    component="a"
    href="/"
    sx={{
      textDecoration: 'none',
      fontSize: 'larger',
      color: '#fff',
      fontWeight: 'bolder',
      marginRight: { xs: 'auto', md: '10px' },
    }}>
    UNITED OFOQ
  </Typography>
)

export default LogoBtn
