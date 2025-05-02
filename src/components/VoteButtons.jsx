import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Typography } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
  optimisticVote,
  neutralVoteThreadAct,
  upVoteThreadAct,
  downVoteThreadAct,
  upVoteCommentAct,
  downVoteCommentAct,
} from '@slices/Threads.slice';
import { toast } from 'react-toastify';

function VoteActions(props) {
  const {
    threadId,
    commentId = null,
    upVotesBy = [],
    downVotesBy = [],
    dataType = 'threadList', // threadDetail, comments
    ...rest
  } = props;
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const userId = profile?.id;
  const isUpVoted = userId && upVotesBy.includes(userId);
  const isDownVoted = userId && downVotesBy.includes(userId);

  const handleVote = (type) => (event) => {
    event.stopPropagation();

    if (!userId) {
      toast.error('Require login to vote!');
      return;
    }

    const votePayload = {
      threadId,
      voteType: type,
      userId,
      commentId,
    };

    dispatch(optimisticVote({ ...votePayload, dataType }));

    const isAlreadyVoted = type === 'upvote' ? isUpVoted : isDownVoted;

    if (isAlreadyVoted) {
      dispatch(neutralVoteThreadAct(votePayload));
    } else {
      if (type === 'upvote') {
        dispatch(
          commentId
            ? upVoteCommentAct(votePayload)
            : upVoteThreadAct(votePayload)
        );
      } else {
        dispatch(
          commentId
            ? downVoteCommentAct(votePayload)
            : downVoteThreadAct(votePayload)
        );
      }
    }
  };

  return (
    <>
      <Box display='flex' alignItems='center' {...rest}>
        <IconButton size='small' onClick={handleVote('upvote')}>
          {isUpVoted ? (
            <ThumbUpAltIcon fontSize='small' />
          ) : (
            <ThumbUpOffAltIcon fontSize='small' />
          )}
        </IconButton>
        <Typography variant='body2'>{upVotesBy.length}</Typography>
        &nbsp;&nbsp;
        <IconButton size='small' onClick={handleVote('downvote')}>
          {isDownVoted ? (
            <ThumbDownAltIcon fontSize='small' />
          ) : (
            <ThumbDownOffAltIcon fontSize='small' />
          )}
        </IconButton>
        <Typography variant='body2'>{downVotesBy.length}</Typography>
      </Box>
    </>
  );
}

export { VoteActions };
