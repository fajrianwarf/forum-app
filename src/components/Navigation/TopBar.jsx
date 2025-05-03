import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function TopBar(props) {
  const { onClick, open, drawerWidth } = props;
  const theme = useTheme();

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          onClick={onClick}
          edge='start'
          sx={[
            {
              marginRight: 5,
            },
            open && { display: 'none' },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Threads App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export { TopBar };
