import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ResendOTP,TYPES, } from '../../../Redux/Actions/UserActions';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { errorsSelector } from '../../../Redux/Selectors/ErrorSelectors';
import { isLoadingSelector } from '../../../Redux/Selectors/StatusSelectors';



// ----------------------------------------------------------------------

export default function ResendOtpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => errorsSelector([TYPES.RESENDOTP], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.RESENDOTP], state));  
  const [result,setResult] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const defaultValues = {
    email: '',
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
    dispatch(ResendOTP(data,(result) => {
        setResult(result.message);
        setTimeout(() => {
            navigate('/otp', { replace: true });
        }, 3000);
        
    }))
    
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
      </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover" component={RouterLink} to="/register">
          Forgot password?
        </Link> */}
      </Stack>
        {errors &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'red'}}>{errors}</div>}
        {result &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'green'}}>{result}</div>}
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
