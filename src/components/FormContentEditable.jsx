import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

function FormContentEditable(props) {
  const { label, name, onChange, error, ...rest } = props;
  const [focused, setFocused] = useState(false);

  const handleInput = (e) => {
    const html = e.currentTarget.innerHTML;

    const cleaned = html
      .replace(/<br\s*\/?>/gi, '')
      .replace(/&nbsp;/g, '')
      .trim();

    const safeValue = cleaned === '' ? '' : html;
    onChange({ target: { name, value: safeValue } });
  };

  return (
    <Box mt={2} {...rest}>
      {label && <Typography variant='subtitle2'>{label}</Typography>}
      <Box
        role="textbox"
        contentEditable
        suppressContentEditableWarning
        name={name}
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          border: '1px solid #ccc',
          borderRadius: 1,
          padding: 1.5,
          minHeight: 100,
          outline: 'none',
          borderColor: error ? 'error.main' : focused ? 'primary.main' : '#ccc',
          transition:
            'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          boxShadow: focused
            ? (theme) => `0 0 0 .5px ${theme.palette.primary.light}`
            : 'none',
        }}
      />

      {error && (
        <Typography color='error' variant='caption'>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export { FormContentEditable };
