import React from 'react';
import { render, screen } from '@testing-library/react';
import { LeaderboardItem } from './LeaderboardItem';
import '@testing-library/jest-dom';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=john&background=random',
};

/**
 * scenario testing
 *
 * - LeaderboardItem component
 *   - renders name, email, and score correctly
 *   - does not render Divider if isLast is true
 *   - renders Divider if isLast is false
 */

describe('LeaderboardItem', () => {
  it('renders name, email, and score correctly', () => {
    render(
      <LeaderboardItem user={mockUser} score={99} index={0} isLast={false} />,
    );

    expect(screen.getByText('1. John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('99 pts')).toBeInTheDocument();

    const avatar = screen.getByRole('img', { name: mockUser.name });
    expect(avatar).toHaveAttribute('src', mockUser.avatar);
  });

  it('does not render Divider if isLast is true', () => {
    const { container } = render(
      <LeaderboardItem user={mockUser} score={40} index={1} isLast={true} />,
    );

    const divider = container.querySelector('hr');
    expect(divider).not.toBeInTheDocument();
  });

  it('renders Divider if isLast is false', () => {
    const { container } = render(
      <LeaderboardItem user={mockUser} score={50} index={2} isLast={false} />,
    );

    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();
  });
});
