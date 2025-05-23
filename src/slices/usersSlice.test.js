import { getUsersAct, initialState, usersReducer } from './Users.slice';
import { UsersService } from '@services/Users';
import { jest } from '@jest/globals';
import { mockUsersResponse } from './__mocks__/users/usersResponse';
import { status } from '@utils/constants';

/**
 * test scenarios for usersReducer
 *
 * - getUsersAct function
 *   - should handle getUsersAct.pending
 *   - should handle getUsersAct.fulfilled
 *   - should handle getUsersAct.rejected
 * 
 * 
 *  test scenarios for thunk
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

  it('should handle getUsersAct.pending', () => {
    const state = { ...initialState };
    const action = { type: getUsersAct.pending.type };

    const nextState = usersReducer(state, action);

    expect(nextState.statusList).toBe(status.loading);
    expect(nextState.userList).toEqual([]);
  });

  it('should handle getUsersAct.fulfilled', () => {
    const state = { ...initialState };

    const action = {
      type: getUsersAct.fulfilled.type,
      payload: mockUsersResponse,
    };

    const nextState = usersReducer(state, action);
    const userList = nextState.userList;

    expect(nextState.statusList).toBe(status.success);
    expect(userList).toMatchObject(mockUsersResponse.data.users);
  });

  it('should handle getUsersAct.rejected', () => {
    const state = { ...initialState };
    const action = { type: getUsersAct.rejected.type };
    const nextState = usersReducer(state, action);

    expect(nextState.statusList).toBe(status.error);
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
