import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Navbar } from "~/components/layout/Navbar";

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}