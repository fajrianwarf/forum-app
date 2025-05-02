import React from 'react';
import { useSelector } from 'react-redux';

import { Avatar, Box, Divider, Typography } from '@mui/material';
import { VoteActions } from '@components/VoteButtons';
import { formatLongDateTime } from '@utils';
import parser from 'html-react-parser';

function CommentItem(props) {
  const { id, owner, createdAt, content = '', upVotesBy, downVotesBy } = props;
  const { userList } = useSelector((state) => state.users);
  const { threadDetail } = useSelector((state) => state.threads);
  const userDetail = (id) => userList.find((user) => user.id === id) ?? {};

  return (
    <Box mt={2} mb={2} textAlign='left'>
      <Box display='flex' alignItems='center'>
        <Avatar src={owner?.avatar} alt={owner?.name} />
        <Box ml={2} textAlign='left'>
          <Typography fontWeight='bold'>{owner?.name}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {userDetail(owner?.id)?.email} ·&nbsp;
            {formatLongDateTime(createdAt)}
          </Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <Typography>{parser(content)}</Typography>
      </Box>
      <VoteActions
        threadId={threadDetail.id}
        commentId={id}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        dataType='comments'
        sx={{ mt: 1}}
      />
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}

export { CommentItem };
