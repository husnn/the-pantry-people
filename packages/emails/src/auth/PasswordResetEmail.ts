import Email from '../Email';

export class PasswordResetEmail extends Email {
  subject = '🔑 Reset your password';
  content;

  constructor(to: string, resetUrl: string) {
    super(to, 'password-reset', { resetUrl });
  }
}
