import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';


type TUserState = {
  email: string;
  password: string;
  password2: string;
}

const clearUserState: TUserState = {email: '', password: '', password2: ''};


export const SignUp = () => {
  const [userForm, setUserForm] = useState<TUserState>(clearUserState);
  const theme = useTheme();

  useEffect(() => {
    setUserForm(clearUserState);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value, name}}) => {
    setUserForm({...userForm, [name as keyof TUserState]: value});
  }

  const handleSubmit = () => {
    alert(JSON.stringify(userForm));
  }

  return <>
    <Typography mb={theme.spacing(2)} align='center' variant="h4">
      Sign Up
    </Typography>
    <Box mb={4} display='flex' flexDirection='column' gap={theme.spacing(1)}>
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

    <Button variant='contained' onClick={handleSubmit} fullWidth>Sign Up</Button>
  </>
}