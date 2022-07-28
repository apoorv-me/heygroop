import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ChangePassword,TYPES, } from '../../../Redux/Actions/UserActions';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { errorsSelector } from '../../../Redux/Selectors/ErrorSelectors';
import { isLoadingSelector } from '../../../Redux/Selectors/StatusSelectors';


// ----------------------------------------------------------------------

export default function CreateGroupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => errorsSelector([TYPES.CHANGE_PASSWORD], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.CHANGE_PASSWORD], state));  
  const [result, setResult] = useState('');

  const RegisterSchema = Yup.object().shape({
    name:Yup.string().required('Group Name  is required'),
    newPassword: Yup.string()
      .required("New Password is required.")
      .min(8, "Password need to has 8 signs.")
      .test("passwordRequirements", "Be at least eight characters long,Contain at least one numeric character,Contain at least one uppercase letter,Contain at least one lowercase letter,Not contain any spaces", (value) =>
        [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
          pattern.test(value)
        )
      ),
    confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const defaultValues = {
    name:'',
    newPassword: '',
    confirmPassword:'',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // dispatch(ChangePassword(data,(result) => {
    //     setResult(result.message)
    // }))
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        
        <RHFTextField
          name="name"
          label="Group Name"
          type={'text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end"  />
              </InputAdornment>
            ),
          }}
        />

        

            {errors &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'red'}}>{errors}</div>}
          {result &&  <div className="alert alert-danger mt-3 mb-0" style={{color:'green'}}>{result}</div>}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
