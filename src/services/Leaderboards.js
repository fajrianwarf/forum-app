import { BASE_URL } from '@utils/constants';
import { submit } from '@utils/request';

const LeaderboardsService = {
  getLeaderboards,
};

function getLeaderboards() {
  return submit('GET', `${BASE_URL}/leaderboards`, {});
}

export { LeaderboardsService };
