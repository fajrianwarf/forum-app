import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { path } from '@utils/constants';

function ButtonCreateThread() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Button
          onClick={() => navigate(path.createThread)}
          variant='contained'
          color='primary'
          sx={{
            height: 48,
            borderRadius: 24,
            paddingLeft: 1.5,
            paddingRight: hovered ? 2 : 1.5,
            minWidth: hovered ? 160 : 48,
            transition: 'all 300ms ease-in-out',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: hovered ? 'start' : 'center',
            boxShadow: 4,
          }}
        >
          <AddIcon fontSize='small' />
          {hovered && (
            <Typography
              variant='body2'
              ml={1}
              sx={{
                animation: 'fadeIn 0.5s ease',
              }}
            >
              Create Thread
            </Typography>
          )}
        </Button>
      </Box>
    </>
  );
};

export { ButtonCreateThread };
