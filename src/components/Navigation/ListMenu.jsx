import React, { cloneElement, isValidElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';

function ListMenu(props) {
  const { title, path, icon, onClick, open } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = path && location.pathname === path;
  const isAvatar = isValidElement(icon) && icon.type === Avatar;

  const styledIcon = isAvatar
    ? cloneElement(icon, {
        sx: {
          width: 24,
          height: 24,
          ...(icon.props?.sx || {}),
        },
      })
    : icon;

  const handleClick = () => {
    if (onClick) onClick();
    else if (path) navigate(path);
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: open ? 'initial' : 'center',
          transition: 'all 0.3s ease',
        }}
        selected={isActive}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
            mr: open ? 3 : 0,
            transition: 'margin 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            color: isActive ? 'primary.main' : 'inherit',
          }}
        >
          {styledIcon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{
            opacity: open ? 1 : 0,
            transform: open ? 'translateX(0)' : 'translateX(20px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
          slotProps={{
            primary: {
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? 'primary.main' : 'inherit',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export { ListMenu };
