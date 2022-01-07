import styles from "./CardArea.module.scss";

import Modal from "../UI/Modal";

const CardArea = (props: Props) => (
  <>
    { props.showModal && <Modal />}
    <section className={styles["neighbours"]}>{props.children}</section>
  </>
);

export default CardArea;

interface Props {
  children: React.ReactNode;
  showModal: boolean;
}
