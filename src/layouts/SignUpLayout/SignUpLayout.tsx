import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

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

export const SignUpLayout = () => {
  return <MainContainer>
    <FormContainer elevation={2}>
      <Outlet />
    </FormContainer>
  </MainContainer>
}