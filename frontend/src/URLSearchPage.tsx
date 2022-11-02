import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function URLSearchPage() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <TextField
        placeholder="Enter ID or URL"
      />
    </Box>
  );
}
