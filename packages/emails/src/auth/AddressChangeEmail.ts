import Email from '../Email';

export class AddressChangeEmail extends Email {
  subject = '🔑 Email change requested';
  content;

  constructor(to: string, changeUrl: string) {
    super(to, 'email-address-change', { changeUrl });
  }
}
