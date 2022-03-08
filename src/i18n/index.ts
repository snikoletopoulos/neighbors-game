import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "i18n/translations/en";
import gr from "i18n/translations/gr";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		gr: {
			translation: gr,
		},
	},
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});
