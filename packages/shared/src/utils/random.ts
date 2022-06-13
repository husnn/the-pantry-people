export const randomIntBetween = (min = 0, max = 999999): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomInteger = (digits: number): number =>
  randomIntBetween(10 ** (digits - 1), 10 ** digits - 1);

export const randomNumericString = (length = 32): string => {
  const result = [];
  const characters = '0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }

  return result.join('');
};
