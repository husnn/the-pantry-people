import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import { dashboardUrl } from '../utils/links';

export default function NavBar() {
  return (
    <Box>
      <AppBar position="static" color={'secondary'} elevation={0}>
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
