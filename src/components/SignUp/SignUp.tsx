import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseError } from 'firebase/app';


type TUserState = {
  email: string;
  password: string;
  password2: string;
}

const clearUserState: TUserState = { email: '', password: '', password2: '' };


export const SignUp = () => {
  const [userForm, setUserForm] = useState<TUserState>(clearUserState);
  const theme = useTheme();
  const { signUp } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setUserForm(clearUserState);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    setError('');
    setUserForm({ ...userForm, [name as keyof TUserState]: value });
  }

  const handleSubmit = async () => {
    const { email, password, password2 } = userForm;
    if (password !== password2) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    setError('');
    try {
      await signUp({ email, password });
    } catch (e) {
      const err = e as FirebaseError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Typography mb={theme.spacing(2)} align='center' variant="h4">
      Sign Up
    </Typography>
    <Box mb={error ? 2 : 4} display='flex' flexDirection='column' gap={theme.spacing(1)}>
      <TextField
        name='email'
        type='email'
        value={userForm.email}
        onChange={handleChange}
        fullWidth
        label='Email'
        variant='standard' />
      <TextField
        type='password'
        name='password'
        value={userForm.password}
        onChange={handleChange}
        fullWidth
        label='Password'
        variant='standard' />
      <TextField
        type='password'
        name='password2'
        value={userForm.password2}
        onChange={handleChange}
        fullWidth
        label='Repeat Password'
        variant='standard' />
    </Box>
    {error && <Typography my={2} color={'red'}>{error}</Typography>}
    <Button
      disabled={loading}
      variant='contained'
      onClick={handleSubmit}
      fullWidth>
      Sign Up
    </Button>
  </>
}