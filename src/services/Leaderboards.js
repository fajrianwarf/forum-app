import { BASE_URL } from '@utils/constants';
import { submit } from '@utils/request';

function getLeaderboards() {
  return submit('GET', `${BASE_URL}/leaderboards`, {});
}

const LeaderboardsService = {
  getLeaderboards,
};

export { LeaderboardsService };
