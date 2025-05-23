import { getLeaderboardsAct, initialState, leaderboardsReducer } from './Leaderboards.slice';
import { LeaderboardsService } from '@services/Leaderboards';
import { jest } from '@jest/globals';
import { mockLeaderboards } from './__mocks__/leaderboards/leaderboardsResponse';
import { status } from '@utils/constants';

/**
 * test scenarios for leaderboardsReducer
 *
 * - getLeaderboardsAct function
 *   - should handle getLeaderboardsAct.pending
 *   - should handle getLeaderboardsAct.fulfilled
 *   - should handle getLeaderboardsAct.rejected
 * 
 * 
 *  test scenarios for thunk
 * 
 * - getLeaderboardsAct function
 *   - should return leaderboard data on fulfilled
 */

describe('leaderboardsReducer - extraReducer lifecycle', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = {};
  const signal = {};
  const rejectWithValue = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle getLeaderboardsAct.pending', () => {
    const state = { ...initialState };
    const action = { type: getLeaderboardsAct.pending.type };

    const nextState = leaderboardsReducer(state, action);

    expect(nextState.statusList).toBe(status.loading);
    expect(nextState.leaderboardList).toEqual([]);
  });

  it('should handle getLeaderboardsAct.fulfilled', () => {
    const state = { ...initialState };

    const action = {
      type: getLeaderboardsAct.fulfilled.type,
      payload: mockLeaderboards,
    };

    const nextState = leaderboardsReducer(state, action);
    const leaderboardList = nextState.leaderboardList;

    expect(nextState.statusList).toBe(status.success);
    expect(leaderboardList).toMatchObject(mockLeaderboards.data.leaderboards);
  });

  it('should handle getLeaderboardsAct.rejected', () => {
    const state = { ...initialState };
    const action = { type: getLeaderboardsAct.rejected.type };
    const nextState = leaderboardsReducer(state, action);

    expect(nextState.statusList).toBe(status.error);
  });

  it('should return leaderboard data on fulfilled', async () => {
    const mockResponse = mockLeaderboards;
    jest
      .spyOn(LeaderboardsService, 'getLeaderboards')
      .mockResolvedValue(mockResponse);

    const thunkAPI = { dispatch, getState, extra, signal, rejectWithValue };
    const result = await getLeaderboardsAct()(dispatch, getState, thunkAPI);

    expect(result.type).toBe(getLeaderboardsAct.fulfilled.type);
    expect(result.payload).toEqual(mockResponse);
    expect(LeaderboardsService.getLeaderboards).toHaveBeenCalled();
  });
});
