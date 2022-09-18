import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Paper, TextField, Button, Box, Typography } from '@mui/material';

const MainContainer = styled('div')`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2) ,
  maxWidth: "400px",
  width: "100%"
}));

type TUserState = {
  email: string;
  password: string;
  password2: string;
}

const clearUserState: TUserState = {email: '', password: '', password2: ''};


export const SignUpLayout = () => {
  const [userForm, setUserForm] = useState<TUserState>(clearUserState);
  const theme = useTheme();

  useEffect(() => {
    setUserForm(clearUserState);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value, name}}) => {
    setUserForm({...userForm, [name as keyof TUserState]: value});
  }

  return <MainContainer>
    <FormContainer elevation={2}>
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
      
      <Button variant='contained' fullWidth>Sign Up</Button>
    </FormContainer>
  </MainContainer>
}