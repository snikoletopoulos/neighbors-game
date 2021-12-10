export interface ICountry {
  name: {
    common: string;
  };
  cca2: string;
  cca3: string;
  alpha2Code: string;
  borders: CountryCode3[];
}

type CountryCode3 = string