import { createTheme } from '@mui/material/styles';

const DefaultTheme = createTheme({
  palette: {
    secondary: {
      main: '#FFB33F',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    fontSize: 14
  },
  spacing: 8
});

export default DefaultTheme;
