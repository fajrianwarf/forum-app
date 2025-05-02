import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';

const Categories = (props) => {
  const { categories = [], selected, onSelect } = props;

  const handleSelect = (category) => {
    onSelect(selected === category ? null : category);
  };

  return (
    <>
      <Box px={2} py={1}>
        <Typography textAlign='left'>Categories</Typography>
        <Box display='flex' gap={1} my={1}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selected === category ? 'contained' : 'outlined'}
              size='small'
              onClick={() => handleSelect(category)}
              sx={{
                textTransform: 'none',
              }}
            >
              #{category}
            </Button>
          ))}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export { Categories };
