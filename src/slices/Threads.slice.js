import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThreadsService } from '@services/Threads';
import { status } from '@utils/constants';

const getThreadListAct = createAsyncThunk('Threads/list', async () => {
  const response = await ThreadsService.getThreadList();
  return response;
});

const getThreadDetailAct = createAsyncThunk('Threads/detail', async (id) => {
  const response = await ThreadsService.getThreadDetail(id);
  return response;
});

const createThreadAct = createAsyncThunk('Threads/create', async (payload) => {
  const response = await ThreadsService.createThread(payload);
  return response;
});

const createCommentAct = createAsyncThunk(
  'Threads/comment',
  async (payload, { dispatch }) => {
    const response = await ThreadsService.createComment(payload);
    if (response) await dispatch(getThreadDetailAct(payload.threadId));
    return response;
  }
);

const upVoteThreadAct = createAsyncThunk(
  'Threads/upVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await ThreadsService.upVoteThread(threadId);
      return { threadId, userId };
    } catch {
      return rejectWithValue({ threadId, userId });
    }
  }
);

const downVoteThreadAct = createAsyncThunk(
  'Threads/downVoteThread',
  async ({ threadId, userId }, { rejectWithValue }) => {
    try {
      await ThreadsService.downVoteThread(threadId);
      return { threadId, userId };
    } catch {
      return rejectWithValue({ threadId, userId });
    }
  }
);

const neutralVoteThreadAct = createAsyncThunk(
  'Threads/neutralVoteThread',
  async ({ threadId, userId, voteType }, { rejectWithValue }) => {
    try {
      await ThreadsService.neutralVoteThread(threadId);
      return { threadId, userId };
    } catch {
      return rejectWithValue({ threadId, userId, voteType });
    }
  }
);

const upVoteCommentAct = createAsyncThunk(
  'Threads/upVoteComment',
  async ({ threadId, userId, commentId }, { rejectWithValue }) => {
    try {
      await ThreadsService.upVoteComment({ threadId, commentId });
      return { threadId, userId };
    } catch {
      return rejectWithValue({ threadId, userId });
    }
  }
);

const downVoteCommentAct = createAsyncThunk(
  'Threads/downVoteComment',
  async ({ threadId, userId, commentId }, { rejectWithValue }) => {
    try {
      await ThreadsService.downVoteComment({ threadId, commentId });
      return { threadId, userId };
    } catch {
      return rejectWithValue({ threadId, userId });
    }
  }
);

const neutralVoteCommentAct = createAsyncThunk(
  'Threads/neutralVoteComment',
  async ({ threadId, userId, voteType, commentId }, { rejectWithValue }) => {
    try {
      await ThreadsService.neutralVoteComment({ threadId, commentId });
      return { threadId, userId };
    } catch {
      return rejectWithValue({ threadId, userId, voteType });
    }
  }
);

const initialState = {
  statusList: status.idle,
  threadList: [],
  statusDetail: status.idle,
  threadDetail: {},
  statusCreate: status.idle,
  statusComment: status.idle,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    resetData: (state, action) => {
      const payload = action.payload;
      if (typeof payload === 'string') {
        state[payload] = initialState[payload];
      } else if (Array.isArray(payload)) {
        payload.forEach((item) => (state[item] = initialState[item]));
      }
    },
    optimisticVote: (state, action) => {
      const {
        threadId,
        commentId,
        voteType,
        userId,
        dataType = 'threadList',
      } = action.payload;
      let thread = {};
      if (dataType === 'threadList') {
        thread = state[dataType].find((thread) => thread.id === threadId);
      } else if (dataType === 'threadDetail') {
        thread = state[dataType];
      } else if (dataType === 'comments') {
        thread = state.threadDetail[dataType].find(
          (comments) => comments.id === commentId
        );
      }

      if (!thread) return;

      if (voteType === 'upvote') {
        const isUpVoted = thread.upVotesBy.some((id) => id === userId);
        if (isUpVoted) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy.push(userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      } else if (voteType === 'downvote') {
        const isDownVoted = thread.downVotesBy.some((id) => id === userId);
        if (isDownVoted) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy.push(userId);
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getThreadListAct.pending, (state) => {
        state.statusList = status.loading;
        state.threadList = [];
      })
      .addCase(getThreadListAct.fulfilled, (state, action) => {
        state.statusList = status.success;
        state.threadList = action.payload?.data?.threads ?? [];
      })
      .addCase(getThreadListAct.rejected, (state) => {
        state.statusList = status.error;
      })
      .addCase(getThreadDetailAct.pending, (state) => {
        state.statusDetail = status.loading;
        state.threadDetail = {};
      })
      .addCase(getThreadDetailAct.fulfilled, (state, action) => {
        state.statusDetail = status.success;
        state.threadDetail = action.payload?.data?.detailThread ?? {};
      })
      .addCase(getThreadDetailAct.rejected, (state) => {
        state.statusDetail = status.error;
      })
      .addCase(createThreadAct.pending, (state) => {
        state.statusCreate = status.loading;
      })
      .addCase(createThreadAct.fulfilled, (state) => {
        state.statusCreate = status.success;
      })
      .addCase(createThreadAct.rejected, (state) => {
        state.statusCreate = status.error;
      })
      .addCase(createCommentAct.pending, (state) => {
        state.statusComment = status.loading;
      })
      .addCase(createCommentAct.fulfilled, (state) => {
        state.statusComment = status.success;
      })
      .addCase(createCommentAct.rejected, (state) => {
        state.statusComment = status.error;
      })
      .addCase(upVoteThreadAct.rejected, (state, action) => {
        const { threadId, userId } = action.payload;
        const thread = state.threadList.find((t) => t.id === threadId);
        const threadDetail = state.threadDetail;
        if (!thread || !threadDetail) return;

        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        threadDetail.upVotesBy = threadDetail.upVotesBy.filter(
          (id) => id !== userId
        );
      })
      .addCase(downVoteThreadAct.rejected, (state, action) => {
        const { threadId, userId } = action.payload;
        const thread = state.threadList.find(
          (thread) => thread.id === threadId
        );
        const threadDetail = state.threadDetail;
        if (!thread || !threadDetail) return;

        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        threadDetail.downVotesBy = threadDetail.downVotesBy.filter(
          (id) => id !== userId
        );
      })
      .addCase(neutralVoteThreadAct.rejected, (state, action) => {
        const { threadId, userId, voteType } = action.payload;
        const thread = state.threadList.find(
          (thread) => thread.id === threadId
        );
        const threadDetail = state.threadDetail;
        if (!thread || !threadDetail) return;

        if (voteType === 'upvote') {
          thread.upVotesBy.push(userId);
          threadDetail.upVotesBy.push(userId);
        } else if (voteType === 'downvote') {
          thread.downVotesBy.push(userId);
          threadDetail.downVotesBy.push(userId);
        }
      })
      .addCase(upVoteCommentAct.rejected, (state, action) => {
        const { userId, commentId } = action.payload;
        const thread = state.threadDetail.comments.find(
          (t) => t.id === commentId
        );
        if (!thread) return;

        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
      })
      .addCase(downVoteCommentAct.rejected, (state, action) => {
        const { userId, commentId } = action.payload;
        const thread = state.threadDetail.comments.find(
          (t) => t.id === commentId
        );
        if (!thread) return;

        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
      })
      .addCase(neutralVoteCommentAct.rejected, (state, action) => {
        const { userId, voteType, commentId } = action.payload;
        const thread = state.threadDetail.comments.find(
          (t) => t.id === commentId
        );
        if (!thread) return;

        if (voteType === 'upvote') {
          thread.upVotesBy.push(userId);
        } else if (voteType === 'downvote') {
          thread.downVotesBy.push(userId);
        }
      });
  },
});

const { resetData, optimisticVote } = threadsSlice.actions;
const threadsReducer = threadsSlice.reducer;
export {
  getThreadListAct,
  getThreadDetailAct,
  createThreadAct,
  createCommentAct,
  upVoteThreadAct,
  downVoteThreadAct,
  neutralVoteThreadAct,
  resetData,
  threadsReducer,
  optimisticVote,
  upVoteCommentAct,
  downVoteCommentAct,
  neutralVoteCommentAct,
};
