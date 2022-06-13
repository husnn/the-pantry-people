export const waitUntil = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
