export const assignIfNotNull = <T>(obj: any, dto: any, property: keyof T) => {
  if (dto[property]) obj[property] = dto[property];
};
