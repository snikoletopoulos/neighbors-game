import { useState, memo } from "react";
import styles from "./Title.module.scss";

import { useTranslation } from "react-i18next";
import { IMainCountry } from "types/country.types";
import { getEmojiForCountry } from "helpers/util";

import Select from "react-select";

const languageOptions = [
	{
		label: getEmojiForCountry("EN"),
		value: "en",
	},
	{
		label: getEmojiForCountry("GR"),
		value: "gr",
	},
];

interface Props {
	country: IMainCountry | null;
}

const Title: React.FC<Props> = props => {
	const { t, i18n } = useTranslation();
	const mainCountry = props.country;
	const [selectedLanguage, setSelectedLanguage] = useState(
		languageOptions.find(option => option.value === i18n.language)
	);

	const handleLanguageChange = event => {
		i18n.changeLanguage(event.value);
		setSelectedLanguage(event);
	};

	return (
		<section className={styles["selected-country"]}>
			<span className={styles["selected-country__flag"]}>
				{mainCountry?.cca2 && getEmojiForCountry(mainCountry?.cca2)}
			</span>
			<h1 className={styles["selected-country__name"]}>
				{mainCountry?.name.common ?? `${t("loading")}...`}
			</h1>
			<Select
				className={styles["language-selector"]}
				options={languageOptions}
				onChange={handleLanguageChange}
				value={selectedLanguage}
			/>
		</section>
	);
};

export default memo(Title);
