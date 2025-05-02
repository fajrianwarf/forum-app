import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { status } from '@utils/constants';
import { UsersService } from '@services/Users';

const getUsersAct = createAsyncThunk('Users/list', async () => {
  const response = await UsersService.getUsers();
  return response;
});

const initialState = {
  statusList: status.idle,
  userList: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAct.pending, (state) => {
        state.statusList = status.loading;
      })
      .addCase(getUsersAct.fulfilled, (state, action) => {
        state.statusList = status.success;
        state.userList = action.payload?.data?.users ?? [];
      })
      .addCase(getUsersAct.rejected, (state) => {
        state.statusList = status.error;
      });
  },
});

const usersReducer = usersSlice.reducer;
export { getUsersAct, usersReducer };
