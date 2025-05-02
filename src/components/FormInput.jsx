import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function FormInput(props) {
  const {
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    helperText,
    showToggle = false,
    size = 'small',
    margin = 'dense',
    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <TextField
      fullWidth
      size={size}
      margin={margin}
      name={name}
      label={label}
      type={
        showToggle && isPassword ? (showPassword ? 'text' : 'password') : type
      }
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      slotProps={{
        input: {
          endAdornment:
            showToggle && isPassword ? (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge='end'
                  size='small'
                >
                  {showPassword ? (
                    <VisibilityOff fontSize='small' />
                  ) : (
                    <Visibility fontSize='small' />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null,
        },
      }}
      {...rest}
    />
  );
}

export { FormInput };
