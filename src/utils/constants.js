const BASE_URL = 'https://forum-api.dicoding.dev/v1';
const STORE_KEY = 'dicoding';

const status = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

const path = {
  home: '/',
  login: '/login',
  register: '/register',
  threads: '/threads',
  createThread: '/threads/new',
  leaderboards: '/leaderboards',
  notFound: '*',
  serverError: '/500',
};

export { BASE_URL, STORE_KEY, status, path };
