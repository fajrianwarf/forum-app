import { getUsersAct } from './Users.slice';
import { UsersService } from '@services/Users';
import { jest } from '@jest/globals';
import { mockUsersResponse } from './__mocks__/users/usersResponse';

/**
 * test scenarios for usersReducer
 *
 * - getUsersAct function
 *   - should return users data on fulfilled
 */

describe('usersReducer - extraReducer lifecycle', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = {};
  const signal = {};
  const rejectWithValue = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return users data on fulfilled', async () => {
    const mockResponse = mockUsersResponse;
    jest.spyOn(UsersService, 'getUsers').mockResolvedValue(mockResponse);

    const thunkAPI = { dispatch, getState, extra, signal, rejectWithValue };
    const result = await getUsersAct()(dispatch, getState, thunkAPI);

    expect(result.type).toBe(getUsersAct.fulfilled.type);
    expect(result.payload).toEqual(mockResponse);
    expect(UsersService.getUsers).toHaveBeenCalled();
  });
});
