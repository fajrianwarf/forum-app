import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import monkey404 from '@assets/monkey-swing.json';

const NotFound = () => {
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
      <Lottie animationData={monkey404} style={{ height: 250 }} />
      <Typography variant='h4' fontWeight='bold'>
        404 - Page Not Found
      </Typography>
      <Typography color='text.secondary' mt={1}>
        Oops! The monkey stole this page.
      </Typography>
      <Button variant='contained' sx={{ mt: 2 }} onClick={toHome}>
        Go Home
      </Button>
    </Box>
  );
};

export { NotFound };
