import { BASE_URL } from '@utils/constants';
import { submit } from '@utils/request';

const UsersService = {
  getUsers,
};

function getUsers() {
  return submit('GET', `${BASE_URL}/users`, {});
}

export { UsersService };
