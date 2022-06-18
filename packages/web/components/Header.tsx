import { ThemeProvider } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CustomTheme from '../styles/themes/CustomTheme';

export default function Bar() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color={'secondary'} elevation={0}>
          <Toolbar>
            <Box mr={2} my={1}>
              <img src="logo.png" height="100" />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
