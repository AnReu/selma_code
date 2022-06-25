import React from 'react';
import Grid from '@mui/material/Grid';

export default function HomePage() {
  // https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        height: '100%', bgcolor: 'green',
      }}
    >
      <Grid item xs={12} sx={{ bgcolor: 'pink', flex: '0 1 auto' }}>
        <h4>Navbar</h4>
      </Grid>
      <Grid item xs={12} sx={{ bgcolor: 'blue', flex: '1 1 auto' }}>
        <h1>Content</h1>
      </Grid>
    </Grid>
  );
}
