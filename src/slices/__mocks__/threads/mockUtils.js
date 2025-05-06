import {
  mockThreadListResponse,
  mockThreadDetailResponse,
} from './threadResponse.js';

const cloneThreadListWithOverrides = (id, overrides = {}) => {
  return mockThreadListResponse.data.threads.map((thread) =>
    thread.id === id ? { ...thread, ...overrides } : thread,
  );
};

const cloneThreadDetailWithOverrides = (overrides = {}) => {
  return {
    ...mockThreadDetailResponse.data.detailThread,
    ...overrides,
  };
};

const cloneCommentsWithOverrides = (commentId, overrides = {}) => {
  return mockThreadDetailResponse.data.detailThread.comments.map((comment) =>
    comment.id === commentId ? { ...comment, ...overrides } : comment,
  );
};

export {
  cloneThreadListWithOverrides,
  cloneThreadDetailWithOverrides,
  cloneCommentsWithOverrides,
};
