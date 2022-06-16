export type Address = {
  lines: string[];
  city: string;
  region: {
    name: string;
    code: string;
  };
  postcode: string;
  country: {
    name: string;
    code: string;
  };
};
