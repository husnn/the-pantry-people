import getTemplate from './getTemplate';

export abstract class Email {
  to: string;

  template: string;
  props: object;

  abstract subject: string;

  constructor(to: string, template: string, props: object) {
    this.to = to;
    this.template = template;

    this.props = {
      email: to,
      ...props
    };
  }

  build(): string {
    return getTemplate(this.template, this.props);
  }
}

export default Email;
