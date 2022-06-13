import fs from 'fs';
import hbs from 'handlebars';
import path from 'path';

export const getTemplate = (name: string, replacements = {}) => {
  const filepath = path.join(__dirname, '../templates', `${name}.html`);
  const template = fs.readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
  return hbs.compile(template)(replacements);
};

export default getTemplate;
