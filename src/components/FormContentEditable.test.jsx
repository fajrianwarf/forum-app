import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormContentEditable } from './FormContentEditable';
import { jest } from '@jest/globals';

describe('FormContentEditable', () => {
  it('renders with label correctly', () => {
    render(
      <FormContentEditable
        name="content"
        label="Content"
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('fires onChange with input HTML content and passed correctly', () => {
    const handleChange = jest.fn();

    render(
      <FormContentEditable
        name="content"
        label="Content"
        onChange={handleChange}
      />
    );

    const editableBox = screen.getByRole('textbox');
    editableBox.innerHTML = 'Hello world';

    fireEvent.input(editableBox);

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: 'content',
        value: 'Hello world',
      },
    });
  });

  it('cleans up <br> before sending to onChange', () => {
    const handleChange = jest.fn();

    render(
      <FormContentEditable
        name="summary"
        label="Summary"
        onChange={handleChange}
      />
    );

    const editableBox = screen.getByRole('textbox');
    fireEvent.input(editableBox, {
      currentTarget: {
        innerHTML: '<br>',
      },
    });

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: 'summary',
        value: '',
      },
    });
  });

  it('shows error text when error prop is passed', () => {
    render(
      <FormContentEditable
        name="content"
        label="Content"
        error="This field is required"
        onChange={() => {}}
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});
