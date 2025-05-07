import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LogoutConfirmation } from './LogoutConfirmation';
import { jest } from '@jest/globals';

describe('LogoutConfirmation', () => {
  const setupElement = (props = {}) => {
    const defaultProps = {
      open: true,
      onClose: jest.fn(),
      onConfirm: jest.fn(),
    };
    const element = render(<LogoutConfirmation {...defaultProps} {...props} />);
    return {
      ...element,
      ...defaultProps,
    };
  };

  it('renders dialog with correct text', () => {
    setupElement();

    expect(screen.getByText('Confirm Logout')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to logout?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const { onClose } = setupElement();

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when Logout button is clicked', () => {
    const { onConfirm } = setupElement();

    fireEvent.click(screen.getByText('Logout'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('does not render anything when open is false', () => {
    render(
      <LogoutConfirmation
        open={false}
        onClose={() => {}}
        onConfirm={() => {}}
      />,
    );
    expect(screen.queryByText('Confirm Logout')).not.toBeInTheDocument();
  });
});
