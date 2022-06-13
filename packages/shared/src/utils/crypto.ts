import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const key = process.env.SECRET;
const iv = crypto.randomBytes(16);

export const encryptText = (text: string): string => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decryptText = (hash: string): string | undefined => {
  const splitted = hash.split(':');
  if (splitted.length != 2) return;

  const iv = Buffer.from(splitted[0], 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const encrypted = Buffer.from(splitted[1], 'hex');

  let decrpyted = decipher.update(encrypted);
  decrpyted = Buffer.concat([decrpyted, decipher.final()]);

  return decrpyted.toString();
};
