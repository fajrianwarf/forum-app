import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';

function LeaderboardItem(props) {
  const { user, score, index, isLast } = props;

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={user.avatar} alt={user.name} />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography fontWeight='bold'>
              {index + 1}. {user.name}
            </Typography>
          }
          secondary={user.email}
        />

        <Typography fontWeight='bold' color='primary'>
          {score} pts
        </Typography>
      </ListItem>

      {!isLast && <Divider />}
    </>
  );
}

export { LeaderboardItem };
