import { BASE_URL } from '@utils/constants';
import { submit } from '@utils/request';

function getUsers() {
  return submit('GET', `${BASE_URL}/users`, {});
}

const UsersService = {
  getUsers,
};

export { UsersService };
