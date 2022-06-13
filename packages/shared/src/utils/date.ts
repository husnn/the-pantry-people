export const getExpiryDate = (expiresInSeconds = 600): Date => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + expiresInSeconds);
  return date;
};

export const isExpired = (date: Date | string): boolean =>
  date && new Date(date) < new Date();
