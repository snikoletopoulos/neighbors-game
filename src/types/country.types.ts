import type ICountry from "types/country-api.types";

export interface IMainCountry extends ICountry {
	borders: string[];
}
