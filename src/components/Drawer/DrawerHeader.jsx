import React from 'react';
import { Box, useTheme } from '@mui/material';

function DrawerHeader({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      }}
    >
      {children}
    </Box>
  );
}

export { DrawerHeader };
