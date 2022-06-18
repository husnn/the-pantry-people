import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';

export default function Bar() {
  return (
    <Box>
      <AppBar position="static" color={'secondary'} elevation={0}>
        <Toolbar>
          <Box mr={2} my={1} width={120} height={80} position="relative">
            <Image alt="" src="/logo.png" layout="fill" objectFit="contain" />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
