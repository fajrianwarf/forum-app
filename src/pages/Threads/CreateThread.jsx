import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { createThreadAct, resetData } from '@slices/Threads.slice';
import { path, status } from '@utils/constants';
import { useForm } from '@utils/custom-hooks';
import { FormContentEditable } from '@components/FormContentEditable';
import { FormInput } from '@components/FormInput';

function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statusCreate } = useSelector((state) => state.threads);
  const { form, errors, handleChange, validateForm } = useForm({
    initialValues: { title: '', category: '', body: '' },
    validate: {
      title: ['required'],
      body: ['required'],
    },
  });

  useEffect(() => {
    if (statusCreate === status.success) {
      dispatch(resetData('statusCreate'));
      navigate(path.home);
    }
  }, [dispatch, statusCreate, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    dispatch(createThreadAct(form));
  };

  const submitting = statusCreate === status.loading;

  return (
    <Box display='flex' justifyContent='center' mt={4}>
      <Card sx={{ width: '100%', maxWidth: 600 }}>
        <CardContent>
          <Typography variant='h5' fontWeight='bold' mb={2}>
            Create a New Thread
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <FormInput
              label='Title'
              name='title'
              value={form.title}
              onChange={handleChange}
              error={errors.title}
            />
            <FormInput
              label='Category'
              name='category'
              value={form.category}
              onChange={handleChange}
            />
            <FormContentEditable
              label='Content'
              name='body'
              value={form.body}
              onChange={handleChange}
              error={errors.body}
            />
            <Box display='flex' justifyContent='flex-end' mt={1}>
              <Button type='submit' variant='contained' disabled={submitting}>
                {submitting ? 'Posting...' : 'Post Thread'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export { CreateThread };
