import { BASE_URL } from '@utils/constants';
import { submit } from '@utils/request';

function login(payload) {
  return submit('POST', `${BASE_URL}/login`, payload);
}

function register(payload) {
  return submit('POST', `${BASE_URL}/register`, payload);
}

function getOwnProfile() {
  return submit('GET', `${BASE_URL}/users/me`, {});
}

const AuthService = {
  login,
  register,
  getOwnProfile,
};

export { AuthService };
