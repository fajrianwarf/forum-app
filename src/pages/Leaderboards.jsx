import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Typography, List, Paper } from '@mui/material';
import { LeaderboardItem } from '@components/LeaderboardItem';
import { PageLoader } from '@components/PageLoader';
import { getLeaderboardsAct } from '@slices/Leaderboards.slice';
import { status } from '@utils/constants';

const Leaderboards = () => {
  const dispatch = useDispatch();
  const { statusList, leaderboardList } = useSelector(
    (state) => state.leaderboards,
  );

  useEffect(() => {
    dispatch(getLeaderboardsAct());
  }, [dispatch]);

  if (statusList === status.loading) {
    return <PageLoader />;
  }

  return (
    <Box p={2} maxWidth={600} mx='auto'>
      <Typography variant='h5' fontWeight='bold' mb={2}>
        Leaderboards
      </Typography>

      <Paper elevation={1}>
        <List>
          {leaderboardList.length > 0 ? (
            leaderboardList.map((leaderboard, index) => (
              <LeaderboardItem
                {...leaderboard}
                index={index}
                isLast={index === leaderboardList.length - 1}
              />
            ))
          ) : (
            <Box p={3}>
              <Typography color='text.secondary' textAlign='center'>
                No data found.
              </Typography>
            </Box>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export { Leaderboards };
