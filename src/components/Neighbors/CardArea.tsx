import styles from "./CardArea.module.scss";

const CardArea = (props: Props) => (
  <section className={styles['neighbours']}>{props.children}</section>
);

export default CardArea;

interface Props {
  children: React.ReactNode;
}
