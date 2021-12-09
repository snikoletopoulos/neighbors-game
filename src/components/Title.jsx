import React from "react";
import { country2emoji2 } from "../logic";

export default function Title({ country }) {
	return (
		<section id="my-country">
			<span id="my-country-flag">{country2emoji2(country.alpha2Code)}</span>
			<h1 id="my-country-name">{country.name}</h1>
		</section>
	);
}
