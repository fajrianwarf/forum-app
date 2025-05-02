import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path, status, STORE_KEY } from '@utils/constants';
import { getOwnProfileAct, logout, resetData } from '@slices/Auth.slice';
import { emailRegex } from '.';

function useAuth() {
  const dispatch = useDispatch();
  const { profile, statusLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem(STORE_KEY);

    if (token) {
      dispatch(getOwnProfileAct());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    if (statusLogin === status.success) {
      dispatch(resetData('statusLogin'));
      navigate(path.home);
    }
  }, [dispatch, navigate, statusLogin]);

  return {
    isAuthenticated: Boolean(profile),
    profile,
  };
}

function useForm({ initialValues = {}, validate = {} }) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validators = {
    required: (value) => (value ? null : 'This field is required.'),
    email: (value) => (emailRegex().test(value) ? null : 'Invalid email format.'),
    min: (minLength) => (value) =>
      value?.length >= minLength
        ? null
        : `Must be at least ${minLength} characters.`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const validationErrors = {};

    for (const field in validate) {
      const rules = validate[field];
      const value = form[field];

      for (const rule of rules) {
        let error = null;

        if (typeof rule === 'string') {
          if (rule.startsWith('min:')) {
            const minLength = parseInt(rule.split(':')[1], 10);
            error = validators.min(minLength)(value);
          } else if (validators[rule]) {
            error = validators[rule](value);
          }
        }

        if (error) {
          validationErrors[field] = error;
          break;
        }
      }
    }

    setErrors(validationErrors);
    return validationErrors;
  };

  return {
    form,
    errors,
    handleChange,
    validateForm,
    setForm,
    setErrors,
  };
}

function useRedirectIfAuthenticated(redirectTo = path.home) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);
}

export { useAuth, useForm, useRedirectIfAuthenticated };
