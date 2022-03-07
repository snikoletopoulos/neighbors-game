export default interface ICountry {
	name: Name;
	tld?: string[];
	cca2: string;
	ccn3?: string;
	cca3: string;
	cioc?: string;
	independent?: boolean;
	status: string;
	unMember: boolean;
	currencies?: Currencies;
	idd: Idd;
	capital?: string[];
	altSpellings: string[];
	region: Region;
	subregion?: string;
	languages?: { [key: string]: string };
	translations: { [key: string]: Translation };
	latlng: number[];
	landlocked: boolean;
	borders?: string[];
	area: number;
	demonyms?: Demonyms;
	flag?: string;
	maps: Maps;
	population: number;
	gini?: { [key: string]: number };
	fifa?: string;
	car: Car;
	timezones: string[];
	continents: Continent[];
	flags: CoatOfArms;
	coatOfArms: CoatOfArms;
	startOfWeek: string;
	capitalInfo: CapitalInfo;
	postalCode?: PostalCode;
}

export interface CapitalInfo {
	latlng?: number[];
}

export interface Car {
	signs?: string[];
	side: Side;
}

export enum Side {
	Left = "left",
	Right = "right",
}

export interface CoatOfArms {
	png?: string;
	svg?: string;
}

export enum Continent {
	Africa = "Africa",
	Antarctica = "Antarctica",
	Asia = "Asia",
	Europe = "Europe",
	NorthAmerica = "North America",
	Oceania = "Oceania",
	SouthAmerica = "South America",
}

export enum Region {
	Africa = "Africa",
	Americas = "Americas",
	Antarctic = "Antarctic",
	Asia = "Asia",
	Europe = "Europe",
	Oceania = "Oceania",
}

export interface Demonyms {
	eng: LanguageDemonym;
	fra?: LanguageDemonym;
}

export interface LanguageDemonym {
	f: string;
	m: string;
}

export interface Currencies {
	name: string;
	symbol: string;
}

export interface Idd {
	root?: string;
	suffixes?: string[];
}

export interface Maps {
	googleMaps: string;
	openStreetMaps: string;
}

export interface Name {
	common: string;
	official: string;
	nativeName?: { [key: string]: Translation };
}

export interface Translation {
	official: string;
	common: string;
}

export interface PostalCode {
	format: string;
	regex?: string;
}
