import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { path } from '@utils/constants';

function PostHeader() {
  const navigate = useNavigate();
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={3}
    >
      <Box display='flex' justifyContent='center' alignItems='center'>
        <IconButton onClick={() => navigate(path.home)}>
          <ArrowBackIcon />
        </IconButton>
        &nbsp;<Typography variant='body1'>Post</Typography>
      </Box>
    </Box>
  );
}

export { PostHeader };
