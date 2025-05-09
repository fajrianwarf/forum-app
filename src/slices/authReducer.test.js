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
  });
});
