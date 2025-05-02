import React from 'react';
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
import { PageLoader } from '@components/PageLoader';
import { FormInput } from '@components/FormInput';
import { loginAct } from '@slices/Auth.slice';
import { useForm } from '@utils/custom-hooks';
import { status } from '@utils/constants';

const Login = () => {
  const { form, errors, handleChange, validateForm } = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: ['required', 'email'],
      password: ['required', 'min:6'],
    },
  });
  const { statusLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    dispatch(loginAct(form));
  };

  const toRegister = () => {
    navigate('/register');
  };

  if (statusLogin === status.loading) {
    return <PageLoader />;
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='center' mt={4}>
      <Card sx={{ width: 400, padding: 1 }}>
        <CardContent>
          <Typography variant='h5' fontWeight='bold' mb={2}>
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
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
              Login
            </Button>
          </Box>
          <Typography variant='subtitle2' mt={1} textAlign='left'>
            Don’t have an account?&nbsp;
            <Link component='button' onClick={toRegister} underline='hover'>
              Register here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export { Login };
