import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { signout } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';
import { dashboardUrl } from '../utils/links';

export default function NavBar() {
  const { isAuthenticated, clearAuth } = useAuthentication();

  const onSignout = useCallback(() => {
    signout();
    clearAuth();
  }, [clearAuth]);

  return (
    <Box>
      <AppBar position="static" color={'secondary'} elevation={0}>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Link href={dashboardUrl}>
            <Box
              mr={2}
              my={1}
              width={120}
              height={80}
              position="relative"
              style={{ cursor: 'pointer' }}
            >
              <Image alt="" src="/logo.png" layout="fill" objectFit="contain" />
            </Box>
          </Link>
          {isAuthenticated && (
            <Button variant="contained" onClick={onSignout}>
              Signout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
