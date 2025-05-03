import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';

function LogoutConfirmation(props) {
  const { open, onClose, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            p: 0.5,
          },
        },
      }}
    >
      <DialogTitle sx={{ p: 1 }}>Confirm Logout</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} size='small' variant='outlined'>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          size='small'
          color='error'
          variant='contained'
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { LogoutConfirmation };
