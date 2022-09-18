import React from 'react';
import { Box, Typography } from "@mui/material";
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard = () => {
  const {currentUser} = useAuth();
  return <Box>
    <Typography variant="h4">Welcome, {currentUser?.displayName ?? "Guest"}</Typography>
  </Box>
}