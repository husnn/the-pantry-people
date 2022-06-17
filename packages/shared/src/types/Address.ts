export type Address = {
  formatted?: string;
  building?: string;
  streetNumber?: string;
  street?: string;
  city: string;
  region?: {
    name: string;
    code?: string;
  };
  province: {
    name: string;
    code?: string;
  };
  postcode: string;
  country: {
    name: string;
    code: string;
  };
  latitude: number;
  longitude: number;
};
