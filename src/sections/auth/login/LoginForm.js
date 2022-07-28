import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login,TYPES, } from '../../../Redux/Actions/UserActions';


// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
  import { errorsSelector } from '../../../Redux/Selectors/ErrorSelectors';
import { isLoadingSelector } from '../../../Redux/Selectors/StatusSelectors';



// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN], state));  
  const [result, setResult] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    dispatch(login(data,(result) => {
        setResult(result.message);
        setTimeout(() => {
            navigate('/dashboard/user', { replace: true });
        }, 3000);
        
    }))

  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover" component={RouterLink} to="/forgot-password">
          Forgot password?
        </Link>
      </Stack>
          {errors &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'red'}}>{errors}</div>}
          {result &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'green'}}>{result}</div>}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
