import { memo } from "react";
import styles from "./CardArea.module.scss";

import { useTranslation } from "react-i18next";
import Modal from "components/UI/Modal";

interface Props {
	children: React.ReactNode;
	showModal: boolean;
	message: string;
}
const CardArea: React.FC<Props> = props => {
	const { t } = useTranslation();

	return (
		<section className={styles["neighbours"]}>
			{props.showModal && (
				<Modal header={t("game_over")} body={props.message} />
			)}
			{props.children}
		</section>
	);
};

export default memo(CardArea);
