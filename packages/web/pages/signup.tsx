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
import { signup } from '../modules/api/auth';
import useAuthentication from '../modules/auth/useAuthentication';
import Bar from '../components/Header';

const Signup = () => {
  const { setAuthentication } = useAuthentication(false, true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [postcode, setPostcode] = useState('');

  const [error, setError] = useState();
  const [enabled, setEnabled] = useState(false);

  const onRegister = useCallback(() => {
    setEnabled(false);
    signup(email, password, postcode)
      .then((res) => {
        setAuthentication(res.user, res.expiry);
      })
      .catch((err) => {
        setEnabled(true);
        setError(err.message);
      });
  }, [email, password, postcode, setAuthentication]);

  useEffect(() => {
    setEnabled(isEmailAddress(email) && isValidPassword(password));
    setError(undefined);
  }, [email, password]);

  return (
    <Box>
      <Bar></Bar>
      <Container maxWidth="xs">
        <h2>Register</h2>
        <p>Create an account using an email and a password.</p>

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
        <TextField
          type="postcode"
          label="Postcode"
          variant="outlined"
          margin="dense"
          value={setPostcode}
          onChange={(e) => setPostcode(e.target.value)}
          fullWidth
        />
        <FormHelperText error>{error}</FormHelperText>
        <Box sx={{ m: 2 }} />
        <Button
          type="submit"
          variant="contained"
          onClick={onRegister}
          disabled={!enabled}
          fullWidth
        >
          Register
        </Button>
      </Container>
    </Box>
  );
};

export default Signup;
