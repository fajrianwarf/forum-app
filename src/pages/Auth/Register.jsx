import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { registerAct, resetData } from '@slices/Auth.slice';
import { PageLoader } from '@components/PageLoader';
import { FormInput } from '@components/FormInput';
import { useForm } from '@utils/custom-hooks';
import { status } from '@utils/constants';

const Register = () => {
  const { form, errors, handleChange, validateForm } = useForm({
    initialValues: { name: '', email: '', password: '' },
    validate: {
      name: ['required'],
      email: ['required', 'email'],
      password: ['required', 'min:6'],
    },
  });
  const { statusRegister } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (statusRegister === status.success) {
      navigate('/login');
      dispatch(resetData('statusRegister'));
    }
  }, [dispatch, navigate, statusRegister]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    dispatch(registerAct(form));
  };

  const toLogin = () => {
    navigate('/login');
  };

  if (statusRegister === status.loading) {
    return <PageLoader />;
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='center' mt={4}>
      <Card sx={{ width: 400, padding: 1 }}>
        <CardContent>
          <Typography variant='h5' fontWeight='bold' mb={2}>
            Register
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <FormInput
              label='Name'
              name='name'
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormInput
              label='Email'
              name='email'
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormInput
              label='Password'
              name='password'
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              type='password'
              showToggle
            />
            <Button fullWidth type='submit' variant='contained' sx={{ mt: 2 }}>
              Register
            </Button>
          </Box>
          <Typography variant='subtitle2' mt={1} textAlign='left'>
            Already have an account?&nbsp;
            <Link component='button' onClick={toLogin} underline='hover'>
              Login here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export { Register };
