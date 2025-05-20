import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { status } from '@utils/constants';
import { LeaderboardsService } from '@services/Leaderboards';

const getLeaderboardsAct = createAsyncThunk('Leaderboards/list', async () => {
  const response = await LeaderboardsService.getLeaderboards();
  return response;
});

const initialState = {
  statusList: status.idle,
  leaderboardList: [],
};

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboardsAct.pending, (state) => {
        state.statusList = status.loading;
      })
      .addCase(getLeaderboardsAct.fulfilled, (state, action) => {
        state.statusList = status.success;
        state.leaderboardList = action.payload?.data?.leaderboards ?? [];
      })
      .addCase(getLeaderboardsAct.rejected, (state) => {
        state.statusList = status.error;
      });
  },
});

const leaderboardsReducer = leaderboardsSlice.reducer;
export { getLeaderboardsAct, leaderboardsReducer };
