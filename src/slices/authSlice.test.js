import {
  authReducer,
  getOwnProfileAct,
  initialState,
  loginAct,
  logout,
  registerAct,
  resetData,
} from './Auth.slice';
import { status, STORE_KEY } from '@utils/constants';
import { AuthService } from '@services/Auth';
import { jest } from '@jest/globals';
import {
  mockGetOwnProfile,
  mockLoginResponse,
  mockRegisterResponse,
} from './__mocks__/auth/authResponse';

/**
 * test scenarios for authReducer
 *
 * - resetData function
 *   - should do nothing if resetData receives nothing
 *   - should do nothing if resetData receives unknown field
 *   - should reset a single field to initialState
 *   - should reset multiple fields to initialState
 *
 * - logout function
 *   - should handle logout
 *
 * - login function
 *   - should handle login.pending
 *   - should handle login.fulfilled
 *   - should handle login.rejected
 *   - should store token and dispatch getOwnProfileAct
 *
 * - register function
 *   - should handle register.pending
 *   - should handle register.fulfilled
 *   - should handle register.rejected
 *   - should return response on success
 *
 * - getOwnProfile function
 *   - should handle getOwnProfile.pending
 *   - should handle getOwnProfile.fulfilled
 *   - should handle getOwnProfile.rejected
 *   - should return user data
 */

// reducer
describe('authReducer', () => {
  describe('resetData', () => {
    it('should do nothing if resetData receives nothing', () => {
      const state = { ...initialState };
      const nextState = authReducer(state, resetData());

      expect(nextState).toEqual(expect.objectContaining(state));
    });

    it('should do nothing if resetData receives unknown field', () => {
      const state = { ...initialState };
      const nextState = authReducer(state, resetData('unknownField'));

      expect(nextState).toEqual(expect.objectContaining(state));
    });

    it('should reset a single field to initialState', () => {
      const state = {
        ...initialState,
        isAuthenticated: true,
      };

      const nextState = authReducer(state, resetData('isAuthenticated'));

      expect(nextState.isAuthenticated).toBe(initialState.isAuthenticated);
    });

    it('should reset multiple fields to initialState', () => {
      const state = {
        ...initialState,
        statusLogin: status.success,
        statusRegister: status.success,
        isAuthenticated: true,
      };

      const nextState = authReducer(
        state,
        resetData(['statusLogin', 'statusRegister', 'isAuthenticated']),
      );

      expect(nextState.statusLogin).toBe(initialState.statusLogin);
      expect(nextState.statusRegister).toBe(initialState.statusRegister);
      expect(nextState.isAuthenticated).toBe(initialState.isAuthenticated);
    });
  });

  describe('logout', () => {
    it('should handle logout', () => {
      sessionStorage.setItem(STORE_KEY, 'test-token');
      const state = {
        ...initialState,
        profile: { name: 'User Test' },
        isAuthenticated: true,
      };
      const result = authReducer(state, logout());
      expect(result.profile).toBe(null);
      expect(result.isAuthenticated).toBe(false);
    });
  });
});

// extraReducer
describe('authReducer - extraReducer lifecycle', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = {};
  const signal = {};
  const rejectWithValue = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  describe('login', () => {
    it('should handle login.pending', () => {
      const state = { ...initialState };
      const action = { type: loginAct.pending.type };
      const result = authReducer(state, action);
      expect(result.statusLogin).toBe(status.loading);
    });

    it('should handle login.fulfilled', () => {
      const state = { ...initialState };
      const action = { type: loginAct.fulfilled.type };
      const result = authReducer(state, action);
      expect(result.statusLogin).toBe(status.success);
      expect(result.isAuthenticated).toBe(true);
    });

    it('should handle login.rejected', () => {
      const state = { ...initialState };
      const action = { type: loginAct.rejected.type };
      const result = authReducer(state, action);
      expect(result.statusLogin).toBe(status.error);
      expect(result.isAuthenticated).toBe(false);
    });

    it('should store token and dispatch getOwnProfileAct', async () => {
      const payload = { username: 'user', password: 'pass' };

      jest.spyOn(AuthService, 'login').mockResolvedValue(mockLoginResponse);
      jest
        .spyOn(AuthService, 'getOwnProfile')
        .mockResolvedValue(mockGetOwnProfile);

      const thunkAPI = { dispatch, getState, extra, signal, rejectWithValue };
      const result = await loginAct(payload)(dispatch, getState, thunkAPI);

      expect(AuthService.login).toHaveBeenCalledWith(payload);
      expect(sessionStorage.getItem(STORE_KEY)).toBe(
        mockLoginResponse.data.token,
      );
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function)); // getOwnProfileAct
      expect(result.payload).toBe(mockLoginResponse.data.token);
      expect(result.type).toBe(loginAct.fulfilled.type);
    });
  });

  describe('register', () => {
    it('should handle register.pending', () => {
      const state = { ...initialState };
      const action = { type: registerAct.pending.type };
      const result = authReducer(state, action);
      expect(result.statusRegister).toBe(status.loading);
    });

    it('should handle register.fulfilled', () => {
      const action = { type: registerAct.fulfilled.type };
      const result = authReducer(initialState, action);
      expect(result.statusRegister).toBe(status.success);
    });

    it('should handle register.rejected', () => {
      const state = { ...initialState };
      const action = { type: registerAct.rejected.type };
      const result = authReducer(state, action);
      expect(result.statusRegister).toBe(status.error);
    });

    it('should return response on success', async () => {
      const payload = { username: 'newuser', password: 'pass' };
      const mockResponse = mockRegisterResponse;
      jest.spyOn(AuthService, 'register').mockResolvedValue(mockResponse);

      const thunkAPI = { dispatch, getState, extra, signal, rejectWithValue };
      const result = await registerAct(payload)(dispatch, getState, thunkAPI);

      expect(AuthService.register).toHaveBeenCalledWith(payload);
      expect(result.payload).toBe(mockResponse);
      expect(result.type).toBe(registerAct.fulfilled.type);
    });
  });

  describe('getOwnProfile', () => {
    it('should handle getOwnProfile.pending', () => {
      const state = { ...initialState };
      const action = { type: getOwnProfileAct.pending.type };
      const result = authReducer(state, action);
      expect(result.statusProfile).toBe(status.loading);
    });

    it('should handle getOwnProfile.fulfilled', () => {
      const user = { id: 1, name: 'Alice' };
      const action = {
        type: getOwnProfileAct.fulfilled.type,
        payload: { data: { user } },
      };
      const result = authReducer(initialState, action);
      expect(result.profile).toEqual(user);
      expect(result.statusProfile).toBe(status.success);
    });

    it('should handle getOwnProfile.rejected', () => {
      const state = { ...initialState };
      const action = { type: getOwnProfileAct.rejected.type };
      const result = authReducer(state, action);
      expect(result.statusProfile).toBe(status.error);
    });

    it('should return user data', async () => {
      const mockResponse = mockGetOwnProfile;
      jest.spyOn(AuthService, 'getOwnProfile').mockResolvedValue(mockResponse);

      const thunkAPI = { dispatch, getState, extra, signal, rejectWithValue };
      const result = await getOwnProfileAct()(dispatch, getState, thunkAPI);

      expect(result.payload).toEqual(mockResponse);
      expect(result.type).toBe(getOwnProfileAct.fulfilled.type);
    });
  });
});
