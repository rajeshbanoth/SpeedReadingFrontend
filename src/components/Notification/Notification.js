// Notification/Notification.js
import React from 'react';
import { Snackbar } from '@mui/material';

const Notification = ({ message, open, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
    />
  );
}

export default Notification;
