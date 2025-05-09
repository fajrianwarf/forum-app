import { status } from '@utils/constants';
import { clone } from '@utils/index';

import {
  downVoteThreadAct,
  getThreadListAct,
  initialState,
  optimisticVote,
  resetData,
  threadsReducer,
  upVoteThreadAct,
} from './Threads.slice';

import {
  mockThreadDetailResponse,
  mockThreadListResponse,
} from './__mocks__/threads/threadResponse';
import {
  cloneCommentsWithOverrides,
  cloneThreadDetailWithOverrides,
  cloneThreadListWithOverrides,
} from './__mocks__/threads/mockUtils';
import {
  COMMENT_ID,
  newThreadListObject,
  THREAD_ID,
  USER_ID,
} from './__mocks__/threads/constants';

// reducer
describe('threadsReducer - reducer', () => {
  describe('resetData', () => {
    it('should do nothing if resetData receives nothing', () => {
      const state = { ...initialState };
      const nextState = threadsReducer(state, resetData());

      expect(nextState).toEqual(expect.objectContaining(state));
    });

    it('should do nothing if resetData receives unknown field', () => {
      const state = { ...initialState };
      const nextState = threadsReducer(state, resetData('unknownField'));

      expect(nextState).toEqual(expect.objectContaining(state));
    });

    it('should reset a single field to initialState', () => {
      const state = {
        ...initialState,
        statusList: status.success,
      };

      const nextState = threadsReducer(state, resetData('statusList'));

      expect(nextState.statusList).toBe(initialState.threadList);
    });

    it('should reset multiple fields to initialState', () => {
      const state = {
        ...initialState,
        statusList: status.success,
        statusCreate: status.success,
        threadList: clone(mockThreadListResponse.data.threads),
      };

      const nextState = threadsReducer(
        state,
        resetData(['statusList', 'statusCreate', 'threadList']),
      );

      expect(nextState.statusList).toBe(initialState.statusList);
      expect(nextState.statusCreate).toBe(initialState.statusCreate);
      expect(nextState.threadList).toBe(initialState.threadList);
    });
  });

  describe('optimisticVote', () => {
    // threadList votes
    it('should upvote a thread in threadlist when not yet upvoted', () => {
      const state = {
        ...initialState,
        threadList: cloneThreadListWithOverrides(THREAD_ID, {
          upVotesBy: [],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          threadId: THREAD_ID,
          userId: USER_ID,
          voteType: 'upvote',
        }),
      );

      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.upVotesBy).toContain(USER_ID);
    });

    it('should remove upvote a thread when already upvoted in threadlist', () => {
      const state = {
        ...initialState,
        threadList: cloneThreadListWithOverrides(THREAD_ID, {
          upVotesBy: [USER_ID],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          threadId: THREAD_ID,
          userId: USER_ID,
          voteType: 'upvote',
        }),
      );

      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.upVotesBy).not.toContain(USER_ID);
    });

    it('should update vote a thread from up to down when downvote in threadList', () => {
      const state = {
        ...initialState,
        threadList: cloneThreadListWithOverrides(THREAD_ID, {
          upVotesBy: [USER_ID],
          downVotesBy: [],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          threadId: THREAD_ID,
          userId: USER_ID,
          voteType: 'downvote',
        }),
      );

      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.upVotesBy).not.toContain(USER_ID);
      expect(thread.downVotesBy).toContain(USER_ID);
    });

    it('should downvote a thread in threadlist when not yet downvoted', () => {
      const state = {
        ...initialState,
        threadList: cloneThreadListWithOverrides(THREAD_ID, {
          downVotesBy: [],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          threadId: THREAD_ID,
          userId: USER_ID,
          voteType: 'downvote',
        }),
      );

      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.downVotesBy).toContain(USER_ID);
    });

    it('should remove downvote a thread when already downvoted in threadlist', () => {
      const state = {
        ...initialState,
        threadList: cloneThreadListWithOverrides(THREAD_ID, {
          downVotesBy: [USER_ID],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          threadId: THREAD_ID,
          userId: USER_ID,
          voteType: 'upvote',
        }),
      );

      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.downVotesBy).not.toContain(USER_ID);
    });

    // threadDetail votes
    it('should upvote a thread in threadDetail when not yet upvoted', () => {
      const state = {
        ...initialState,
        threadDetail: cloneThreadDetailWithOverrides({
          upVotesBy: [],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          userId: USER_ID,
          voteType: 'upvote',
          dataType: 'threadDetail',
        }),
      );

      expect(nextState.threadDetail.upVotesBy).toContain(USER_ID);
    });

    it('should remove upvote thread when already upvoted in threadDetail', () => {
      const state = {
        ...initialState,
        threadDetail: cloneThreadDetailWithOverrides({
          upVotesBy: [USER_ID],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          userId: USER_ID,
          voteType: 'upvote',
          dataType: 'threadDetail',
        }),
      );

      expect(nextState.threadDetail.upVotesBy).not.toContain(USER_ID);
    });

    it('should update vote a thread from up to down when downvote in threadDetail', () => {
      const state = {
        ...initialState,
        threadDetail: cloneThreadDetailWithOverrides({
          upVotesBy: [USER_ID],
          downVotesBy: [],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          userId: USER_ID,
          voteType: 'downvote',
          dataType: 'threadDetail',
        }),
      );

      expect(nextState.threadDetail.upVotesBy).not.toContain(USER_ID);
      expect(nextState.threadDetail.downVotesBy).toContain(USER_ID);
    });

    it('should downvote a thread in threadDetail when not yet downvoted', () => {
      const state = {
        ...initialState,
        threadDetail: cloneThreadDetailWithOverrides({
          downVotesBy: [],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          userId: USER_ID,
          voteType: 'downvote',
          dataType: 'threadDetail',
        }),
      );

      expect(nextState.threadDetail.downVotesBy).toContain(USER_ID);
    });

    it('should remove downvote a thread when already downvoted in threadDetail', () => {
      const state = {
        ...initialState,
        threadDetail: cloneThreadDetailWithOverrides({
          downVotesBy: [USER_ID],
        }),
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          userId: USER_ID,
          voteType: 'downvote',
          dataType: 'threadDetail',
        }),
      );

      expect(nextState.threadDetail.downVotesBy).not.toContain(USER_ID);
    });

    // threadDetail.comments votes
    it('should upvote a comment in threadDetail.comments', () => {
      const state = {
        ...initialState,
        threadDetail: {
          ...mockThreadDetailResponse.data.detailThread,
          comments: cloneCommentsWithOverrides(COMMENT_ID, {
            upVotesBy: [],
          }),
        },
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          commentId: COMMENT_ID,
          userId: USER_ID,
          voteType: 'upvote',
          dataType: 'comments',
        }),
      );

      const thread = nextState.threadDetail.comments.find(
        (commentItem) => commentItem.id === COMMENT_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.upVotesBy).toContain(USER_ID);
    });

    it('should remove upvote comment when already upvoted in threadDetail.comments', () => {
      const state = {
        ...initialState,
        threadDetail: {
          ...mockThreadDetailResponse.data.detailThread,
          comments: cloneCommentsWithOverrides(COMMENT_ID, {
            upVotesBy: [USER_ID],
          }),
        },
      };

      const nextState = threadsReducer(
        state,
        optimisticVote({
          commentId: COMMENT_ID,
          userId: USER_ID,
          voteType: 'upvote',
          dataType: 'comments',
        }),
      );

      const thread = nextState.threadDetail.comments.find(
        (commentItem) => commentItem.id === COMMENT_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.upVotesBy).not.toContain(USER_ID);
    });
  });
});

// extraReducer
describe('threadsReducer - extraReducer lifecycle', () => {
  describe('getThreadListAct', () => {
    it('should handle getThreadListAct.pending', () => {
      const state = { ...initialState };
      const action = { type: getThreadListAct.pending.type };

      const nextState = threadsReducer(state, action);

      expect(nextState.statusList).toBe(status.loading);
      expect(nextState.threadList).toEqual([]);
    });

    it('should handle getThreadListAct.fulfilled', () => {
      const state = { ...initialState };

      const action = {
        type: getThreadListAct.fulfilled.type,
        payload: {
          ...mockThreadListResponse,
          data: {
            threads: cloneThreadListWithOverrides(
              THREAD_ID,
              newThreadListObject,
            ),
          },
        },
      };

      const nextState = threadsReducer(state, action);
      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(nextState.statusList).toBe(status.success);
      expect(thread).toBeDefined();
      expect(thread).toMatchObject(newThreadListObject);
    });

    it('should handle getThreadListAct.rejected', () => {
      const state = { ...initialState };
      const action = { type: getThreadListAct.rejected.type };
      const nextState = threadsReducer(state, action);

      expect(nextState.statusList).toBe(status.error);
    });
  });

  describe('upVoteThreadAct', () => {
    it('should remove downvote on rejected upVoteThreadAct', () => {
      const state = {
        ...initialState,
        threadList: clone(mockThreadListResponse.data.threads),
        threadDetail: clone(mockThreadDetailResponse.data.detailThread),
      };

      const action = {
        type: upVoteThreadAct.rejected.type,
        payload: { threadId: THREAD_ID, userId: USER_ID },
      };

      const nextState = threadsReducer(state, action);
      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.upVotesBy).not.toContain(USER_ID);
      expect(nextState.threadDetail.upVotesBy).not.toContain(USER_ID);
    });
  });

  describe('downVoteThreadAct', () => {
    it('should remove downvote on rejected downVoteThreadAct', () => {
      const state = {
        ...initialState,
        threadList: clone(mockThreadListResponse.data.threads),
        threadDetail: clone(mockThreadDetailResponse.data.detailThread),
      };

      const action = {
        type: downVoteThreadAct.rejected.type,
        payload: { threadId: THREAD_ID, userId: USER_ID },
      };

      const nextState = threadsReducer(state, action);
      const thread = nextState.threadList.find(
        (threadItem) => threadItem.id === THREAD_ID,
      );

      expect(thread).toBeDefined();
      expect(thread.downVotesBy).not.toContain(USER_ID);
      expect(nextState.threadDetail.downVotesBy).not.toContain(USER_ID);
    });
  });
});
