import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { FormInput } from './FormInput';

/**
 * scenario testing
 *
 * - FormInput component
 *   - renders label and value correctly
 *   - shows error message if error is passed
 *   - toggles password visibility when icon clicked
 *   - calls onChange when typing
 */

describe('FormInput', () => {
  it('renders label and value correctly', () => {
    render(
      <FormInput
        name='email'
        label='Email'
        value='test@example.com'
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('shows error message if error is passed', () => {
    render(
      <FormInput
        name='email'
        label='Email'
        value=''
        error='Email is required'
        onChange={() => {}}
      />,
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('toggles password visibility when icon clicked', () => {
    render(
      <FormInput
        name='password'
        label='Password'
        type='password'
        value='secret'
        showToggle={true}
        onChange={() => {}}
      />,
    );

    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange when typing', async () => {
    const handleChange = jest.fn();
    render(
      <FormInput
        name='username'
        label='Username'
        value=''
        onChange={handleChange}
      />,
    );

    const input = screen.getByLabelText('Username');
    await userEvent.type(input, 'admin');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
