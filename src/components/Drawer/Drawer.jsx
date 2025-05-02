import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';

function Drawer(props) {
  const { open, drawerWidth, children, ...rest } = props;
  const theme = useTheme();

  const openedStyles = {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  };

  const closedStyles = {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  };

  return (
    <MuiDrawer
      variant='permanent'
      open={open}
      sx={{
        width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        '& .MuiDrawer-paper': open ? openedStyles : closedStyles,
      }}
      {...rest}
    >
      {children}
    </MuiDrawer>
  );
}

export { Drawer };
