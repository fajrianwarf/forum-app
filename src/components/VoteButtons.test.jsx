import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { jest } from '@jest/globals';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { optimisticVote, threadsReducer } from '@slices/Threads.slice.js';

jest.unstable_mockModule('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Must be dynamic import AFTER mock
const { VoteActions } = await import('./VoteButtons.jsx');
const { toast } = await import('react-toastify');

const initFormStore = { profile: { id: 'user-01' } };

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    auth: () => ({ ...initFormStore }),
  },
});

const renderWithStore = (ui, customStore = store) => {
  return render(<Provider store={customStore}>{ui}</Provider>);
};

const mockStore = (authState = { ...initFormStore }) => {
  return configureStore({
    reducer: {
      threads: threadsReducer,
      auth: () => authState,
    },
  });
};

/**
 * scenario testing
 *
 * - VoteActions component
 *   - renders vote buttons correcly
 *   - displays toast error after clicked button when not logged in
 *   - dispatches vote actions when clicked
 *   - shows filled upvote icon if already upvoted
 */

describe('VoteActions', () => {
  beforeEach(() => {
    toast.error.mockClear();
  });

  it('renders vote buttons correcly', () => {
    renderWithStore(
      <VoteActions
        threadId='thread-01'
        upVotesBy={['user-02']}
        downVotesBy={['user-03']}
      />,
    );

    expect(screen.getAllByText('1')).toHaveLength(2);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('displays toast error after clicked button when not logged in', async () => {
    const storeNotLoggedIn = mockStore({ profile: null });

    renderWithStore(
      <VoteActions threadId='thread-01' upVotesBy={[]} downVotesBy={[]} />,
      storeNotLoggedIn,
    );

    await act(async () => {
      fireEvent.click(screen.getAllByRole('button')[0]);
    });

    expect(toast.error).toHaveBeenCalledWith('Require login to vote!');
  });

  it('dispatches vote actions when clicked', async () => {
    const mockDispatch = jest.fn();

    const storeWithMock = mockStore();
    storeWithMock.dispatch = mockDispatch;

    renderWithStore(
      <VoteActions threadId='thread-01' upVotesBy={[]} downVotesBy={[]} />,
      storeWithMock,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    await act(async () => {
      fireEvent.click(buttons[0]); // upvote
      fireEvent.click(buttons[1]); // downvote
    });

    const dispatched = mockDispatch.mock.calls.map((call) => call[0]);

    const plainActions = dispatched.filter(
      (a) => typeof a === 'object' && a.type,
    );
    const thunks = dispatched.filter((a) => typeof a === 'function');

    expect(plainActions.map((a) => a.type)).toEqual(
      expect.arrayContaining([optimisticVote.type]),
    );

    expect(thunks).toHaveLength(2); // upVoteThreadAct & downVoteThreadAct
    expect(thunks.every((t) => typeof t === 'function')).toBe(true); // thunks are anonimous
  });

  it('shows filled upvote icon if already upvoted', () => {
    renderWithStore(
      <VoteActions
        threadId='thread-01'
        upVotesBy={['user-01']} // already voted
        downVotesBy={[]}
      />,
    );

    expect(screen.getByTestId('ThumbUpAltIcon')).toBeInTheDocument();
  });
});
