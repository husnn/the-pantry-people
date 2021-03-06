import {
  isEmailAddress,
  isValidCharityName,
  isValidPassword,
  isValidPostcode
} from '@tpp/shared';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { signupCharity } from '../../modules/api/charity';
import useAuthentication from '../../modules/auth/useAuthentication';

const CharitySignup = () => {
  const { setAuthentication } = useAuthentication(false, true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setCharityName] = useState('');
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState();
  const [enabled, setEnabled] = useState(false);

  const onRegister = useCallback(() => {
    setEnabled(false);
    signupCharity(email, password, name, postcode)
      .then((res) => {
        setAuthentication(res.user, res.expiry);
      })
      .catch((err) => {
        setEnabled(true);
        setError(err.message);
      });
  }, [email, password, name, postcode, setAuthentication]);

  useEffect(() => {
    setEnabled(
      isEmailAddress(email) &&
        isValidPassword(password) &&
        isValidCharityName(name) &&
        isValidPostcode(postcode)
    );
    setError(undefined);
  }, [email, password, name, postcode]);

  return (
    <Container disableGutters>
      <Container maxWidth="xs">
        <h2>Register a food bank</h2>
        <p>Create a food bank account.</p>

        <form>
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
            type="name"
            label="Name of food bank"
            variant="outlined"
            margin="dense"
            value={name}
            onChange={(e) => setCharityName(e.target.value)}
            fullWidth
          />
          <TextField
            type="postcode"
            label="Postcode"
            variant="outlined"
            margin="dense"
            value={postcode}
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
        </form>
      </Container>
    </Container>
  );
};

export default CharitySignup;
