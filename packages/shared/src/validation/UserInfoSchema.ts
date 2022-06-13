import * as Yup from 'yup';

import { USERNAME_REGEX } from '../utils';

export const UserInfoSchema = Yup.object().shape({
  name: Yup.string().label('Name').max(20),
  username: Yup.string()
    .label('Username')
    .matches(
      USERNAME_REGEX,
      'Username must be between 3 and 15 characters long.'
    ),
  email: Yup.string().email().label('Email address')
});

export default UserInfoSchema;
