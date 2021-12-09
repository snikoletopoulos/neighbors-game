export interface ICountry {
  name: {
    common: string;
  };
  cca2: string;
  cca3: string;
  borders: CountrtCode3[];
}

type CountrtCode3 = string