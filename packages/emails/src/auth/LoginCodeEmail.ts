import Email from '../Email';

export class LoginCodeEmail extends Email {
  subject = '🔑 Your temporary login code';
  content;

  constructor(to: string, code: string) {
    super(to, 'login-code', { code });
  }
}
