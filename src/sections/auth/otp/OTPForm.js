import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { otp,TYPES, } from '../../../Redux/Actions/UserActions';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { errorsSelector } from '../../../Redux/Selectors/ErrorSelectors';
import { isLoadingSelector } from '../../../Redux/Selectors/StatusSelectors';



// ----------------------------------------------------------------------

export default function OTPForm(props) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => errorsSelector([TYPES.OTP], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.OTP], state));  
  const [Email, setEmail] = useState('');
  const [result, setResult] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    otp: Yup.string().required('OTP is required'),
  });

  const defaultValues = { email: props.email?props.email:'',otp: '' };

  

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { isSubmitting },
  } = methods;

  setValue('email',props.email);

  
  

  const onSubmit = async (data) => {
    dispatch(otp(data,(result) => {
        setResult(result.message);
        setTimeout(() => {
            navigate('/reset-password', {state:{email:data.email}});
        }, 3000);
        
    }))
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* <RHFTextField name="email" label="Email address"  readOnly /> */}

        <TextField  {...register("email")}  inputProps={{ readOnly: true }} />

        <RHFTextField name="otp" label="OTP" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" component={RouterLink} to="/resend-otp">
          Resend OTP?
        </Link>
      </Stack>
        {errors &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'red'}}>{errors}</div>}
        {result &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'green'}}>{result}</div>}
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
