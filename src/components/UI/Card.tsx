import styles from "./Card.module.scss";

interface Props {
	children: React.ReactNode;
	className?: string;
	[props: string]: any;
}

const Card: React.FC<Props> = props => {
	const { children, className, ...divProperties } = props;

	return (
		<div className={`${styles["card"]} ${className}`} {...divProperties}>
			{children}
		</div>
	);
};

export default Card;
