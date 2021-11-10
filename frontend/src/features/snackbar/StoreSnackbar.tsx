import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectSnackbar, toggleSnackbar } from './snackbarSlice';

export default function StoreSnackbar() {
  const { time, text, open } = useAppSelector(selectSnackbar);
  const dispatch = useAppDispatch();

  const action = (
    <>
      <Button color="secondary" size="small" onClick={() => dispatch(toggleSnackbar(false))}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => dispatch(toggleSnackbar(false))}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      autoHideDuration={time}
      onClose={() => dispatch(toggleSnackbar(false))}
      message={text}
      open={open}
      action={action}
    />
  );
}
