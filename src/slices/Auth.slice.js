import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '@services/Auth';
import { status, STORE_KEY } from '@utils/constants';
import { toast } from 'react-toastify';

const loginAct = createAsyncThunk('Auth/login', async (payload, thunkAPI) => {
  const response = await AuthService.login(payload);

  const token = response.data?.token;
  if (token) {
    sessionStorage.setItem(STORE_KEY, token);
    thunkAPI.dispatch(getOwnProfileAct());
  }

  return token;
});

const registerAct = createAsyncThunk('Auth/register', async (payload) => {
  const response = await AuthService.register(payload);
  if (response) toast.success('Success register, you may login now');
  return response;
});

const getOwnProfileAct = createAsyncThunk('Auth/profile', async () => {
  const response = await AuthService.getOwnProfile();
  return response;
});

const initialState = {
  statusLogin: status.idle,
  statusRegister: status.idle,
  statusProfile: status.idle,
  profile: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
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
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem(STORE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAct.pending, (state) => {
        state.statusLogin = status.loading;
      })
      .addCase(loginAct.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.statusLogin = status.success;
      })
      .addCase(loginAct.rejected, (state) => {
        state.isAuthenticated = false;
        state.statusLogin = status.error;
      })
      .addCase(registerAct.pending, (state) => {
        state.statusRegister = status.loading;
      })
      .addCase(registerAct.fulfilled, (state) => {
        state.statusRegister = status.success;
      })
      .addCase(registerAct.rejected, (state) => {
        state.statusRegister = status.error;
      })
      .addCase(getOwnProfileAct.pending, (state) => {
        state.statusProfile = status.loading;
      })
      .addCase(getOwnProfileAct.fulfilled, (state, action) => {
        state.statusProfile = status.success;
        state.profile = action.payload?.data?.user ?? null;
      })
      .addCase(getOwnProfileAct.rejected, (state) => {
        state.statusProfile = status.error;
      });
  },
});

const { resetData, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export {
  loginAct,
  registerAct,
  authReducer,
  getOwnProfileAct,
  logout,
  resetData,
};
