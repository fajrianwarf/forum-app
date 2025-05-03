import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Avatar, Box, List, Divider, IconButton } from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Monkey from '@assets/monkey.png';

import { LogoutConfirmation } from '@components/LogoutConfirmation';
import { DrawerHeader } from '@components/Drawer/DrawerHeader';
import { Drawer } from '@components/Drawer/Drawer';
import { ListMenu } from './ListMenu';
import { TopBar } from './TopBar';
import { useAuth } from '@utils/custom-hooks';
import { logout } from '@slices/Auth.slice';
import { path } from '@utils/constants';

const drawerWidth = 240;

const menuItems = [
  {
    id: 'threads',
    title: 'Threads',
    path: path.home,
    icon: <ForumOutlinedIcon />,
  },
  {
    id: 'leaderboards',
    title: 'Leaderboards',
    path: path.leaderboards,
    icon: <LeaderboardOutlinedIcon />,
  },
];

const unauthenticated = [
  { id: 'login', title: 'Login', path: path.login, icon: <LoginIcon /> },
  {
    id: 'register',
    title: 'Register',
    path: path.register,
    icon: <PersonAddAltOutlinedIcon />,
  },
];

function BaseLayout(props) {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const dispatch = useDispatch();
  const { profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setOpenLogoutConfirm(false);
    navigate(path.home);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenLogoutConfirm = () => {
    setOpenLogoutConfirm(true);
  };

  const handleCloseLogoutConfirm = () => {
    setOpenLogoutConfirm(false);
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TopBar
        onClick={handleDrawerOpen}
        open={open}
        drawerWidth={drawerWidth}
      />
      <Drawer variant='permanent' open={open} drawerWidth={drawerWidth}>
        <DrawerHeader>
          <img src={Monkey} alt='Monkey' style={{ height: 40 }} />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((menuProps) => (
            <ListMenu key={menuProps.id} open={open} {...menuProps} />
          ))}
        </List>
        <Divider />
        <List>
          {isAuthenticated ? (
            <>
              <ListMenu
                title={profile.name}
                icon={<Avatar alt={profile.name} src={profile.avatar} />}
                open={open}
              />
              <ListMenu
                title='Logout'
                icon={<LogoutIcon />}
                onClick={handleOpenLogoutConfirm}
                open={open}
              />
            </>
          ) : (
            unauthenticated.map((unauthenticatedProps) => (
              <ListMenu
                key={unauthenticatedProps.id}
                open={open}
                {...unauthenticatedProps}
              />
            ))
          )}
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          px: 0,
          m: 0,
          width: '100%',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
      <LogoutConfirmation
        open={openLogoutConfirm}
        onClose={handleCloseLogoutConfirm}
        onConfirm={handleLogout}
      />
    </Box>
  );
}

export { BaseLayout };
