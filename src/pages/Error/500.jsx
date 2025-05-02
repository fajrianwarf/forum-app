import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import monkeyError from '@assets/monkey-closed-eyes.json';

const ServerError = () => {
  const navigate = useNavigate();

  const toHome = () => navigate('/');

  return (
    <Box
      textAlign='center'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='70vh'
    >
      <Lottie animationData={monkeyError} style={{ height: 250 }} />
      <Typography variant='h4' fontWeight='bold' mt={2}>
        500 - Server Error
      </Typography>
      <Typography color='text.secondary' mt={1}>
        Looks like the monkey broke something.
      </Typography>
      <Button variant='contained' sx={{ mt: 3 }} onClick={toHome}>
        Go Home
      </Button>
    </Box>
  );
};

export { ServerError };
