export const encodeCursor = (data: string) =>
  Buffer.from(data).toString('base64');

export const decodeCursor = (cursor: string): string =>
  Buffer.from(cursor, 'base64').toString('ascii');
