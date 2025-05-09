import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FormInput } from '@components/FormInput';

export default {
  title: 'Components/FormInput',
  component: FormInput,
  argTypes: {
    label: {
      type: { name: 'string', required: true },
      control: 'text',
    },
    name: {
      type: { name: 'string', required: true },
      control: 'text',
    },
    type: {
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['text', 'password', 'email'] },
    },
    showToggle: {
      type: { name: 'boolean' },
      control: 'boolean',
    },
    error: {
      type: { name: 'string' },
      control: 'text',
    },
    helperText: {
      type: { name: 'string' },
      control: 'text',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium'] },
    },
    margin: {
      control: { type: 'select', options: ['dense', 'normal', 'none'] },
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState('');

  return (
    <Box width={300}>
      <FormInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Username',
  name: 'username',
  type: 'text',
  showToggle: false,
  error: '',
  helperText: '',
};

export const PasswordWithToggle = Template.bind({});
PasswordWithToggle.args = {
  label: 'Password',
  name: 'password',
  type: 'password',
  showToggle: true,
  error: '',
  helperText: '',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Email',
  name: 'email',
  type: 'email',
  showToggle: false,
  error: 'Invalid email format',
};
