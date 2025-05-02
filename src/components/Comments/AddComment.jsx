import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Link, TextField, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { createCommentAct } from '@slices/Threads.slice';
import { path, status } from '@utils/constants';
import { useAuth, useForm } from '@utils/custom-hooks';
import { FormContentEditable } from '@components/FormContentEditable';

function AddComment(props) {
  const { threadId } = props;
  const { isAuthenticated } = useAuth();
  const { statusComment } = useSelector((state) => state.threads);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, errors, handleChange, validateForm } = useForm({
    initialValues: { comment: '' },
    validate: {
      comment: ['required'],
    },
  });

  const toLogin = (e) => {
    e.preventDefault();
    navigate(path.login);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    dispatch(createCommentAct({ threadId, body: { content: form.comment } }));
  };

  const submitting = statusComment === status.loading;

  return (
    <Box component='form' onSubmit={onSubmit} my={2}>
      <Typography variant='h6' textAlign='left' fontWeight='bold'>
        Add comment&nbsp;
        {!isAuthenticated && (
          <ReportProblemIcon
            fontSize='inherit'
            sx={{
              fontSize: '0.7em',
              verticalAlign: 'super',
              color: 'error.main',
            }}
          />
        )}
      </Typography>
      {isAuthenticated ? (
        <>
          <FormContentEditable
            name='comment'
            value={form.comment}
            onChange={handleChange}
            error={errors.comment}
            sx={{ mb: 1 }}
          />
          <Button
            variant='contained'
            type='submit'
            fullWidth
            disabled={submitting || errors.comment}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </>
      ) : (
        <Typography variant='subtitle2' mt={1} textAlign='left'>
          You need to be logged in to comment.&nbsp;
          <Link component='button' onClick={toLogin} underline='hover'>
            Login Here
          </Link>
        </Typography>
      )}
    </Box>
  );
}

export { AddComment };
