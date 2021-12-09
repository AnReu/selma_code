import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import * as React from 'react';

export default function RelevanceFeedback() {
  const handleIsRelevant = () => {
    throw Error('implement me');
  };

  const handleIsNotRelevant = () => {
    throw Error('implement me');
  };

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Typography sx={{ my: 0, mx: 2 }} component="div" gutterBottom>
        Is this result relevant?
      </Typography>

      <div>
        <IconButton onClick={handleIsRelevant} aria-label="mark as relevant">
          <ThumbUp />
        </IconButton>
        <IconButton onClick={handleIsNotRelevant} aria-label="mark as not relevant">
          <ThumbDown />
        </IconButton>
      </div>
    </Grid>
  );
}
