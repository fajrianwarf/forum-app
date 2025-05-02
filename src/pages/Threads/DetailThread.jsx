import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Typography, Avatar, Divider } from '@mui/material';
import { CommentItem } from '@components/Comments/CommentItem';
import { AddComment } from '@components/Comments/AddComment';
import { VoteActions } from '@components/VoteButtons';
import { PageLoader } from '@components/PageLoader';
import { PostHeader } from '@components/Navigation/PostHeader';

import { getThreadDetailAct, resetData } from '@slices/Threads.slice';
import { getUsersAct } from '@slices/Users.slice';
import { formatLongDateTime } from '@utils';
import { path, status } from '@utils/constants';
import parser from 'html-react-parser';

function DetailThread() {
  const { id } = useParams();
  const { threadDetail, statusDetail } = useSelector((state) => state.threads);
  const { userList } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const {
    title,
    body = '',
    category,
    createdAt,
    owner,
    upVotesBy = [],
    downVotesBy = [],
    comments,
  } = threadDetail;
  const userDetail = (id) => userList.find((user) => user.id === id) ?? {};
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetData(['threadDetail', 'statusDetail']));
    dispatch(getUsersAct());
    dispatch(getThreadDetailAct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (statusDetail === status.error) {
      navigate(path.home, { replace: true });
    }
  }, [navigate, statusDetail]);

  if (statusDetail === status.loading) {
    return <PageLoader />;
  }

  return (
    <>
      <PostHeader />
      <Box px={4}>
        <Box display='flex' alignItems='left' mb={2}>
          <Avatar src={owner?.avatar} alt={owner?.name} />
          <Box ml={2} textAlign='left'>
            <Typography fontWeight='bold'>{owner?.name} (Author)</Typography>
            <Typography color='text.secondary'>
              {userDetail(owner?.id)?.email} · {formatLongDateTime(createdAt)}
            </Typography>
          </Box>
        </Box>
        <Typography variant='h4' fontWeight='bold' textAlign='left' mb={2}>
          {title}
        </Typography>
        <Typography textAlign='left' mb={1} component='div'>
          {parser(body)}
        </Typography>
        <Typography
          variant='body1'
          color='primary'
          mb={2}
          textAlign='left'
          fontWeight='bold'
        >
          #{category}
        </Typography>
        <VoteActions
          threadId={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          dataType='threadDetail'
          sx={{ mb: 2 }}
        />
        <Divider />
        <AddComment threadId={id} />
        <Divider />
        <Box mt={2}>
          <Typography variant='h6' textAlign='left' fontWeight='bold'>
            Comments ({comments?.length})
          </Typography>
          {comments?.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} {...comment} />
            ))
          ) : (
            <Typography color='text.secondary' textAlign='left'>
              No comments yet.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export { DetailThread };
