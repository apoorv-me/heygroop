import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ResetPassword,TYPES, } from '../../../Redux/Actions/UserActions';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { errorsSelector } from '../../../Redux/Selectors/ErrorSelectors';
import { isLoadingSelector } from '../../../Redux/Selectors/StatusSelectors';

// ----------------------------------------------------------------------

export default function ResetPasswordForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => errorsSelector([TYPES.RESETPASSWORD], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.RESETPASSWORD], state));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [result,setResult] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password need to has 8 signs.")
      .test("passwordRequirements", "Be at least eight characters long,Contain at least one numeric character,Contain at least one uppercase letter,Contain at least one lowercase letter,Not contain any spaces", (value) =>
        [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
          pattern.test(value)
        )
      ),
    confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword:'',
  };

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
      dispatch(ResetPassword(data,(result)=>{
        setResult(result.message)
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }))
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* <RHFTextField name="email" label="Email address" /> */}
        <TextField  {...register("email")}  inputProps={{ readOnly: true }} />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'Confirm Password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

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
