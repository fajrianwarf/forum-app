import React from 'react';
import { BlinkBlur } from 'react-loading-indicators';
import { Box, useTheme } from '@mui/material';

function PageLoader() {
  const theme = useTheme();
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='70vh'
      width='100%'
    >
      <BlinkBlur
        color={theme.palette.primary.main}
        size='small'
        textColor={theme.palette.primary.main}
      />
    </Box>
  );
};

export { PageLoader };
