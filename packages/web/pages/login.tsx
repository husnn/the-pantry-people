import { isEmailAddress, isValidPassword } from '@tpp/shared';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { login } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';

const Login = () => {
  const { setAuthentication } = useAuthentication(false, true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const [enabled, setEnabled] = useState(false);

  const onLogin = useCallback(() => {
    setEnabled(false);
    login(email, password)
      .then((res) => {
        setAuthentication(res.user, res.expiry);
      })
      .catch((err) => {
        setEnabled(true);
        setError(err.message);
      });
  }, [email, password, setAuthentication]);

  useEffect(() => {
    setEnabled(isEmailAddress(email) && isValidPassword(password));
    setError(undefined);
  }, [email, password]);

  return (
    <Container maxWidth="xs">
      <h2>Log into your account</h2>
      <p>Enter your email and password to sign into your account.</p>

      <TextField
        type="email"
        label="Email address"
        variant="outlined"
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        margin="dense"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <FormHelperText error>{error}</FormHelperText>
      <Box sx={{ m: 2 }} />
      <Button
        type="submit"
        variant="contained"
        onClick={onLogin}
        disabled={!enabled}
        fullWidth
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
