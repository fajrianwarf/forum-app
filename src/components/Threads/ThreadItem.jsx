import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Avatar, IconButton, Typography, Box } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { VoteActions } from '@components/VoteButtons';
import { formatDate } from '@utils/index';
import parser from 'html-react-parser';

function ThreadItem(props) {
  const {
    id,
    name,
    category,
    title,
    body = '',
    createdAt,
    upVotesBy = [],
    downVotesBy = [],
    totalComments,
    ownerId,
  } = props;
  const navigate = useNavigate();
  const { userList } = useSelector((state) => state.users);

  const userDetail = userList.find((user) => user.id === ownerId) ?? {};
  const toDetail = () => navigate(`/threads/${id}`);

  return (
    <Box
      display='flex'
      p={2}
      flexDirection='row'
      borderBottom='1px solid #e0e0e0'
      sx={{ cursor: 'pointer' }}
      component='div'
      onClick={toDetail}
    >
      <Avatar alt={name} src={userDetail.avatar} />
      <Box ml={2} flex={1} sx={{ textAlign: 'left' }}>
        <Typography fontWeight='bold'>
          {userDetail.name}&nbsp;
          <Typography component='span' color='text.secondary'>
            {userDetail.email} · {formatDate(createdAt)}
          </Typography>
        </Typography>
        <Typography fontWeight='bold'>{title}</Typography>
        <Typography>{parser(body)}</Typography>
        <Typography component='span' fontWeight='bold' color='blue'>
          #{category}
        </Typography>
        <Box display='flex'>
          <VoteActions
            threadId={id}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            dataType='threadList'
          />
          &nbsp;&nbsp;
          <Box display='flex' alignItems='center'>
            <IconButton size='small'>
              <ChatBubbleOutlineIcon fontSize='small' />
            </IconButton>
            &nbsp;<Typography variant='subtitle2'>{totalComments}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export { ThreadItem };
