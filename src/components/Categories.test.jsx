import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Categories } from './Categories';
import { jest } from '@jest/globals';

/**
 * scenario testing
 *
 * - Categories component
 *   - renders category buttons correctly
 *   - highlights the selected category correctly
 *   - calls onSelect with category name when clicked and highlighted it
 *   - deselects category when clicking on selected one again and remove highlight
 */

describe('Categories', () => {
  const mockCategories = ['react', 'redux', 'dicoding'];

  it('renders category buttons correctly', () => {
    render(
      <Categories
        categories={mockCategories}
        selected={null}
        onSelect={() => {}}
      />,
    );

    mockCategories.forEach((category) => {
      expect(screen.getByText(`#${category}`)).toBeInTheDocument();
    });
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('highlights the selected category correctly', () => {
    render(
      <Categories
        categories={mockCategories}
        selected='redux'
        onSelect={() => {}}
      />,
    );

    const selectedBtn = screen.getByText('#redux');
    expect(selectedBtn).toHaveClass('MuiButton-contained');
  });

  it('calls onSelect with category name when clicked and highlighted it', () => {
    const handleSelect = jest.fn();

    const { rerender } = render(
      <Categories
        categories={mockCategories}
        selected={null}
        onSelect={handleSelect}
      />,
    );

    fireEvent.click(screen.getByText('#dicoding'));
    expect(handleSelect).toHaveBeenCalledWith('dicoding');

    rerender(
      <Categories
        categories={mockCategories}
        selected='dicoding'
        onSelect={handleSelect}
      />,
    );

    const selectedBtn = screen.getByText('#dicoding');
    expect(selectedBtn).toHaveClass('MuiButton-contained');
  });

  it('deselects category when clicking on selected one again and remove highlight', () => {
    const handleSelect = jest.fn();
    const { rerender } = render(
      <Categories
        categories={mockCategories}
        selected='react'
        onSelect={handleSelect}
      />,
    );

    fireEvent.click(screen.getByText('#react'));
    expect(handleSelect).toHaveBeenCalledWith(null);

    rerender(
      <Categories
        categories={mockCategories}
        selected={null}
        onSelect={handleSelect}
      />,
    );

    const selectedBtn = screen.getByText('#react');
    expect(selectedBtn).toHaveClass('MuiButton-outlined');
  });
});
