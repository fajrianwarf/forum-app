import { getLeaderboardsAct } from './Leaderboards.slice';
import { LeaderboardsService } from '@services/Leaderboards';
import { jest } from '@jest/globals';
import { mockLeaderboards } from './__mocks__/leaderboards/leaderboardsResponse';

/**
 * test scenarios for leaderboardsReducer
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
