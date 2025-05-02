import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@slices/Auth.slice';
import { threadsReducer } from '@slices/Threads.slice';
import { usersReducer } from '@slices/Users.slice';
import { leaderboardsReducer } from '@slices/Leaderboards';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
  },
});
